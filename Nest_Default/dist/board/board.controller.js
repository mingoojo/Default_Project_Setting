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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const board_service_1 = require("./board.service");
const create_board_dto_1 = require("./dto/create_board.dto");
const board_status_validatiaon_pipe_1 = require("./pipe/board_status_validatiaon.pipe");
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    getAllboard() {
        return this.boardService.getAllBoard();
    }
    getBoard(title) {
        return this.boardService.getBoard(title);
    }
    createBoard(createBoardDto) {
        return this.boardService.createBoard(createBoardDto);
    }
    deleteBoard(title) {
        return this.boardService.deleteBoard(title);
    }
    updateBaord(title, status) {
        return this.boardService.updateBoardStatus(title, status);
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getAllboard", null);
__decorate([
    (0, common_1.Get)('/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getBoard", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.default]),
    __metadata("design:returntype", Object)
], BoardController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Delete)('/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "deleteBoard", null);
__decorate([
    (0, common_1.Patch)('/:title/status'),
    __param(0, (0, common_1.Param)('title')),
    __param(1, (0, common_1.Body)('status', board_status_validatiaon_pipe_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "updateBaord", null);
exports.BoardController = BoardController = __decorate([
    (0, common_1.Controller)('board'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
//# sourceMappingURL=board.controller.js.map