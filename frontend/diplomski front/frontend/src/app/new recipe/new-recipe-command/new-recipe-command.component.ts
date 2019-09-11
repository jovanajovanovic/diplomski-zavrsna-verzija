import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipie } from '../../model/Recipie';
@Component({
  selector: 'app-new-recipe-command',
  templateUrl: './new-recipe-command.component.html',
  styleUrls: ['./new-recipe-command.component.scss']
})
export class NewRecipeCommandComponent implements OnInit {

  command : string = '';
  constructor(private router : Router, private recipeService : RecipeService) { }

  recipe : Recipie;
  message : string = '';
  ngOnInit() {
  }

  onChange(event){
    var val = event.target.value;
      var newText="";
      $("#description").empty();
      if (val == "1"){
        newText += "<p> "+
        "			<strong>ADD RECIPE</strong> 'recipe_name' " +
        "			<strong>IN CATEGORY</strong> 'name of category', " +
        "			<strong>INGREDIENTS </strong>( quantity unit 'name of ingredient' [,] ), " +
        "			<strong>STEPS</strong>( <strong> STEP </strong> number of step : 'description' [,] ), " +
        "			<strong>PREPARATION TIME </strong> time min, <strong> PREPARATION WEIGHT </strong> weight " +
        "		</p>";
      }else if (val == "2"){
        //easy, middle, hard
        newText += '<p><ul> <li> EASY </li> <li> MIDDLE </li> <li> HARD </li></ul></p>'
      }else if (val == "4"){
        //g, kg, ml, dl, l, spoon, cup
        newText += '<p><ul> <li>g </li> kg<li></li><li>ml</li> <li> dl </li> <li> l </li> <li> small spooon </li> <li> big spoon </li> <li> cup </li> <ul></p>' 
      }else if (val == "5"){
        //"SANDWICH"|"MAIN COURSE" |"APPETIZER"|"SALAD"| "HRONO"|"DESERT"|"DINNER"
        newText += '<p><ul> <li>SANDWICH</li><li>LUNCH</li><li>APPETIZER</li><li>SALAD</li><li>HRONO</li></li>DESERT</li><li>DINNER</li><li>SOUP</li><li>BREAKFAST</li><li>PIZZA</li><li>BURGER</li></ul></p>'
      }
      
      $("#description").append(newText);
    
  }

  addRecipe(){
    this.recipeService.addRecipe(this.command).subscribe(
      data => {
        this.recipe = data[0];
        this.router.navigate(['/main/viewRecipe'],  {queryParams: {recipe: this.recipe.pk}})
      }, error => {
        this.message = "You have some error in command for adding recipe! Please try again.";
      }
    );
  }
}
