import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipie} from '../model/Recipie'
@Component({
  selector: 'app-view-recipies',
  templateUrl: './view-recipies.component.html',
  styleUrls: ['./view-recipies.component.scss']
})
export class ViewRecipiesComponent implements OnInit {

  categories = ["SANDWICH", "BREAKFAST", "APPETIZER", "SALAD", "DINNER", "LUNCH", "SOUP", "HRONO", "DESERT", "PIZZA", "BURGER", ""];
  
   weights= ["EASY", "MIDDLE", "HARD", ""];

  operators = [{"value": "IS", "op" : "="}, {"value" : "LESS THAN", "op" : "<"}, {"value": "GREATHER THAN", "op": ">"}, {"value": "", "op" : ""}];

  name: string = '';
  ingredients :string = '';
  time: number = 0;
  op : string = '=';
  weight : string = '';
  category: string = '';


  prikaziJedan : boolean;

  oneRecipie : Recipie;
  recipies : Recipie[];
  message : string;
  constructor(private router: Router, private recipieService : RecipeService) { }

  ngOnInit() {
    this.getRecipies();
    this.prikaziJedan = false;
  }


  getRecipies(){
    this.recipieService.getRecipie()
    .subscribe(data => {
      this.recipies = data;
      
    },error => {
      this.message= error.error;
    });

  }


  chosenRecipie(r){
    this.router.navigate(['/main/viewRecipe'],  {queryParams: {recipe: r.pk}});
  }


  clickDelicious(){
    this.prikaziJedan = false;
  }

  search(){
  
    
    this.recipieService.searchRecipe(this.name, this.category, this.weight, this.ingredients, this.op,this.time).subscribe(data => {
      this.recipies = data;
      
    },error => {
      this.message= error.error;
    });
  
  }
}
