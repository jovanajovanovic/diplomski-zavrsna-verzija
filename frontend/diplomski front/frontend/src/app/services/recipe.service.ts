import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipie, IngredientField, StepField, SendCommand } from '../model/Recipie'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  readonly url = "http://127.0.0.1:8000/polls"

  constructor(private http: HttpClient) { }

  data: SendCommand;
  //dobavimo sve recepte

  getRecipie(): Observable<Recipie[]> {
    return this.http.get<Recipie[]>(`${this.url}/get`);
  }

  getRecipieById(id): Observable<Recipie[]> {
    return this.http.get<Recipie[]>(`${this.url}/getId/${id}`);
  }

  deleteRecipe(pk: number):Observable<String> {
    this.data = {
      command : "DELETE RECIPE " + pk
    }
    return this.http.post(`${this.url}/deleteRecipe`, this.data,  { headers: this.headers, responseType: "text"});
  }




  newFormRecipe(name: string, weight: string, category: string, time: number, ingredients: IngredientField[], steps: StepField[])
    : Observable<Recipie[]> {
    var ingString = ""
    ingredients.forEach(element => {
      if (ingString != "") {
        ingString += ","
      }
      ingString += element.quantity + " " + element.unit + " " + "'" + element.name + "'";
    });

    var stepString = "";
    steps.forEach(element => {
      if (stepString != "") {
        stepString += ",";
      }
      stepString += "STEP " + element.numOfStep + " :  '" + element.description + "'";
    });
    var command = "ADD RECIPE '" + name + "' " +
      "IN CATEGORY " + category + "," +
      "INGREDIENTS (" + ingString + ") ," +
      "STEPS (" + stepString + ") ," +
      "PREPARATION TIME " + time + " min, PREPARATION WEIGHT " + weight;


    return this.addRecipe(command);
  }


  addRecipe(command: string): Observable<Recipie[]> {
    this.data
      = {
        "command": command
      }

    return this.http.post<Recipie[]>(`${this.url}/add`, this.data, { headers: this.headers });
  }


  searchRecipe(name: string, category: string, weight: string, ingredients: string, op: string, time: number): Observable<Recipie[]> {
    var command = "VIEW RECIPE WHICH ";
    if (name != '') {
      command += "NAME IS '" + name + "'";
    }
    if (category != '') {
      if (name != '') {
        command += " , ";
      }
      command += "CATEGORY IS " + category;
    }
    if (weight != '') {
      if (name != '' || category != '') {
        command += " , ";
      }
      command += "WEIGHT IS " + weight;
    }
    if (time != 0) {
      if (name != '' || category != '' || weight != '') {
        if (op == '') {
          op = "IS "
        }
        command += " , ";
      }
      command += "TIME " + op + " " + time;
    }
    if (ingredients != '') {
      if (name != '' || category != '' || weight != '' || time != 0) {
        command += " , ";
      }
      var list_ing = ingredients.split(',');
      var string_ing = "";
      list_ing.forEach(element => {
        if (string_ing != '') {
          string_ing += ","
        }
        string_ing += "'" + element + "'";
      });
      command += "CONTAINS INGREDIENTS " + string_ing;
    }


    return this.searchRecipieFunction(command);
  }


  searchRecipieFunction(command: string): Observable<Recipie[]> {
    this.data
      = {
        "command": command
      }

    return this.http.post<Recipie[]>(`${this.url}/search`, this.data, { headers: this.headers });
  }
}
