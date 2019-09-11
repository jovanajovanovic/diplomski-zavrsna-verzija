#sve funkcije koje su vezane za pravljenje novog recepta i njegovo cuvanje u bazi
from textx import metamodel_from_file
from ..models import *
from ..serializer import *
from ..dtomodel import *
import sys
from .textXService import *
from django.core import serializers


def addNewRecipe(command):
    try:
        m = create_model(command)
        for c in m.commands:
            if c.__class__.__name__ == "Create_recipe":
                print ("Create recipe with name: " + c.recipe_name)
                print("Weight: " + c.weight)
                print("Category: " + c.category)
                print("Preparation time: " + str(c.time.time) + "min")
                pt = c.time.time
                r = Recipe(name=c.recipe_name, weight=c.weight, category=c.category, time=pt)

                ingredients = []
                print( "Potrebni sastojci:")
                for i in c.ingredients:
                    print (str(i.quantity.q) + " " + i.quantity.unitMeasure + " " + i.ingredient_name)
                    ing = Ingredient(name= i.ingredient_name, quantity = i.quantity.q, unit = i.quantity.unitMeasure)
                    ingredients.append(ing)
                steps = []
                steps_num = []
                for s in c.steps:
                    print ("STEP " + str(s.no) + ": " + s.step_doing)
                    if steps_num.__contains__(s.no) == True:
                        print("Vec postoji korak sa tim rednim brojem")
                        e = Exception
                        return e, False
                    steps_num.append(s.no)
                    st = Step(numOfStep= s.no, description = s.step_doing)
                    steps.append(st)
                r.save()
                for i in ingredients:
                    i.recipe = r
                    i.save()
                for s in steps:
                    s.recipe = r
                    s.save()
                res = serializers.serialize("json", Recipe.objects.filter(pk=r.id))
                return res, True
    except:
        e = sys.exc_info()[0]
        print(e)
        return e, False


def deleteRecipe(command):
    try:
        m = create_model(command)
        for c in m.commands:
            if c.__class__.__name__ == "Delete_recipe":
                print("Delete recipe with pk " + str(c.pk))
                res = Recipe.objects.filter(pk=c.pk)
                if len(res) > 0:
                    res.delete()
                else:
                 return False, "Not exist"

            return True, "Success delete recipe"
    except:
        e = sys.exc_info()[0]
        print(e)
        return False, "Recipe does not delete"
