import { Controller, Get, Post, Request, Response, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { AuthGuard } from "../lib/auth";
import { TokenProvider } from "../lib/tokenProvider";

@Controller("auth")
export class UserController {
  constructor(
    private userService: UserService,
    private readonly tokenProvider: TokenProvider,
  ) { }

  @Get("/userInfo")
  @UseGuards(AuthGuard)
  async getUseInfo(@Request() req, @Response() res) {
    const decodeJwt = await this.tokenProvider.headerDecodeJwt(req.headers.authorization);

    try {
      const user = await this.userService.getUserByEmail(decodeJwt.email);

      if (!user) {
        throw new UnauthorizedException("can not find user");
      }

      res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  }

  @Post("/signup")
  async SignUp(@Request() req, @Response() res): Promise<any> {
    try {
      const resultUser = await this.userService.createUser(req.body);

      delete resultUser.password;
      delete resultUser.current_refresh_token;
      delete resultUser.current_refresh_token_exp;


      res.status(201).json({
        message: "signup success",
        user: resultUser,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post("/signin")
  async SignIn(@Request() req, @Response() res): Promise<any> {
    console.log(123123)
    try {
      const { email, password } = req.body;
      const user = await this.userService.getUserByEmail(email);

      if (!user || !user.validatePassword(password)) {
        res.json("passwordFail");
        throw new UnauthorizedException("signin fail");
      }

      const accessToken = this.tokenProvider.createToken(user.email, "accessToken", "1h");
      const refreshToken = this.tokenProvider.createToken(user.email, "refreshToken", "7d");

      user.current_refresh_token = refreshToken;

      const nowDate = new Date();
      const current_refresh_token_exp = new Date();
      current_refresh_token_exp.setDate(nowDate.getDate() + 7);
      user.current_refresh_token_exp = current_refresh_token_exp;

      await this.userService.updateUser(user);

      const result = {
        name: `${user.last_name}${user.first_name}`,
        isLogin: true,
        permission: user.permission,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };


      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  @Post("/signout")
  async SignOut(@Request() req, @Response() res) {
    try {
      const { authorization } = req.headers;

      if (authorization !== undefined) {
        const decodeJwt = await this.tokenProvider.headerDecodeJwt(req.headers.authorization);

        const user = await this.userService.getUserByEmail(decodeJwt.email);

        user.current_refresh_token = null;
        user.current_refresh_token_exp = null;

        this.userService.updateUser(user);
      }

      const message = {
        message: "signout user",
      };

      res.status(200).json(message);
    } catch (error) {
      throw error;
    }
  }

  @Post("/reissue-jwt-token")
  async reissueJwtToken(@Request() req, @Response() res) {

    const refreshToken = req.body.refreshToken;
    const email = req.body.email;

    const decodeJwtToken = this.tokenProvider.decodeJwt(refreshToken);


    if (decodeJwtToken["type"] !== "refreshToken") {
      throw new UnauthorizedException("refresh Token Type Error");
    }

    if (refreshToken !== undefined) {
      try {
        await this.tokenProvider.jwtVerify(refreshToken);
      } catch (error) {
        throw new UnauthorizedException("Invalid refresh Token");
      }
    }

    if (email !== undefined) {
      const user = await this.userService.getUserByEmail(email);

      if (user.current_refresh_token === refreshToken) {
        const accessToken: string = this.tokenProvider.createToken(email, "accessToken", "1h");
        res.status(200).json(accessToken);
      } else {
        throw new UnauthorizedException("Invalid refresh Token");
      }

    }

  }
}
