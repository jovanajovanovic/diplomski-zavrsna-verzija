import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipie, Ingredient, Step } from '../../model/Recipie';
import { IngredientService } from '../../services/ingredient.service';
import { StepService } from '../../services/step.service';
import { RecipeService } from '../../services/recipe.service';
import { PdfMakeWrapper, Txt, Stack, Img} from 'pdfmake-wrapper';


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
  message : String;

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


  convertToPdf(){
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageMargins([ 40, 60, 40, 60 ]);
    pdf.info({
      title: this.recipe.fields.name
    })
    pdf.add(new Txt(this.recipe.fields.name).bold().alignment('center').end);
    pdf.add("\n");
    pdf.add(new Txt("Category: " + this.recipe.fields.category).alignment('center').end);
    pdf.add(new Txt("Preparation weight: " + this.recipe.fields.weight).alignment('center').end);
    pdf.add(new Txt("Preparation time: " + this.recipe.fields.time + " min").alignment('center').end);
    pdf.add("\n");
    pdf.add("Ingredients: ");
    this.ingredients.forEach(element => {
      pdf.add(new Txt(element.fields.quantity + " " + element.fields.unit + " " + element.fields.name).alignment('left').end);
    });
    pdf.add("\n");
    pdf.add("Steps:")
    this.steps.forEach(element => {
      pdf.add(element.fields.numOfStep + ". " + element.fields.description);
    });
    pdf.create().open();

  }


  delete(){
    this.recipeService.deleteRecipe(this.recipe.pk)
    .subscribe(data => {
      this.message = data;
      alert(this.message)
      this.router.navigate(['/main'])
    },error => {
      alert(error.status)
      if (error.status == 404){
        this.message = "Recipe does not exist";
      }   
      
      else {
        this.message = "Recipe does not success delete";
      }
      alert(this.message);
    });
  }
}
