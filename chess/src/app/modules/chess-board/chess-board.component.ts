import { Component, OnInit } from '@angular/core';
import { ServicepieceService } from '../../servicepiece.service';
import { Char, Color, Coords, PieceURL } from '../../chess-item/models';
import { ChessBoard } from '../../chess-item/chess-board';
import { NgClass, NgFor, NgIf } from '@angular/common';

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
  private turn : Color;
  private selectedPossibleMoves : Coords[]|null;
  private transitionStateInit : boolean;
  
  private selectedPieceCoords : Coords | null;

  constructor(private getpiece: ServicepieceService){ 
    this.map = new Map<String,String>();
    this.chessBoard = new ChessBoard();
    this.turn = Color.White;
    this.selectedPossibleMoves = null;

    this.transitionStateInit = false;
    this.selectedPieceCoords = null; 
  }

  ngOnInit(): void {
    this.getpiece.getAssetData().subscribe((data:PieceURL[])=>{
      for(let item of data){
        this.map.set(item.piece,item.url);
      }
    });
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

  public possibility(x : number, y : number) : void{
    if(!this.transitionStateInit && this.chessBoard.viewChessBoard[x][y] === null)
      this.selectedPossibleMoves = null;
    else if(!this.transitionStateInit && this.chessBoard.viewChessBoard[x][y] !== null){
      const color : Color = this.getColorFromCode(this.chessBoard.viewChessBoard[x][y]);
      if(color === this.turn){
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
        // console.log(this.selectedPossibleMoves);
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
    this.turn = (this.turn === Color.White)? Color.Black : Color.White;
  }
}
