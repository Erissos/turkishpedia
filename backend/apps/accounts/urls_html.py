from django.urls import path
from .views import UserProfileView, UserProfileEditView

app_name = "accounts"

urlpatterns = [
    path("u/<str:username>/", UserProfileView.as_view(), name="profile"),
    path("settings/edit/", UserProfileEditView.as_view(), name="edit_profile"),
]
