"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let BoardService = class BoardService {
    constructor() {
        this.board = [];
    }
    getAllBoard() {
        return this.board;
    }
    getBoard(title) {
        const boardByTitle = this.board.find((board) => {
            return board.title === title;
        });
        if (!boardByTitle) {
            throw new common_1.NotFoundException(`Can't find Board with title ${title}`);
        }
        return boardByTitle;
    }
    createBoard(createBoardDto) {
        const { title, description } = createBoardDto;
        const board = {
            id: (0, uuid_1.v4)(),
            title,
            description,
            status: 'PRIVATE',
        };
        this.board.push(board);
        return board;
    }
    deleteBoard(title) {
        this.board = this.board.filter((board) => board.title !== title);
    }
    updateBoardStatus(title, status) {
        const board = this.getBoard(title);
        board.status = status;
        return board;
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)()
], BoardService);
//# sourceMappingURL=board.service.js.map