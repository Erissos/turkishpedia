from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ArticleRevisionViewSet, ArticleViewSet, CategoryViewSet, TagViewSet

router = DefaultRouter()
router.register("articles", ArticleViewSet, basename="article")
router.register("categories", CategoryViewSet, basename="category")
router.register("tags", TagViewSet, basename="tag")
router.register("revisions", ArticleRevisionViewSet, basename="revision")

urlpatterns = [
    path("", include(router.urls)),
]
