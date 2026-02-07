from django.urls import path
from .views import CityListView, CityDetailView

app_name = "tourism"

urlpatterns = [
    path("", CityListView.as_view(), name="list"),
    path("<slug:slug>/", CityDetailView.as_view(), name="detail"),
]
