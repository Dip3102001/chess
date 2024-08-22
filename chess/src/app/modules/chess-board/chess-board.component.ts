import { Component, OnInit } from '@angular/core';
import { ServicepieceService } from '../../servicepiece.service';
import { PieceURL } from '../../chess-item/models';
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
  
  public map:Map<String,String>;
  public chessBoard: ChessBoard;

  constructor(private getpiece: ServicepieceService){ 
    this.map = new Map<String,String>();
    this.chessBoard = new ChessBoard();
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



    
}
