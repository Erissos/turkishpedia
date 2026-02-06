from django.conf import settings
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.name


class Article(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        REVIEW = "review", "In Review"
        PUBLISHED = "published", "Published"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    content = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="articles")
    categories = models.ManyToManyField(Category, related_name="articles", blank=True)
    tags = models.ManyToManyField(Tag, related_name="articles", blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    approved_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="approved_articles",
    )
    approved_at = models.DateTimeField(null=True, blank=True)
    editor_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class ArticleImage(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="article-images/")
    caption = models.CharField(max_length=200, blank=True)


class ArticleReference(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="references")
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=500, blank=True)
    source = models.CharField(max_length=200, blank=True)


class ArticleRevision(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="revisions")
    editor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    content_snapshot = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    summary = models.CharField(max_length=200, blank=True)
