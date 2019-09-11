import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipeCommandComponent } from './new-recipe-command.component';

describe('NewRecipeCommandComponent', () => {
  let component: NewRecipeCommandComponent;
  let fixture: ComponentFixture<NewRecipeCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRecipeCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecipeCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
