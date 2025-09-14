"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userProfile_entity_1 = require("../entity/userProfile.entity");
const jwt_1 = require("@nestjs/jwt");
const userProfile_controller_1 = require("../controller/userProfile.controller");
const userProfile_service_1 = require("../service/userProfile.service");
let UserProfileModule = class UserProfileModule {
};
UserProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([userProfile_entity_1.UserProfile]), jwt_1.JwtModule.register({})],
        controllers: [userProfile_controller_1.UserProfileController],
        providers: [userProfile_service_1.UserProfileService, jwt_1.JwtService],
        exports: [userProfile_service_1.UserProfileService, jwt_1.JwtService]
    })
], UserProfileModule);
exports.UserProfileModule = UserProfileModule;
//# sourceMappingURL=userProfile.module.js.map