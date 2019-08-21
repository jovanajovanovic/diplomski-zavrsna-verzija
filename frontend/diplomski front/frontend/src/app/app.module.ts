import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NewRecipeFormComponent } from './new-recipe-form/new-recipe-form.component';
import { NewRecipeCommandComponent } from './new-recipe-command/new-recipe-command.component';
import { ViewRecipiesComponent } from './view-recipies/view-recipies.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import {RecipeService} from '../app/services/recipe.service'
import { HttpClientModule } from '@angular/common/http';
import { IngredientService } from './services/ingredient.service';
import { StepService } from './services/step.service';

const appRoutes : Routes = [
  {
    path : "main", 
    component : MainComponent, 
    children : [
      {path: '', component: ViewRecipiesComponent},
      {path: 'viewRecipe', component: ViewRecipeComponent},
      {path: 'newRecipeCommand', component: NewRecipeCommandComponent}, 
      {path: 'newRecipeForm', component: NewRecipeFormComponent}
    ]
  }, 
  {path: "", redirectTo: "/main", pathMatch: "full"},
  {path: "**", component: NotFoundPageComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    NotFoundPageComponent,
    NewRecipeFormComponent,
    NewRecipeCommandComponent,
    ViewRecipiesComponent,
    ViewRecipeComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes, 
      {enableTracing: true}
    ),
    HttpClientModule
  ],
  providers: [
    NgbDropdown,
    RecipeService, 
    IngredientService, 
    StepService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
