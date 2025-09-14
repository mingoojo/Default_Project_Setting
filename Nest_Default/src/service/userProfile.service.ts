import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfile } from "../entity/userProfile.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
    ) { }
}