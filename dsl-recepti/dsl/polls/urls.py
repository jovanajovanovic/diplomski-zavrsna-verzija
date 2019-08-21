from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add', views.newRecipe, name='addNew'),
    path('get', views.getAllRecipe, name='getRecipe'),
    path('search', views.search, name='searchRecipe'),
    path('getId/<int:id>', views.getRecipeById, name='searchRecipeById'),
    path('getIngredients/<int:id>', views.getIngredientsByRecipe, name='getIngredients'),
    path('getSteps/<int:id>', views.getStepsByRecipe, name='getSteps')
]
