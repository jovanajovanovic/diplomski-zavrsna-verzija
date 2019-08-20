#dto model


class IngredientDto:
    def __init__(self, name, quantity, unit):
        self.name=name
        self.unit=unit
        self.quantity=quantity
    class Meta:
        unique_together = [['name', 'unit', 'quantity']]



class StepDto:
    def __init__(self, num, desc):
        self.no = num
        self.description = desc
    class Meta:
        unique_together = [['no', 'description']]


class RecipeDto:
    def __init__(self, id, name, weight, time, category, steps, ingredients):
        self.id=id
        self.name=name
        self.weight=weight
        self.time=time
        self.category=category
        self.steps = steps
        self.ingredients=ingredients
    class Meta:
        unique_together = [['id','name', 'weight', 'time', 'category', 'ingredients', 'steps']]


class RecipiesDto:
    def __init__(self, recipies):
        self.recipies = recipies
