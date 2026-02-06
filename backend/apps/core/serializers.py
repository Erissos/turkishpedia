from rest_framework import serializers

from .models import Bookmark, Contribution


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ["id", "user", "content_type", "object_id", "created_at"]
        read_only_fields = ["id", "created_at", "user"]


class ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contribution
        fields = ["id", "user", "action", "content_type", "object_id", "created_at"]
        read_only_fields = ["id", "created_at", "user"]
