import { Component, OnInit } from '@angular/core';
import { ServicepieceService } from '../../servicepiece.service';
import { Char, Color, Coords, PieceURL } from '../../chess-item/models';
import { ChessBoard } from '../../chess-item/chess-board';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CharToPiecesService } from '../../char-to-pieces.service';
import { Piece } from '../../chess-item/pieces/piece';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css'
})
export class ChessBoardComponent implements OnInit {
  
  public map : Map<String,String>;
  public chessBoard : ChessBoard;
  private _turn : Color;
  private selectedPossibleMoves : Coords[]|null;
  private transitionStateInit : boolean;
  
  private selectedPieceCoords : Coords | null;
  private _isGameOver : boolean;

  private _isPromotionActive : boolean;
  private _promotionAvailableForColor: Color|null;
  private _promotionAvailableAt : Coords|null;

  private _lastmove : Coords|null;

  constructor(private getpiece: ServicepieceService, private charToPiece:CharToPiecesService){ 
    this.map = new Map<String,String>();
    this.chessBoard = new ChessBoard();
    this._turn = Color.White;
    this.selectedPossibleMoves = null;

    this.transitionStateInit = false;
    this.selectedPieceCoords = null; 
    this._isGameOver = false;
    
    this._isPromotionActive = false;
    this._promotionAvailableForColor = null;
    this._promotionAvailableAt = null;
    this._lastmove = null;
  }

  ngOnInit(): void {
    this.getpiece.getAssetData().subscribe((data:PieceURL[])=>{
      for(let item of data){
        this.map.set(item.piece,item.url);
      }
    });
  }

  public get turn(): Color{
    return this._turn;
  }

  public get isGameOver(): boolean{
    return this._isGameOver;
  }

  public get isPromotionActive(): boolean{
    return this._isPromotionActive;
  }

  public get promotionAvailableForColor(): Color|null{
    return this._promotionAvailableForColor;
  }

  public get promotionAvailableAt(): Coords|null{
    return this._promotionAvailableAt;
  } 

  public get lastMove() : Coords|null{
    return this._lastmove;
  }

  public isDark(x : number, y : number) : boolean{
    return (x % 2 + y % 2) % 2 == 0; 
  }

  public isSelected(x : number, y : number) : boolean{
    return this.selectedPossibleMoves?.some(elem => elem.x === x && elem.y === y) === true;
  }

  public getColorFromCode(char : Char) : Color{
    return char.toLowerCase() === char ? Color.Black : Color.White;
  }

  public checkGameOver(){
    this._isGameOver = this.chessBoard.isGameOver(this._turn);
  }

  public isKingInCheck(x:number,y:number) : boolean{
    const piece : Char|null = this.chessBoard.viewChessBoard[x][y];
    if(piece && piece.toLowerCase() === "k"){
      const coords : Coords = {x:x,y:y};
      return this.chessBoard.isInCheck(coords);
    }else return false;
  }

  public promotionPieces() : Char[]{
    const promoPieceWhite : Char[] = [Char.WhiteRook,Char.WhiteKnight,Char.WhiteBishop,Char.WhiteQueen];
    const promoPieceBlack : Char[] = [Char.BlackRook,Char.BlackKnight,Char.BlackBishop,Char.BlackQueen];
    return (this.promotionAvailableForColor === Color.White)? promoPieceWhite : promoPieceBlack ;
  }

  public possibility(x : number, y : number) : void{
    if(!this.transitionStateInit && this.chessBoard.viewChessBoard[x][y] === null)
      this.selectedPossibleMoves = null;
    else if(!this.transitionStateInit && this.chessBoard.viewChessBoard[x][y] !== null){
      const color : Color = this.getColorFromCode(this.chessBoard.viewChessBoard[x][y]);
      if(color === this._turn){
        this.selectedPieceCoords = {x:x,y:y};
        const char : Char|null = this.chessBoard.viewChessBoard[x][y];
        if(char){
          const moves : Coords[] | null = this.chessBoard.getLegalMoves({x:x,y:y});
          if(moves !== null)
            this.selectedPossibleMoves = moves;
          else
            this.selectedPossibleMoves = null;
        }
        this.transitionStateInit = true;
      }else{
        this.selectedPossibleMoves = null;
      }
    }else if(this.transitionStateInit && this.selectedPossibleMoves?.some(elem=> elem.x === x && elem.y === y)){
      if(this.selectedPieceCoords)
        this.chessBoard.transform(this.selectedPieceCoords,{x:x,y:y});
      this.filpTurn();
      this.transitionStateInit = false;
      this.selectedPossibleMoves = null;
    }else{
      this.transitionStateInit = false;
      this.selectedPossibleMoves = null;
    }
  }

  private filpTurn():void{
    this.checkForPromotion();
    this._turn = (this._turn === Color.White)? Color.Black : Color.White;
    this.checkGameOver();
  }

  private checkForPromotion() : void{
    const coords : Coords|null = this.chessBoard.checkForPromotion();
    if(coords){
      this._isPromotionActive = true;
      this._promotionAvailableAt = coords;
      this._promotionAvailableForColor = coords.x === 0? Color.Black : Color.White;
    } 
  }

  public isLastMove(x:number,y:number):boolean{
    if(this.lastMove){
      return this.lastMove.x === x && this.lastMove.y === y;
    }
    else return false;
  }

  public promotePiece(piece:Char) : void{
    // logic to promote piece to selected one;
    const newPiece : Piece|null = this.charToPiece.charToPiece(piece);
    const promCoords : Coords|null = this.promotionAvailableAt;
    this.chessBoard.promotePiece(promCoords,newPiece);

    this._isPromotionActive = false;
    this._promotionAvailableAt = null;
    this._promotionAvailableForColor = null;
  }
}
