import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PieceURL } from './chess-item/models';

@Injectable({
  providedIn: 'root'
})
export class ServicepieceService {

  private assetURL = "../assets/pieces/pieces.json";

  constructor(private http : HttpClient) { }

  getAssetData() : Observable<PieceURL[]>{
    return this.http.get<PieceURL[]>(this.assetURL,{responseType: 'json'});
  }

}
