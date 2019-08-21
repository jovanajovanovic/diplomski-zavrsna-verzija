import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipie, Ingredient, Step } from '../model/Recipie';
import { IngredientService } from '../services/ingredient.service';
import { StepService } from '../services/step.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {

  @Input() recipe : Recipie;

  ingredients: Ingredient[];
  steps : Step[];
  message : string;

  constructor(private router: Router, private ingService : IngredientService, private stepService: StepService) { }

  ngOnInit() {
    //dopremimo sastojke i korake za recepte 
    this.getIngredients();
    this.getSteps();
  }

  getIngredients(){
    this.ingService.getIngredients(this.recipe.pk)
    .subscribe(data => {
      this.ingredients = data;
      
    },error => {
      this.message= error.error;
    });
  }

  getSteps(){
    this.stepService.getSteps(this.recipe.pk)
    .subscribe(data => {
      this.steps = data;
      
    },error => {
      this.message= error.error;
    });
  }
}
