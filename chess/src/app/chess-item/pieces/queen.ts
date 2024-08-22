import { Char, Color, Coords } from "../models";
import { Piece } from "./piece";

export class Queen extends Piece{
    protected override _char : Char;
    protected override _direction : Coords[] = [
        {x : 0, y : 1},
        {x : 0, y : -1},
        {x : 1, y : 1},
        {x : 1, y : 0},
        {x : 1, y : -1},
        {x : -1, y : 1},
        {x : -1, y : 0},
        {x : -1, y : -1}
    ];

    constructor(private pieceColor:Color){
        super(pieceColor);
        this._char = pieceColor === Color.White?Char.WhiteQueen:Char.BlackQueen; 
    }
}