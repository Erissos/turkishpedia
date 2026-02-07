from django.views.generic import ListView, DetailView
from rest_framework import viewsets

from .models import City, Place
from .permissions import IsTourismEditor
from .serializers import CitySerializer, PlaceSerializer


class CityListView(ListView):
    model = City
    template_name = "tourism/list.html"
    context_object_name = "cities"
    ordering = ["name"]

class CityDetailView(DetailView):
    model = City
    template_name = "tourism/detail.html"
    context_object_name = "city"

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all().order_by("name")
    serializer_class = CitySerializer
    permission_classes = [IsTourismEditor]
    search_fields = ["name", "slug", "description"]


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.select_related("city").all().order_by("name")
    serializer_class = PlaceSerializer
    permission_classes = [IsTourismEditor]
    filterset_fields = ["city", "kind"]
    search_fields = ["name", "slug", "description", "address"]
