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
exports.TokenProvider = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET || 'SECRET';
let TokenProvider = class TokenProvider {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    headerDecodeJwt(authorization) {
        let authorizationSubStr = '';
        if (authorization !== undefined) {
            authorizationSubStr = authorization.substring(7);
        }
        try {
            return this.jwtService.decode(authorizationSubStr);
        }
        catch (error) {
            throw error;
        }
    }
    decodeJwt(token) {
        if (token === undefined) {
            throw new Error('token is null!');
        }
        try {
            return this.jwtService.decode(token);
        }
        catch (error) {
            throw error;
        }
    }
    jwtVerify(token) {
        try {
            const verified = this.jwtService.verify(token, { secret: secret });
            return verified;
        }
        catch (error) {
            throw error;
        }
    }
    createToken(email, tokenType, expireTime) {
        try {
            return this.jwtService.sign({ email: email, type: tokenType }, { secret, expiresIn: expireTime });
        }
        catch (error) {
            throw error;
        }
    }
};
TokenProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TokenProvider);
exports.TokenProvider = TokenProvider;
//# sourceMappingURL=tokenProvider.js.map