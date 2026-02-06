from django.contrib import admin

from .models import ItineraryDay, ItineraryItem, RouteStop, TravelRoute


admin.site.register(TravelRoute)
admin.site.register(RouteStop)
admin.site.register(ItineraryDay)
admin.site.register(ItineraryItem)
