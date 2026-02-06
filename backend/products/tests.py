from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Product


class ProductApiTests(APITestCase):
    def setUp(self):
        Product.objects.create(
            slug='test-product',
            title='Test Product',
            subtitle='Subtitle',
        )

    def test_product_list(self):
        url = reverse('product-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) >= 1)

    def test_product_detail(self):
        url = reverse('product-detail', kwargs={'slug': 'test-product'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['slug'], 'test-product')
