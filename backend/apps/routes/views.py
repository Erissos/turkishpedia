from rest_framework import viewsets

from .models import ItineraryDay, ItineraryItem, RouteStop, TravelRoute
from .permissions import IsRouteEditor
from .serializers import (
    ItineraryDaySerializer,
    ItineraryItemSerializer,
    RouteStopSerializer,
    TravelRouteSerializer,
)


class TravelRouteViewSet(viewsets.ModelViewSet):
    queryset = TravelRoute.objects.select_related("city", "created_by").all().order_by("-created_at")
    serializer_class = TravelRouteSerializer
    permission_classes = [IsRouteEditor]
    search_fields = ["title", "slug", "description"]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class RouteStopViewSet(viewsets.ModelViewSet):
    queryset = RouteStop.objects.select_related("route", "place").all()
    serializer_class = RouteStopSerializer
    permission_classes = [IsRouteEditor]
    filterset_fields = ["route"]


class ItineraryDayViewSet(viewsets.ModelViewSet):
    queryset = ItineraryDay.objects.select_related("route").all()
    serializer_class = ItineraryDaySerializer
    permission_classes = [IsRouteEditor]
    filterset_fields = ["route"]


class ItineraryItemViewSet(viewsets.ModelViewSet):
    queryset = ItineraryItem.objects.select_related("day", "place").all()
    serializer_class = ItineraryItemSerializer
    permission_classes = [IsRouteEditor]
    filterset_fields = ["day"]
