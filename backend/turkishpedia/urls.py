from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("api/accounts/", include("apps.accounts.urls")),
    path("api/articles/", include("apps.articles.urls")),
    path("api/tourism/", include("apps.tourism.urls")),
    path("api/routes/", include("apps.routes.urls")),
    path("api/comments/", include("apps.comments.urls")),
    path("api/core/", include("apps.core.urls")),
]
