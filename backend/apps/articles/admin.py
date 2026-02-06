from django.contrib import admin

from .models import Article, ArticleImage, ArticleReference, ArticleRevision, Category, Tag


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "author", "created_at")
    list_filter = ("status", "categories", "tags")
    search_fields = ("title", "slug", "content")


admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(ArticleImage)
admin.site.register(ArticleReference)
admin.site.register(ArticleRevision)
