from django.db import models


class Product(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    lead = models.TextField(blank=True)
    overview = models.TextField(blank=True)
    hero_image_url = models.URLField(blank=True)
    logo_url = models.URLField(blank=True)
    cta_title = models.CharField(max_length=200, blank=True)
    cta_body = models.TextField(blank=True)
    cta_button_label = models.CharField(max_length=100, blank=True)
    cta_button_url = models.URLField(blank=True)
    partners_body = models.TextField(blank=True)

    def __str__(self):
        return self.title


class ProductFeature(models.Model):
    product = models.ForeignKey(Product, related_name='features', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField(blank=True)
    icon_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class ProductSpec(models.Model):
    product = models.ForeignKey(Product, related_name='specs', on_delete=models.CASCADE)
    group = models.CharField(max_length=200, blank=True)
    label = models.CharField(max_length=200)
    value = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.label}: {self.value}"


class ProductSection(models.Model):
    product = models.ForeignKey(Product, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class ProductGalleryImage(models.Model):
    product = models.ForeignKey(Product, related_name='gallery', on_delete=models.CASCADE)
    image_url = models.URLField()
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.caption or self.image_url


class ProductDownload(models.Model):
    product = models.ForeignKey(Product, related_name='downloads', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    file_url = models.URLField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class RelatedProduct(models.Model):
    product = models.ForeignKey(Product, related_name='related', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    link_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
