from rest_framework import serializers

from .models import Article, ArticleImage, ArticleReference, ArticleRevision, Category, Tag


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]


class ArticleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleImage
        fields = ["id", "image", "caption"]


class ArticleReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleReference
        fields = ["id", "title", "url", "source"]


class ArticleSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    images = ArticleImageSerializer(many=True, read_only=True)
    references = ArticleReferenceSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "author",
            "categories",
            "tags",
            "images",
            "references",
            "status",
            "approved_by",
            "approved_at",
            "editor_notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["author", "approved_by", "approved_at"]


class ArticleWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            "title",
            "slug",
            "content",
            "categories",
            "tags",
            "status",
            "editor_notes",
        ]


class ArticleRevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleRevision
        fields = ["id", "article", "editor", "content_snapshot", "summary", "created_at"]
        read_only_fields = ["editor", "created_at"]
