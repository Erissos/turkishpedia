from django.urls import path
from .views import RouteListView, RouteDetailView

app_name = "routes"

urlpatterns = [
    path("", RouteListView.as_view(), name="list"),
    path("<slug:slug>/", RouteDetailView.as_view(), name="detail"),
]
