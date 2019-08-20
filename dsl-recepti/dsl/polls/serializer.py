from rest_framework import serializers

from .dtomodel import *
import json
import sys

sys.setrecursionlimit(1500)

class CustomJsonEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, (RecipeDto, IngredientDto, StepDto)):
            return o.__dict__
        else:
            return json.JSONEncoder.encode(self, o)



def obj_dict(obj):
    return obj.__dict__



