from django.contrib import admin

from .models import Bookmark, Contribution


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ("user", "content_type", "object_id", "created_at")
    list_filter = ("content_type",)


@admin.register(Contribution)
class ContributionAdmin(admin.ModelAdmin):
    list_display = ("user", "action", "content_type", "object_id", "created_at")
    list_filter = ("action",)
