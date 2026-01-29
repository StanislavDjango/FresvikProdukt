from django.contrib import admin
from .models import (
    Product,
    ProductFeature,
    ProductSpec,
    ProductSection,
    ProductGalleryImage,
    ProductDownload,
    RelatedProduct,
)


class ProductFeatureInline(admin.TabularInline):
    model = ProductFeature
    extra = 0


class ProductSpecInline(admin.TabularInline):
    model = ProductSpec
    extra = 0


class ProductSectionInline(admin.TabularInline):
    model = ProductSection
    extra = 0


class ProductGalleryInline(admin.TabularInline):
    model = ProductGalleryImage
    extra = 0


class ProductDownloadInline(admin.TabularInline):
    model = ProductDownload
    extra = 0


class RelatedProductInline(admin.TabularInline):
    model = RelatedProduct
    extra = 0


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [
        ProductFeatureInline,
        ProductSpecInline,
        ProductSectionInline,
        ProductGalleryInline,
        ProductDownloadInline,
        RelatedProductInline,
    ]


admin.site.register(ProductFeature)
admin.site.register(ProductSpec)
admin.site.register(ProductSection)
admin.site.register(ProductGalleryImage)
admin.site.register(ProductDownload)
admin.site.register(RelatedProduct)
