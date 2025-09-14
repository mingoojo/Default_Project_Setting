import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "../entity/userProfile.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserProfileController } from "../controller/userProfile.controller";
import { UserProfileService } from "../service/userProfile.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile]), JwtModule.register({})],
    controllers: [UserProfileController],
    providers: [UserProfileService, JwtService],
    exports: [UserProfileService, JwtService]
})
export class UserProfileModule { }