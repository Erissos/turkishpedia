from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CityViewSet, PlaceViewSet

router = DefaultRouter()
router.register("cities", CityViewSet, basename="city")
router.register("places", PlaceViewSet, basename="place")

urlpatterns = [
    path("", include(router.urls)),
]
