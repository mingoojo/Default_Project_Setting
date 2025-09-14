import { BoardService } from './board.service';
import Board from './board.type';
import CreateBoardDto from './dto/create_board.dto';
export declare class BoardController {
    private boardService;
    constructor(boardService: BoardService);
    getAllboard(): Board[];
    getBoard(title: string): Board;
    createBoard(createBoardDto: CreateBoardDto): Board;
    deleteBoard(title: string): void;
    updateBaord(title: string, status: 'PUBLIC' | 'PRIVATE'): Board;
}
