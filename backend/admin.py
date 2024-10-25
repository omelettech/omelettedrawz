from django.contrib import admin
from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Category)
admin.site.register(ProductType)
admin.site.register(Attribute)
admin.site.register(ProductAttribute)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Payment)
admin.site.register(Review)
admin.site.register(Wishlist)
admin.site.register(WishlistItem)
admin.site.register(ShippingAddress)
admin.site.register(Shipping)
admin.site.register(Image)