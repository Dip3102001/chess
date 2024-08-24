import { Injectable } from '@angular/core';
import { Piece } from './chess-item/pieces/piece';
import { Char, Color, Side } from './chess-item/models';
import { Pawn } from './chess-item/pieces/pawn';
import { Queen } from './chess-item/pieces/queen';
import { Bishop } from './chess-item/pieces/bishop';
import { Knight } from './chess-item/pieces/knight';
import { Rook } from './chess-item/pieces/rook';

@Injectable({
  providedIn: 'root'
})
export class CharToPiecesService {

  constructor() {
  }

  public charToPiece(char : Char) : Piece|null{
    if(char === "P" || char === "p") return new Pawn(char === "P"?Color.White:Color.Black);
    if(char === "Q" || char === "q") return new Queen(char === "Q"?Color.White:Color.Black);
    if(char === "B" || char === "b") return new Bishop(char === "B"?Color.White:Color.Black);
    if(char === "N" || char === "n") return new Knight(char === "N"?Color.White:Color.Black);
    if(char === "R" || char === "r") return new Rook(char === "R"?Color.White:Color.Black,Side.Left);
    else return null;
  }
}
