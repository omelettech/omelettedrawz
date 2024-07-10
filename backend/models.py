import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('Customer', 'Customer'),
        ('Admin', 'Admin'),
    ]

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.TextField()
    phone_number = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$')]
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.username


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class ProductType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Attribute(models.Model):
    DATA_TYPE_CHOICES = [
        ('String', 'String'),
        ('Integer', 'Integer'),
        ('Float', 'Float'),
        ('Boolean', 'Boolean'),
        ('Date', 'Date'),
    ]

    name = models.CharField(max_length=100)
    data_type = models.CharField(max_length=10, choices=DATA_TYPE_CHOICES)

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.product.name} - {self.attribute.name}'


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Canceled', 'Canceled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f'Order {self.id} by {self.user.username}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.product.name} ({self.quantity})'


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Cart of {self.user.username}'


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    def __str__(self):
        return f'{self.product.name} ({self.quantity})'


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('Credit Card', 'Credit Card'),
        ('PayPal', 'PayPal'),
    ]

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed'),
    ]

    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f'Payment for Order {self.order.id}'


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    review_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.user.username} for {self.product.name}'


class Wishlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Wishlist of {self.user.username}'


class WishlistItem(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.product.name}'


class Shipping(models.Model):
    SHIPPING_METHOD_CHOICES = [
        ('Standard', 'Standard'),
        ('Express', 'Express'),
    ]

    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    shipping_address = models.TextField()
    shipping_date = models.DateTimeField(null=True, blank=True)
    delivery_date = models.DateTimeField(null=True, blank=True)
    shipping_method = models.CharField(max_length=10, choices=SHIPPING_METHOD_CHOICES)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Shipping for Order {self.order.id}'
