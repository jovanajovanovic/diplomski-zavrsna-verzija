import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipie, Ingredient, Step } from '../model/Recipie';
import { IngredientService } from '../services/ingredient.service';
import { StepService } from '../services/step.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {

  recipe : Recipie;
  id : any;
  ingredients: Ingredient[];
  steps : Step[];
  message : string;

  constructor(private route: ActivatedRoute,private router: Router, private ingService : IngredientService, private stepService: StepService, private recipeService: RecipeService) { }

  ngOnInit() {
    //dopremimo sastojke i korake za recepte 
    this.route.queryParams.subscribe(params => this.id = params['recipe']);

    this.getRecipe();
    
  }


  getRecipe(){
    this.recipeService.getRecipieById(this.id).subscribe(
      data => {
        this.recipe = data[0];
        this.getIngredients();
        this.getSteps();
      }, error => {
        this.message = error.error;
      }
    )
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
