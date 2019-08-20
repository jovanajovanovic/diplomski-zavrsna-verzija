import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-recipies',
  templateUrl: './view-recipies.component.html',
  styleUrls: ['./view-recipies.component.scss']
})
export class ViewRecipiesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
