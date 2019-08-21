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

  categories = ["SANDWICH", "BREAKFAST", "APPETIZER", "SALAD", "DINNER", "LUNCH", "SOUP", "HRONO", "DESERT"];
  
   weights= ["EASY", "MIDDLE", "HARD"];

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
    this.oneRecipie = r;
    this.prikaziJedan = true;
  }


  clickDelicious(){
    this.prikaziJedan = false;
  }

  search(){
    alert("ime " + this.name + " tezina: " + this.weight + " kategorija " + this.category + " op " + this.op + " time " + this.time + " ingredients "  + this.ingredients);
  }
}
