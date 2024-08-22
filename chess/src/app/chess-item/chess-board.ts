import { Char, Color } from "./models";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";


export class ChessBoard{
    private chessBoard: (Piece|null)[][];
    public readonly chessBoardSize : number = 8;

    constructor(){
        this.chessBoard = [
            [
                new Rook(Color.White),new Knight(Color.White),new Bishop(Color.White),new King(Color.White),
                new Queen(Color.White),new Bishop(Color.White),new Knight(Color.White),new Rook(Color.White)
            ],
            [
                new Pawn(Color.White),new Pawn(Color.White),new Pawn(Color.White),new Pawn(Color.White),
                new Pawn(Color.White),new Pawn(Color.White),new Pawn(Color.White),new Pawn(Color.White)
            ],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [
                new Pawn(Color.Black),new Pawn(Color.Black),new Pawn(Color.Black),new Pawn(Color.Black),
                new Pawn(Color.Black),new Pawn(Color.Black),new Pawn(Color.Black),new Pawn(Color.Black)
            ],
            [
                new Rook(Color.Black),new Knight(Color.Black),new Bishop(Color.Black),new King(Color.Black),
                new Queen(Color.Black),new Bishop(Color.Black),new Knight(Color.Black),new Rook(Color.Black)
            ]
        ];
    }

    public get viewChessBoard():(Char|null)[][]{
        return this.chessBoard.map((row)=>{
            return row.map((piece)=> piece instanceof Piece? piece.Char : null);
        });
    }
}