import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicepieceService } from './servicepiece.service';
import { Piece } from './chess-item/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  public map:Map<String,String>;

  constructor(private getpiece: ServicepieceService){ 
    this.map = new Map<String,String>();
  }

  ngOnInit(): void {
    this.getpiece.getAssetData().subscribe((data:Piece[])=>{
      for(let item of data){
        this.map.set(item.piece,item.url);
      }
    });
  }





  

}
