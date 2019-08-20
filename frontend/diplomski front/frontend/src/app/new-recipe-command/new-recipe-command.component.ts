import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-recipe-command',
  templateUrl: './new-recipe-command.component.html',
  styleUrls: ['./new-recipe-command.component.scss']
})
export class NewRecipeCommandComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  onChange(event){
    alert(event.target.value);
    var val = event.target.value;
      var newText='';
      $("#description").empty();
      if (val == "1"){
        newText += '<p> '+
                  '			<strong>ADD RECIPE</strong> "recipe_name" ' +
                  '			<strong>IN CATEGORY</strong> "name of category", ' +
                  '			<strong>INGREDIENTS </strong>( "quantity" "measurement unit" "name of ingredient" ['+','+'] ), ' +
                  '			<strong>STEPS</strong>( number of step : "description" ['+','+'] ), ' +
                  '			<strong>PREPARATION TIME </strong> time "time unit", <strong> PREPARATION WEIGHT </strong> weight ' +
                  '		</p>';
      }else if (val == "2"){
        //easy, middle, hard
        newText += '<p><ul> <li> EASY </li> <li> MIDDLE </li> <li> HARD </li></ul></p>'
      }else if (val == "3"){
        //h ili m 
        newText += '<p><ul> <li> h </li> <li> min </li> </ul></p>'
      }else if (val == "4"){
        //g, kg, ml, dl, l, spoon, cup
        newText += '<p><ul> <li>g </li> kg<li></li><li>ml</li> <li> dl </li> <li> l </li> <li> spooon </li> <li> cup </li> <ul></p>' 
      }else if (val == "5"){
        //"SANDWICH"|"MAIN COURSE" |"APPETIZER"|"SALAD"| "HRONO"|"DESERT"|"DINNER"
        newText += '<p><ul> <li>SANDWICH</li> <li>MAIN COURSE</li> <li>APPETIZER</li><li>SALAD</li> <li>HRONO</li><li>DESERT</li> <li>DINNER </li></ul></p>'
      }
      
      $("#description").append(newText);
    
  }
}
