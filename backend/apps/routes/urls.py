from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ItineraryDayViewSet, ItineraryItemViewSet, RouteStopViewSet, TravelRouteViewSet

router = DefaultRouter()
router.register("routes", TravelRouteViewSet, basename="route")
router.register("stops", RouteStopViewSet, basename="stop")
router.register("days", ItineraryDayViewSet, basename="day")
router.register("items", ItineraryItemViewSet, basename="item")

urlpatterns = [
    path("", include(router.urls)),
]
