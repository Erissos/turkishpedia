from rest_framework import serializers

from apps.tourism.serializers import PlaceSerializer

from .models import ItineraryDay, ItineraryItem, RouteStop, TravelRoute


class RouteStopSerializer(serializers.ModelSerializer):
    place_detail = PlaceSerializer(source="place", read_only=True)

    class Meta:
        model = RouteStop
        fields = ["id", "route", "place", "place_detail", "order"]


class ItineraryItemSerializer(serializers.ModelSerializer):
    place_detail = PlaceSerializer(source="place", read_only=True)

    class Meta:
        model = ItineraryItem
        fields = ["id", "day", "place", "place_detail", "time_slot", "notes"]


class ItineraryDaySerializer(serializers.ModelSerializer):
    items = ItineraryItemSerializer(many=True, read_only=True)

    class Meta:
        model = ItineraryDay
        fields = ["id", "route", "day_number", "title", "items"]


class TravelRouteSerializer(serializers.ModelSerializer):
    stops = RouteStopSerializer(many=True, read_only=True)
    days = ItineraryDaySerializer(many=True, read_only=True)

    class Meta:
        model = TravelRoute
        fields = [
            "id",
            "title",
            "slug",
            "city",
            "description",
            "created_by",
            "created_at",
            "stops",
            "days",
        ]
        read_only_fields = ["created_by", "created_at"]
