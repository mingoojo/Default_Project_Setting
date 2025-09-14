import { Module } from "@nestjs/common";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TokenProvider } from "../lib/tokenProvider";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JwtService, TokenProvider],
  exports: [UserService, JwtService, TokenProvider],
})
export class UserModule { }
