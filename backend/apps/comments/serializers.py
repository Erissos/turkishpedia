from rest_framework import serializers

from .models import Comment, Rating


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "user", "content_type", "object_id", "body", "created_at"]
        read_only_fields = ["id", "created_at", "user"]


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "user", "content_type", "object_id", "score", "created_at"]
        read_only_fields = ["id", "created_at", "user"]
