from django.shortcuts import render
from rest_framework.status import HTTP_400_BAD_REQUEST

from .services import newRecipeService, searchRecipe
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .serializer import *
import json

import pickle

from .dtomodel import *
import sys
from django.http import JsonResponse

# Create your views here.
from django.http import HttpResponse

sys.setrecursionlimit(1500)

def index(request):
    return render(request, "index.html")


@api_view(['GET'])
def getAllRecipe(request):
    result = searchRecipe.getAllRecipe()
    print(result)
    return HttpResponse(result, content_type="application/json")


@api_view(['GET'])
def getRecipeById(request, id):
    print(str(id))
    result = searchRecipe.search_recipies_byId(id)
    return HttpResponse(result, content_type="application/json")

@api_view(['GET'])
def search(request):
    command = request.data

    new_command = command.get("command")
    print(new_command)

    result = searchRecipe.searchRecipeFunc(new_command)

    return HttpResponse(result, content_type="application/json")

@api_view(['GET'])
def getIngredientsByRecipe(request, id):
    print(str(id))
    result = searchRecipe.search_ingredients_by_recipe(id)
    return HttpResponse(result, content_type="application/json")

@api_view(['GET'])
def getStepsByRecipe(request, id):
    print(str(id))
    result = searchRecipe.search_steps_by_recipe(id)
    return HttpResponse(result, content_type="application/json")


@csrf_exempt
@api_view(['POST'])
def newRecipe(request):
    #newRecipeService.addNewRecipe(request)
    command = request.data

    new_command = command.get("command")
    print(new_command)
    recipe, success = newRecipeService.addNewRecipe(new_command)

    if success is True:
        if recipe is not None:
            data = json.dumps(recipe, cls=CustomJsonEncoder)
            return HttpResponse(data, content_type="application/json") #radi
    else:
        return HttpResponse(status=HTTP_400_BAD_REQUEST)
