from ..models import *
from ..dtomodel import *
from .textXService import *
from django.core import serializers


def getAllRecipe():
    data = serializers.serialize("json",Recipe.objects.all())

    return data


def searchRecipeFunc(command):

    try:
        model = create_model(command)

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

        data = search(name, category, weight, time, op)
        for d in data:
            print("Pretraga osim sastojaka: ", d)
        print("Pretraga po svim kriterijumima osim sastojaka: ", len(data))
        print(len(ingredients))
        if len(ingredients) > 0 :
            recipies = search_by_ingredients(ingredients)
            res = set()
            print("Posle pretrage po sastojcima ima: ", len(recipies))
            for r in recipies:
                print("Pretraga sa sastojcima " , r)
            print(len(recipies))
            for i in data:
                if recipies.__contains__(i):
                    print("Postoji u obe liste")
                    res.add(i)
            print("Na kraju ima recepata ", len(res))
            return serializers.serialize("json", res)
        else:
            data = serializers.serialize("json", data)
            return data
    except:
        print("error")

def search(name1, category, weight, time1, op):
    q = Recipe.objects.all()
    q1 = q.filter(name__contains=name1).filter(category__contains=category).filter(weight__contains=weight)
    if time1 != 0:
        if op == "LESS THAN":
            q2 = q1.filter(time__lte= time1)
        elif op == "GREATHER THAN":
            q2 = q1.filter(time__gte= time1)
        else:
            q2 = q1.filter(time = time1)
    if (time1 != 0):
        return q2
    else:
        return q1


def search_by_ingredients(ingredients):
    result = set() #ovde smestamo sve pronadjene recepte
    q = Ingredient.objects.all()
    res = set()
    for i in ingredients:
        print(i)
        q1 = q.filter(name__contains=i)
        print(len(q1))
        res.add(q1)
    print(len(res))
    result2 = set()
    if (len(ingredients)==1):
        for r in res:
            for n in r:
                result.add(n.recipe)
        return result
    for m in res:
        for i in m:
            print(i.recipe.id)
            if result.__contains__(i.recipe):
                result2.add(i.recipe)
            result.add(i.recipe)
    return result2


def search_recipies_byId(id):
    result = Recipe.objects.filter(pk=id)
    print(result)
    return  serializers.serialize("json", result)

def search_ingredients_by_recipe(recipe_id):

    result = Recipe.objects.filter(pk=recipe_id)
    res = result[0]
    ingredients = Ingredient.objects.filter(recipe = res)
    return  serializers.serialize("json", ingredients)

def search_steps_by_recipe(recipe_id):

    result = Recipe.objects.filter(pk=recipe_id)
    res = result[0]
    steps_dto = []
    steps = Step.objects.filter(recipe = res)

    return serializers.serialize("json", steps)
