from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import ProfileViewSet, PublicProfileViewSet, UserViewSet

router = DefaultRouter()
router.register("users", UserViewSet, basename="user")
router.register("profile", ProfileViewSet, basename="profile")

urlpatterns = [
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/<str:username>/", PublicProfileViewSet.as_view({"get": "retrieve"}), name="public-profile"),
    path("", include(router.urls)),
]
