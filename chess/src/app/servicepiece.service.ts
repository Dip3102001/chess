import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Piece } from './chess-item/models';

@Injectable({
  providedIn: 'root'
})
export class ServicepieceService {

  private assetURL = "../assets/pieces/pieces.json";

  constructor(private http : HttpClient) { }

  getAssetData() : Observable<Piece[]>{
    return this.http.get<Piece[]>(this.assetURL,{responseType: 'json'});
  }

}
