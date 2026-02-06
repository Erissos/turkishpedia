from rest_framework import serializers

from .models import City, Place, PlaceImage


class PlaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceImage
        fields = ["id", "image", "caption"]


class PlaceSerializer(serializers.ModelSerializer):
    images = PlaceImageSerializer(many=True, read_only=True)

    class Meta:
        model = Place
        fields = [
            "id",
            "city",
            "name",
            "slug",
            "description",
            "kind",
            "latitude",
            "longitude",
            "address",
            "images",
            "created_at",
        ]


class CitySerializer(serializers.ModelSerializer):
    places = PlaceSerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = ["id", "name", "slug", "description", "hero_image", "places"]
