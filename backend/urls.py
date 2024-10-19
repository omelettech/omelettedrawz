
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from .views import (
    UserViewSet, CategoryViewSet, ProductTypeViewSet, AttributeViewSet, ProductViewSet, ProductAttributeViewSet,
    OrderViewSet, OrderItemViewSet, CartViewSet, CartItemViewSet, PaymentViewSet, ReviewViewSet, WishlistViewSet,
    WishlistItemViewSet, ShippingViewSet, fetch_products, fetch_product_details
)
import backend
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'product_types', ProductTypeViewSet)
router.register(r'attributes', AttributeViewSet)
router.register(r'products', ProductViewSet)
router.register(r'product-attributes', ProductAttributeViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order_items', OrderItemViewSet)
router.register(r'carts', CartViewSet)
router.register(r'cart_items', CartItemViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'wishlists', WishlistViewSet)
router.register(r'wishlist_items', WishlistItemViewSet)
router.register(r'shippings', ShippingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('printful/products/', fetch_products, name='get_printful_products'),
    path('printful/products/<int:product_id>/', fetch_product_details, name='get_printful_products'),

]
