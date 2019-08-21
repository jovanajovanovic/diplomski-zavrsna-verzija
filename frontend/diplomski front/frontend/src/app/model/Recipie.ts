export interface Recipie{
    pk? : number;
    model : string;
    fields : RecipieField;
}


export interface RecipieField{
    name : string;
    category : string;
    weight : string;
    time : number;
}


export interface Ingredient {
    pk? : number;
    fields : IngredientField;
}

export interface IngredientField{
    name : string;
    quantity : string;
    unit : string;
}

export interface Step {
    pk? : number;
    fields : StepField;
}

export interface StepField{
    numOfStep : number; 
    description : string;
}