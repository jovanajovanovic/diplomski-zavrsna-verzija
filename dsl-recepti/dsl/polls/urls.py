from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add', views.newRecipe, name='addNew'),
    path('get', views.getAllRecipe, name='getRecipe'),
    path('search', views.search, name='searchRecipe'),
    path('getId', views.getRecipeById, name='searchRecipeById'),
    path('getIngredients', views.getIngredientsByRecipe, name='getIngredients'),
    path('getSteps', views.getStepsByRecipe, name='getSteps')
]
