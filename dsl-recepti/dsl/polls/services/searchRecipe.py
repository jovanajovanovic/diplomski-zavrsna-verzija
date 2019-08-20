from ..models import *
from ..dtomodel import *
from .textXService import *
from django.core import serializers


def getAllRecipe():
    data = serializers.serialize("json",Recipe.objects.all().filter(name='plazma torta'))

    return data


def searchRecipeFunc(command):

    try:
        model = create_model("VIEW RECIPE WHICH NAME IS 'plazma torta'")

        name = ""
        category = ""
        weight = ""
        time = 0
        op = ""
        ingredients = []
        print(model)
        #proverimo sta imamo od podataka
        for c in model.commands:
            if c.__class__.__name__ == "Search_recipe":
                print("Pretraga recepta")
                for com in c.criteri:
                    if com.__class__.__name__ == "Search_by_name":
                        print(com.name)
                        name = com.name
                    elif com.__class__.__name__ == "Search_by_category":
                        print(com.category)
                        category = com.category
                    elif com.__class__.__name__ == "Search_by_weight":
                        print(com.weight)
                        weight = com.weight
                    elif com.__class__.__name__ == "Search_by_time":
                        print(com.op + " " + str(com.time))
                        time = com.time
                        op = com.op
                    elif com.__class__.__name__ == "Search_by_ingredient":
                        ingredients = com.ingredients

        data = search(name, category, weight, time, op, ingredients)
        data = serializers.serialize("json", data)
        return data
    except:
        print("error")

def search(name, category, weight, time, op, ingredients):
    #ako ne postoji name onda necemo ni traziti po njemu

    if name is not "":
        print ("Pretraga po imenu")
        data1 = Recipe.objects.filter(name=name)

    if category is not "":
        print("Pretraga po kategoriji")
        data2 = Recipe.objects.all().filter(category = category)

    if weight is not "":
        print("Pretraga po tezini")
        data3 = Recipe.objects.all().filter(weight=weight)

    if len(ingredients) > 0:
        data4 = set()
        for i in ingredients:
            data4.add(Ingredient.objects.all().filter(name=i))

    if len(data1) > 0:
        result = data1

    return result
