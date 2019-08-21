import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../model/Recipie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  readonly url = "http://127.0.0.1:8000/polls"

  constructor(private http: HttpClient) { }


  getIngredients(id): Observable<Ingredient[]>{
      return this.http.get<Ingredient[]>(`${this.url}/getIngredients/${id}`);
  }
}
