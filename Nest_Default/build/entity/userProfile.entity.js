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
exports.UserProfile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserProfile = class UserProfile {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserProfile.prototype, "profile_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], UserProfile.prototype, "user_fk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserProfile.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, nullable: true }),
    __metadata("design:type", Array)
], UserProfile.prototype, "interests", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.userProfile, { cascade: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_fk' }),
    __metadata("design:type", user_entity_1.User)
], UserProfile.prototype, "user", void 0);
UserProfile = __decorate([
    (0, typeorm_1.Entity)('user_profile'),
    (0, typeorm_1.Unique)(['user_fk'])
], UserProfile);
exports.UserProfile = UserProfile;
//onetoone
// CREATE TABLE mj_personal.user_profile (
// 	profile_id serial4 NOT NULL,
// 	user_fk int4 NOT NULL,
// 	birth timestamp NULL,
// 	age int4 NULL,
// 	interests _varchar NULL,
// 	CONSTRAINT "PK_8c154faf15b98f494723d9cc45b" PRIMARY KEY (profile_id),
// 	CONSTRAINT "UQ_cc7b5c3675a08dec54656184884" UNIQUE (user_fk),
// 	CONSTRAINT "FK_cc7b5c3675a08dec54656184884" FOREIGN KEY (user_fk) REFERENCES mj_personal.users(user_id) ON DELETE CASCADE
// );
// CREATE TABLE mj_personal.user_profile (
// 	profile_id serial4 NOT NULL,
// 	user_fk int4 NOT NULL,
// 	birth timestamp NULL,
// 	age int4 NULL,
// 	interests _varchar NULL,
// 	CONSTRAINT "PK_8c154faf15b98f494723d9cc45b" PRIMARY KEY (profile_id),
// 	CONSTRAINT "UQ_cc7b5c3675a08dec54656184884" UNIQUE (user_fk),
// 	CONSTRAINT "FK_cc7b5c3675a08dec54656184884" FOREIGN KEY (user_fk) REFERENCES mj_personal.users(user_id) ON DELETE CASCADE
// );
//# sourceMappingURL=userProfile.entity.js.map