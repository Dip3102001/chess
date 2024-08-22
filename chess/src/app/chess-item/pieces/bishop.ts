import { Char, Color, Coords } from "../models";
import { Piece } from "./piece";

export class Bishop extends Piece{
    protected override _char : Char;
    protected override _direction : Coords[] = [
        { x : 1, y: 1},
        { x : -1, y: -1},
        { x : -1, y: 1},
        { x : 1, y: -1}
    ];

    constructor(private pieceColor:Color){
        super(pieceColor);
        this._char = pieceColor === Color.White ? Char.WhiteBishop : Char.BlackBishop;
    }
}