import { Component, OnInit } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { VirtualTimeScheduler } from 'rxjs';

import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe-form',
  templateUrl: './new-recipe-form.component.html',
  styleUrls: ['./new-recipe-form.component.scss']
})
export class NewRecipeFormComponent implements OnInit {

  constructor(private router: Router) { }

  id : string;
  new_id : number;
  stepNum: any;

  ngOnInit() {
  }

  appendIng(event){
    var id = event.target.attributes.id.value;
    alert(id);
   // document.getElementById(id).style.visibility = 'hidden';
  
    var tokens = id.split("_");
    var num_id = parseInt(tokens[1]) + 1;
    $("#ingridients").append('<div class="row" id="div_' + num_id + '"> <div class="col-12 col-lg-2"> <input type="number" min="0" name="ing" class="form-control" id="quantity" step="0.1" placeholder="Quantity"></div>'+
    '<div class="col-12 col-lg-2"><select name="selectIngUnit" id="selectIngUnit" placeholder="Unit" class="form-control">'+
      '<option> g </option>' +
      '<option> kg </option>' +
      '<option> ml </option>' +
      '<option> dl </option>' +
      '<option> l </option>' +
      '<option> spoon </option>'+
      '<option> cup </option>'+
    '</select> </div>'+
  '<div class="col-12 col-lg-6"> <input type="text" class="form-control" id="name" placeholder="Name">  </div>'+
  '<div class="col-12 col-lg-1">	<input class="btn" id="plus_' + num_id + '" type="button" onclick="appendIng(this)" value="+"></input></div>' + 
  '<div class="col-12 col-lg-1">	<input class="btn" id="minus_' + num_id + '" type="button" onclick="deleteIng(this)" value="-"></input></div>' +
  '<div class="col-12 col-lg-12"> </div> </div>');
 // document.getElementById("minus_" + tokens[1]).style.visibility = 'hidden';
  }
  
  deleteIng(event){
    var id = event.target.attributes.id.value;
    var tokens = id.split("_");
    var idNum = tokens[1];
    var deleteE = "div_" + idNum;
    var elem = document.getElementById("div_" + idNum);
    elem.remove();
    //ovaj izbrise a prethodnom treba da doda plus 
    var plus_id = idNum - 1;
   // document.getElementById("plus_" + plus_id).style.visibility = 'visible';
  ///  document.getElementById("minus_" + plus_id).style.visibility = 'visible';
    
    
  }


  appendStep(value){
    alert(value.target.attributes.id.value)
    this.id = value.target.attributes.id.value;
    //$("#" + this.id ).css({'background-color': 'yellow', 'font-size': '200%'});
    //document.getElementById(this.id).style.visibility = 'hidden';
    this.id = this.id.split("_")[2];
    alert(this.id)
    
    this.new_id = parseInt(this.id) + 1;
    this.stepNum = 0;
    if (this.new_id < 10){
      this.stepNum = "0" + this.new_id + ".";
    } else {
      this.stepNum = this.new_id + ".";
    }

    $("#steps").append('<div class="row" id="div_step_' + this.new_id +'">' +
											'<div class="col-12 col-lg-10"> ' +
												'<h4>' + this.stepNum + '<textarea name="step" class="form-control" id="step_text_'+this.new_id +'" cols="15" rows="5" placeholder="Step"> </textarea> '+
											'</div>' +
											'<div class="col-12 col-lg-1">' +
												'<input class="btn" id="step_plus_' + this.new_id +'" type="button" (click)="appendStep($event)"  value="+"></input> </div> '+
												'<div class="col-12 col-lg-1"> <input class="btn" id="step_minus_' + this.new_id +'" type="button" (click)="deleteStep($event)" value="-"></input> ' +
											'</div>'+
										'</div>' +
										'<div class="col-12 col-lg-12"> </div>');
			
			
			//cim doda novi step treba da obrise minus od prethodnog 
			//document.getElementById("step_minus_" + this.id).style.visibility = 'hidden';
    
}

deleteStep(event){
  var id = event.target.attributes.id.value;
  alert(id);
  var tokens = id.split("_");
  var idNum = tokens[2];
  var deleteE = "div_" + idNum;
  var elem = document.getElementById("div_step_" + idNum);
  elem.remove();
  //ovaj izbrise a prethodnom treba da doda plus i minus 
  var plus_id = idNum - 1;
  //document.getElementById("step_plus_" + plus_id).style.visibility = 'visible';
  //document.getElementById("step_minus_" + plus_id).style.visibility = 'visible';
  
  
}
}
