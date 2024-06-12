
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import ProductList,ProductDetail
import backend

urlpatterns = [
    path('products/', ProductList.as_view(),name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),

]
