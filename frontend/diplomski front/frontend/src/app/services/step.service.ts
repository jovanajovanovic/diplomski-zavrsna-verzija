import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Step } from '../model/Recipie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  readonly url = "http://127.0.0.1:8000/polls"


  constructor(private http: HttpClient) { }


  getSteps(id): Observable<Step[]>{
    return this.http.get<Step[]>(`${this.url}/getSteps/${id}`);
}
}
