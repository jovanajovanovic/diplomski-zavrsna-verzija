from django.db import models

# Create your models here.
from django.db import models


class Recipe(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    weight = models.CharField(max_length=200)
    preparationTime = models.PositiveIntegerField()

class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete = models.CASCADE)
    name = models.CharField(max_length=200)
    quantity = models.DecimalField(max_digits = 5, decimal_places = 2)
    unit = models.CharField(max_length=200)

    def __str__(self):
        return str(self.quantity) + " " + self.unit + " " + self.name



class Step(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete = models.CASCADE)
    numOfStep = models.PositiveIntegerField()
    description = models.CharField(max_length = 1000)

    def __str__(self):
        return str(self.numOfStep) + " " + self.description


