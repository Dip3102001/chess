import { Injectable } from '@angular/core';
import { Piece } from './chess-item/pieces/piece';
import { Char, Color } from './chess-item/models';
import { Pawn } from './chess-item/pieces/pawn';
import { Queen } from './chess-item/pieces/queen';

@Injectable({
  providedIn: 'root'
})
export class CharToPiecesService {
  
  constructor() {
  }

  public charToPiece(char : Char) : Piece|null{
    if(char === "P" || char === "p") return new Pawn(char === "P"?Color.White:Color.Black);
    if(char === "Q" || char === "q") return new Pawn(char === "Q"?Color.White:Color.Black);
    if(char === "B" || char === "b") return new Pawn(char === "B"?Color.White:Color.Black);
    if(char === "N" || char === "n") return new Pawn(char === "N"?Color.White:Color.Black);
    if(char === "R" || char === "r") return new Pawn(char === "R"?Color.White:Color.Black);
    else return null;
  }
}
