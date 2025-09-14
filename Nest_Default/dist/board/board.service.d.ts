import Board from './board.type';
import CreateBoardDto from './dto/create_board.dto';
export declare class BoardService {
    private board;
    getAllBoard(): Board[];
    getBoard(title: string): Board;
    createBoard(createBoardDto: CreateBoardDto): Board;
    deleteBoard(title: string): void;
    updateBoardStatus(title: string, status: 'PUBLIC' | 'PRIVATE'): Board;
}
