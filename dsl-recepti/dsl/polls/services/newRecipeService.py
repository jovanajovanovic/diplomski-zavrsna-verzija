#sve funkcije koje su vezane za pravljenje novog recepta i njegovo cuvanje u bazi
from textx import metamodel_from_file
from ..models import *
from ..serializer import *
from ..dtomodel import *
import sys
from .textXService import *
from django.core import serializers


def addNewRecipe(command):
    #sa fronta dobijemo zeljenu komandu


    #sad uradimo povezivanje sa text
    try:
        m = create_model(command)

        #ovde sad kreiramo recept, sastojke i ostalo
        for c in m.commands:
            if c.__class__.__name__ == "Create_recipe":
                print ("Create recipe with name: " + c.recipe_name)
                print("Weight: " + c.weight)
                print("Category: " + c.category)
               #kreiramo recept i sacuvamo ga u bazi


                print("Preparation time: " + str(c.time.time) + "min")
                #ubacimo potrebno vreme pripreme
                pt = c.time.time

                r = Recipe(name=c.recipe_name, weight=c.weight, category=c.category, time=pt)
                r.save()
                #ubacimo svaki sastojak posebno
                ingredients = []
                print( "Potrebni sastojci:")
                for i in c.ingredients:
                    print (str(i.quantity.q) + " " + i.quantity.unitMeasure + " " + i.ingredient_name)
                    ing = Ingredient(recipe = r, name= i.ingredient_name, quantity = i.quantity.q, unit = i.quantity.unitMeasure)
                    ing.save()
                    ingredients.append(IngredientDto(name=ing.name, unit=ing.unit, quantity=ing.quantity))
                #sacuvamo korake
                steps = []
                for s in c.steps:
                    print ("STEP " + str(s.no) + ": " + s.step_doing)
                    st = Step(recipe = r, numOfStep= s.no, description = s.step_doing)
                    st.save()
                    steps.append(StepDto(num=st.numOfStep, desc=st.description))
             #   dto = RecipeDTO(id=r.id, name=r.name, steps=steps, ingredients=ingredients, weight=r.weight, category=r.category, time=ptdto)

                dto = RecipeDto(id=r.id, name=r.name, steps=steps, ingredients=ingredients, weight=r.weight, category=r.category, time=r.time)
                res = serializers.serialize("json", Recipe.objects.filter(pk=r.id))
                return res, True
    except:
        e = sys.exc_info()[0]
        print(e)
        return e, False


#funkcija za izmenu recepta

#pretraga recepata

#
