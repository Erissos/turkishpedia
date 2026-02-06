from django.contrib import admin

from .models import City, Place, PlaceImage


admin.site.register(City)
admin.site.register(Place)
admin.site.register(PlaceImage)
