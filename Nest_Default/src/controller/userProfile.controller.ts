import { Controller } from "@nestjs/common";
import { UserProfileService } from "../service/userProfile.service";

@Controller("profile")
export class UserProfileController {
    constructor(
        private userProfileService: UserProfileService
    ) { }
}