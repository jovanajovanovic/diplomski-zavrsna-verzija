import { Component, OnInit } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { VirtualTimeScheduler } from 'rxjs';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { IngredientField, StepField, Recipie } from '../../model/Recipie';
import { RecipeService } from '../../services/recipe.service';



@Component({
  selector: 'app-new-recipe-form',
  templateUrl: './new-recipe-form.component.html',
  styleUrls: ['./new-recipe-form.component.scss']
})
export class NewRecipeFormComponent implements OnInit {

   units = ["g", "kg", "ml", "dl", "l", "small spoon", "big spoon", "cup", ""];

  categories = ["SANDWICH", "BREAKFAST", "APPETIZER", "SALAD", "DINNER", "LUNCH", "SOUP", "HRONO", "DESERT", "PIZZA", "BURGER"];
  
   weights= ["EASY", "MIDDLE", "HARD"];

  constructor(private router: Router, private service : RecipeService ) { }

  ingItems : IngredientField [] = [];
  stepItems : StepField[] = [];
  stepNum : number;
  ingNum : number;

  recipeName : string = '';
  category : string = '' ;
  weight : string  = '';
  time : number = 0;

  message : string = "";
  
  recipe : Recipie;
  ngOnInit() {
    this.recipeName = '';
    this.category = '';
    this.weight = '';
    this.time = 0;
    var i = {
      name :'',
      quantity : '0.0',
      unit : ''
    };
    this.ingItems.push(i);
    this.ingNum = 1;
    this.stepNum = 1;

    var s= {
      numOfStep : this.stepNum, 
      description : ''
    }
    this.stepItems.push(s);
  }

  addStep(){
    this.stepNum = this.stepNum +1;
    var s  = {
        numOfStep : this.stepNum, 
        description : ''
    }

    this.stepItems.push(s);
    
  }

  deleteStep(){
    //brisemo poslednji korak 
    this.stepItems.pop();
    this.stepNum = this.stepNum -1; 
  }
  

  addIng(){
    var i = {
      name :'',
      quantity : '0.0',
      unit : ''
    };
    this.ingItems.push(i);
    this.ingNum = this.ingNum + 1; 
  }

  deleteIng(){
    this.ingItems.pop();
    this.ingNum = this.ingNum - 1;
  }

  addRecipe(){
    this.service.newFormRecipe(this.recipeName, this.weight, this.category, this.time, this.ingItems, this.stepItems).subscribe(
      data => {
        this.recipe = data[0];
        this.router.navigate(['/main/viewRecipe'],  {queryParams: {recipe: this.recipe.pk}})
      }, error => {
        this.message = "You have some error in command for adding recipe! Please try again.";
      }
    );
  }
}
