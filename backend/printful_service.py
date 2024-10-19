# printful_service.py
import requests
from django.conf import settings

PRINTFUL_API_KEY = settings.PRINTFUL_API_KEY
API_BASE_URL = 'https://api.printful.com'

def get_products():
    headers = {
        'Authorization': f'Bearer {PRINTFUL_API_KEY}'
    }
    response = requests.get(f'{API_BASE_URL}/store/products', headers=headers)
    return response.json()

def get_product_details(product_id):
    headers = {
        'Authorization': f'Bearer {PRINTFUL_API_KEY}'
    }
    response = requests.get(f'{API_BASE_URL}/store/products/{product_id}', headers=headers)
    return response.json()

def get_shipping_rates(order_details):
    headers = {
        'Authorization': f'Bearer {PRINTFUL_API_KEY}'
    }
    response = requests.post(f'{API_BASE_URL}/shipping/rates', headers=headers, json=order_details)
    return response.json()
