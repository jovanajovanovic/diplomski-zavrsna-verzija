import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipie, IngredientField, StepField} from '../model/Recipie'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  headers:{    
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' 
  }
  readonly url = "http://127.0.0.1:8000/polls"

  constructor(private http : HttpClient) { }


  //dobavimo sve recepte

  getRecipie() : Observable<Recipie[]> {
    return this.http.get<Recipie[]>(`${this.url}/get`);
  }

  newFormRecipe(name:string, weight:string, category: string, time:number, ingredients:IngredientField[], steps: StepField[]){
    var ingString = ""
    ingredients.forEach(element => {
      if (ingString != ""){
        ingString += ","
      }
      ingString += element.quantity + " " + element.unit + " " + "'" + element.name + "'";
    });

    var stepString = "";
    steps.forEach(element => {
      if (stepString != ""){
        stepString += ",";
      }
      stepString += "STEP " + element.numOfStep + " '" + element.description +"'";
    });
    var command = "ADD RECIPE '" + name +"' "+ 
     "IN CATEGORY " +  category + "," +
    "INGREDIENTS (" + ingString + ") ,"+
    "STEPS (" + stepString + ") ,"+
    "PREPARATION TIME " + time + ", PREPARATION WEIGHT " + weight;

    alert(command);
  }
}
