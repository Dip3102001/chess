import { Char, Color, Coords } from "../models";
import { Piece } from "./piece";

export class King extends Piece{
    private _hasMoved : boolean = false;
    protected override _char : Char;
    protected override _direction : Coords[] = [
        {x : 0, y : 1},
        {x : 0, y : -1},
        {x : 1, y : 1},
        {x : 1, y : 0},
        {x : 1, y : -1},
        {x : -1, y : 1},
        {x : -1, y : 0},
        {x : -1, y : -1},
    ];

    constructor(private pieceColor: Color){
        super(pieceColor);
        this._char = pieceColor === Color.White ? Char.WhiteKing : Char.BlackKing;
    }

    public get hasMoved(): boolean{
        return this._hasMoved;
    }

    public set hasMoved(_){
        this._hasMoved = true;
    }
}