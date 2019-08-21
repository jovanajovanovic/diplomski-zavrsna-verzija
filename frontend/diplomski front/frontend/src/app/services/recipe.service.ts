import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipie} from '../model/Recipie'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  readonly url = "http://127.0.0.1:8000/polls/"

  constructor(private http : HttpClient) { }


  //dobavimo sve recepte

  getRecipie() : Observable<Recipie[]> {
    return this.http.get<Recipie[]>(`${this.url}/get`);
  }
}
