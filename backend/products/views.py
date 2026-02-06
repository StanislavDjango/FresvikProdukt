from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductDetailSerializer, ProductListSerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'


class HealthCheckView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return Response({'status': 'ok'})
