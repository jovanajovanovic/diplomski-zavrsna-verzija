import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-recipe-form',
  templateUrl: './new-recipe-form.component.html',
  styleUrls: ['./new-recipe-form.component.scss']
})
export class NewRecipeFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  appendStep(event){
    alert(event)
    var target = event.target || event.srcElement || event.currentTarget;
    var idAtt = target.attributes.id;
    alert(idAtt)
    
  /*  document.getElementById(elem.id).style.visibility = 'hidden';
    var id = elem.id.split("_")[2];
    
    
    var new_id = parseInt(id) + 1;
    var stepNum = 0;
    if (parseInt(new_id) < 10){
      stepNum = "0" + new_id + ".";
    } else {
      stepNum = new_id + ".";
      }
    $("#steps").append('<div class="row" id="div_step_' + new_id +'">' +
                    '<div class="col-12 col-lg-10"> ' +
                      '<h4>' + stepNum + '<textarea name="step" class="form-control" id="step_text_'+new_id +'" cols="15" rows="5" placeholder="Step"> </textarea> '+
                    '</div>' +
                    '<div class="col-12 col-lg-1">' +
                      '<input class="btn" id="step_plus_' + new_id +'" type="button" onclick="appendStep(this)" value="+"></input> </div> '+
                      '<div class="col-12 col-lg-1"> <input class="btn" id="step_minus_' + new_id +'" type="button" onclick="deleteStep(this)" value="-"></input> ' +
                    '</div>'+
                  '</div>' +
                  '<div class="col-12 col-lg-12"> </div>');
    
    
    //cim doda novi step treba da obrise minus od prethodnog 
    document.getElementById("step_minus_" + id).style.visibility = 'hidden';*/
  }
}
