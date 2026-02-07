from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from apps.core.views import HomeView, SearchView

urlpatterns = [
    # UI Paths
    path("", HomeView.as_view(), name="home"),
    path("search/", SearchView.as_view(), name="search"),
    path("articles/", include("apps.articles.urls_html", namespace="articles_ui")),
    path("tourism/", include("apps.tourism.urls_html", namespace="tourism_ui")),
    path("routes/", include("apps.routes.urls_html", namespace="routes_ui")),
    path("accounts/", include("apps.accounts.urls_html", namespace="accounts_ui")),

    # Admin & API
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

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
