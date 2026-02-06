from django.conf import settings
from django.db import models

from apps.tourism.models import City, Place


class TravelRoute(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="routes")
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


class RouteStop(models.Model):
    route = models.ForeignKey(TravelRoute, on_delete=models.CASCADE, related_name="stops")
    place = models.ForeignKey(Place, on_delete=models.PROTECT)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]


class ItineraryDay(models.Model):
    route = models.ForeignKey(TravelRoute, on_delete=models.CASCADE, related_name="days")
    day_number = models.PositiveIntegerField()
    title = models.CharField(max_length=200, blank=True)

    class Meta:
        unique_together = ("route", "day_number")
        ordering = ["day_number"]


class ItineraryItem(models.Model):
    day = models.ForeignKey(ItineraryDay, on_delete=models.CASCADE, related_name="items")
    place = models.ForeignKey(Place, on_delete=models.PROTECT)
    time_slot = models.CharField(max_length=50, blank=True)
    notes = models.TextField(blank=True)
