import { Char, Color, Coords } from "../models";
import { Piece } from "./piece";

export class Knight extends Piece{
    protected override _char : Char;
    protected override _direction : Coords[] = [
        { x : 2, y : 1},
        { x : 2, y : -1},
        { x : -2, y : -1},
        { x : -2, y : 1},

        { x : 1, y : 2},
        { x : 1, y : -2},
        { x : -1, y : -2},
        { x : -1, y : 2}
    ];

    constructor(private pieceColor: Color){
        super(pieceColor);
        this._char = pieceColor === Color.White ? Char.WhiteKnight : Char.BlackKnight; 
    }
}