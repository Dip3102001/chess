import {Color, Coords, Char} from '../models'


export abstract class Piece{
    protected abstract _char: Char;
    protected abstract _direction: Coords[];

    constructor(private _color: Color){ }

    public get Char() : Char{
        return this._char;
    }

    public get directions(): Coords[] {
        return this._direction;
    }

    public get color(): Color{
        return this._color;
    }
}