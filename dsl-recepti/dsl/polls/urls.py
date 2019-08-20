from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add', views.newRecipe, name='addNew'),
    path('get', views.getAllRecipe, name='getRecipe'),
    path('search', views.search, name='searchRecipe')
]
