from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookmarkViewSet, ContributionViewSet

router = DefaultRouter()
router.register("bookmarks", BookmarkViewSet, basename="bookmark")
router.register("contributions", ContributionViewSet, basename="contribution")

urlpatterns = [
    path("", include(router.urls)),
]
