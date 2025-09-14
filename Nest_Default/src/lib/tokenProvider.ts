import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET || 'SECRET';

@Injectable()
export class TokenProvider {

  constructor(private jwtService: JwtService) { }


  headerDecodeJwt(authorization) {
    let authorizationSubStr: string = '';

    if (authorization !== undefined) {
      authorizationSubStr = authorization.substring(7);
    }

    try {
      return this.jwtService.decode(authorizationSubStr) as any;
    } catch (error) {
      throw error;
    }
  }

  decodeJwt(token: string) {

    if (token === undefined) {
      throw new Error('token is null!');
    }

    try {
      return this.jwtService.decode(token) as any;
    } catch (error) {
      throw error;
    }
  }

  jwtVerify(token: string) {
    try {
      const verified = this.jwtService.verify(token, { secret: secret });
      return verified;
    } catch (error) {
      throw error;
    }
  }

  createToken(email, tokenType, expireTime) {
    try {
      return this.jwtService.sign({ email: email, type: tokenType }, { secret, expiresIn: expireTime });
    } catch (error) {
      throw error;
    }
  }


}