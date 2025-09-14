"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const auth_1 = require("../lib/auth");
const tokenProvider_1 = require("../lib/tokenProvider");
let UserController = class UserController {
    constructor(userService, tokenProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }
    async getUseInfo(req, res) {
        const decodeJwt = await this.tokenProvider.headerDecodeJwt(req.headers.authorization);
        try {
            const user = await this.userService.getUserByEmail(decodeJwt.email);
            if (!user) {
                throw new common_1.UnauthorizedException("can not find user");
            }
            res.status(200).json(user);
        }
        catch (error) {
            throw error;
        }
    }
    async SignUp(req, res) {
        try {
            const resultUser = await this.userService.createUser(req.body);
            delete resultUser.password;
            delete resultUser.current_refresh_token;
            delete resultUser.current_refresh_token_exp;
            res.status(201).json({
                message: "signup success",
                user: resultUser,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async SignIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.getUserByEmail(email);
            if (!user || !user.validatePassword(password)) {
                res.json("passwordFail");
                throw new common_1.UnauthorizedException("signin fail");
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
        }
        catch (error) {
            throw error;
        }
    }
    async SignOut(req, res) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async reissueJwtToken(req, res) {
        const refreshToken = req.body.refreshToken;
        const email = req.body.email;
        const decodeJwtToken = this.tokenProvider.decodeJwt(refreshToken);
        if (decodeJwtToken["type"] !== "refreshToken") {
            throw new common_1.UnauthorizedException("refresh Token Type Error");
        }
        if (refreshToken !== undefined) {
            try {
                await this.tokenProvider.jwtVerify(refreshToken);
            }
            catch (error) {
                throw new common_1.UnauthorizedException("Invalid refresh Token");
            }
        }
        if (email !== undefined) {
            const user = await this.userService.getUserByEmail(email);
            if (user.current_refresh_token === refreshToken) {
                const accessToken = this.tokenProvider.createToken(email, "accessToken", "1h");
                res.status(200).json(accessToken);
            }
            else {
                throw new common_1.UnauthorizedException("Invalid refresh Token");
            }
        }
    }
};
__decorate([
    (0, common_1.Get)("/userInfo"),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUseInfo", null);
__decorate([
    (0, common_1.Post)("/signup"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "SignUp", null);
__decorate([
    (0, common_1.Post)("/signin"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "SignIn", null);
__decorate([
    (0, common_1.Post)("/signout"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "SignOut", null);
__decorate([
    (0, common_1.Post)("/reissue-jwt-token"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "reissueJwtToken", null);
UserController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        tokenProvider_1.TokenProvider])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map