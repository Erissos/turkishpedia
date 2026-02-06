from .models import City, Place


def get_city_places(city: City):
    return Place.objects.filter(city=city).order_by("name")
