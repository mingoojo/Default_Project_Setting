import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, HttpStatus, BadRequestException, HttpException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { TokenProvider } from './tokenProvider';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private readonly tokenProvider: TokenProvider
  ) { }

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
      const authorization = request.headers.authorization;

      if (!authorization) {
        throw new UnauthorizedException('Access token not provided');
      }

      try {
        await this.tokenProvider.jwtVerify(authorization.substring(7));
      } catch (error) {
        throw new UnauthorizedException('Invalid access token');
      }

      //accessToken 만료 체크 로직 end
      const decodeJwt = await this.tokenProvider.headerDecodeJwt(authorization);

      if (decodeJwt.type === 'refreshToken') {
        throw new UnauthorizedException('Token Type Error');
      }

      return decodeJwt;
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}


