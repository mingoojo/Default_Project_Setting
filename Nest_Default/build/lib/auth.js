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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const tokenProvider_1 = require("./tokenProvider");
let AuthGuard = class AuthGuard {
    constructor(userService, tokenProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const res = context.switchToHttp().getResponse();
            const authorization = request.headers.authorization;
            if (!authorization) {
                throw new common_1.UnauthorizedException('Access token not provided');
            }
            try {
                await this.tokenProvider.jwtVerify(authorization.substring(7));
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid access token');
            }
            //accessToken 만료 체크 로직 end
            const decodeJwt = await this.tokenProvider.headerDecodeJwt(authorization);
            if (decodeJwt.type === 'refreshToken') {
                throw new common_1.UnauthorizedException('Token Type Error');
            }
            return decodeJwt;
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.UnauthorizedException(error.message);
        }
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        tokenProvider_1.TokenProvider])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.js.map