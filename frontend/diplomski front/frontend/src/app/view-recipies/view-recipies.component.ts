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

  recipies : Recipie[];
  message : string;
  constructor(private router: Router, private recipieService : RecipeService) { }

  ngOnInit() {
    this.recipieService.getRecipie()
    .subscribe(data => {
      this.recipies = data;
    },error => {
      this.message= error.error;
    })

    this.recipies.forEach(element => {
      alert(element)
    });
  }

}
