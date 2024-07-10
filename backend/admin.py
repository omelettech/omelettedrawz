from django.contrib import admin
from .models import Product
from django.contrib import admin
from .models import User, Category, ProductType, Attribute, Product, Order, OrderItem, Cart, CartItem, Payment, Review, Wishlist, WishlistItem, Shipping

admin.site.register(User)
admin.site.register(Category)
admin.site.register(ProductType)
admin.site.register(Attribute)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Payment)
admin.site.register(Review)
admin.site.register(Wishlist)
admin.site.register(WishlistItem)
admin.site.register(Shipping)