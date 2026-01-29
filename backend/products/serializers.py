from rest_framework import serializers
from .models import (
    Product,
    ProductFeature,
    ProductSpec,
    ProductSection,
    ProductGalleryImage,
    ProductDownload,
    RelatedProduct,
)


class ProductFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFeature
        fields = ['title', 'body', 'icon_url', 'order']


class ProductSpecSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpec
        fields = ['group', 'label', 'value', 'order']


class ProductSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSection
        fields = ['title', 'body', 'image_url', 'order']


class ProductGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGalleryImage
        fields = ['image_url', 'caption', 'order']


class ProductDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDownload
        fields = ['title', 'file_url', 'order']


class RelatedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelatedProduct
        fields = ['title', 'subtitle', 'link_url', 'order']


class ProductDetailSerializer(serializers.ModelSerializer):
    features = ProductFeatureSerializer(many=True, read_only=True)
    specs = ProductSpecSerializer(many=True, read_only=True)
    sections = ProductSectionSerializer(many=True, read_only=True)
    gallery = ProductGallerySerializer(many=True, read_only=True)
    downloads = ProductDownloadSerializer(many=True, read_only=True)
    related = RelatedProductSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'slug',
            'title',
            'subtitle',
            'lead',
            'overview',
            'hero_image_url',
            'logo_url',
            'cta_title',
            'cta_body',
            'cta_button_label',
            'cta_button_url',
            'partners_body',
            'features',
            'specs',
            'sections',
            'gallery',
            'downloads',
            'related',
        ]


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['slug', 'title', 'subtitle', 'hero_image_url']
