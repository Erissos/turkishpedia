from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from .models import Comment, Rating


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        from django.contrib.auth import get_user_model
        model = get_user_model()
        fields = ["id", "username", "display_name", "avatar"]

class CommentSerializer(serializers.ModelSerializer):
    model = serializers.CharField(write_only=True, required=False)
    user_details = UserDetailSerializer(source="user", read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "user", "user_details", "content_type", "object_id", "body", "created_at", "model"]
        read_only_fields = ["id", "created_at", "user", "content_type"]

    def create(self, validated_data):
        model_name = validated_data.pop("model", None)
        if model_name:
            try:
                content_type = ContentType.objects.get(model=model_name)
                validated_data["content_type"] = content_type
            except ContentType.DoesNotExist:
                raise serializers.ValidationError({"model": "Invalid model name"})
        
        return super().create(validated_data)



class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "user", "content_type", "object_id", "score", "created_at"]
        read_only_fields = ["id", "created_at", "user"]
