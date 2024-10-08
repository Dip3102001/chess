export enum Color{
    White,
    Black
}

export type Coords = {
    x : number,
    y : number
}

export enum Char {
    WhitePawn="P",
    WhiteKnight="N",
    WhiteBishop="B",
    WhiteRook="R",
    WhiteQueen="Q",
    WhiteKing="K",

    BlackPawn="p",
    BlackKnight="n",
    BlackBishop="b",
    BlackRook="r",
    BlackQueen="q",
    BlackKing="k"
}

export type PieceURL = {
    piece : string,
    url : string
};

export enum Side{
    Left,
    Right
}