import { Char, Color, Coords, Side } from "../models";
import { Piece } from "./piece";

export class Rook extends Piece{

    private _hasMoved: boolean = false;
    protected _side:Side;
    protected override _char : Char;
    protected override _direction: Coords[] = [
        {x : 1, y : 0},
        {x : -1, y : 0},
        {x : 0, y : 1},
        {x : 0, y : -1},
    ];

    constructor(private pieceColor: Color, side : Side){
        super(pieceColor);
        this._char = pieceColor === Color.White? Char.WhiteRook : Char.BlackRook;
        this._side = side;
    }

    public get hasMoved(): boolean{
        return this._hasMoved;
    }    

    public set hasMoved(_){
        this._hasMoved = true;
    }

    public get side():Side{
        return this._side;
    }
}