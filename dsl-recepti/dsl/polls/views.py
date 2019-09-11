from django.shortcuts import render
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK

from .services import newRecipeService, searchRecipe
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import sys
from django.http import HttpResponse

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
def getIngredientsByRecipe(request, id):
    print(str(id))
    result = searchRecipe.search_ingredients_by_recipe(id)
    return HttpResponse(result, content_type="application/json")
@api_view(['GET'])
def getStepsByRecipe(request, id):
    print(str(id))
    result = searchRecipe.search_steps_by_recipe(id)
    return HttpResponse(result, content_type="application/json")


@api_view(['POST'])
def deleteRecipe(request):
    print(request.data)
    command = request.data
    new_command = command.get("command")
    print(new_command)
    success, message = newRecipeService.deleteRecipe(new_command)
    if success is True:
        return  HttpResponse(message, status=HTTP_200_OK)
    else:
        if message=="Not exist":
            return HttpResponse(message, status=HTTP_404_NOT_FOUND)
        else:
            return HttpResponse(message, status=HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def newRecipe(request):
    command = request.data
    new_command = command.get("command")
    print(new_command)
    recipe, success = newRecipeService.addNewRecipe(new_command)

    if success is True:
        if recipe is not None:
           return HttpResponse(recipe, content_type="application/json")
    else:
        return HttpResponse(status=HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def search(request):
    command = request.data

    new_command = command.get("command")
    print(new_command)

    result = searchRecipe.searchRecipeFunc(new_command)

    return HttpResponse(result, content_type="application/json")