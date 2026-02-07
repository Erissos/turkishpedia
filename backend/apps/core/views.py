from django.views.generic import TemplateView
from apps.articles.models import Article, Category
from apps.routes.models import TravelRoute
from rest_framework import mixins, viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Bookmark, Contribution
from .serializers import BookmarkSerializer, ContributionSerializer

class HealthCheckView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({"status": "ok"})

class HomeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = Category.objects.all()[:6]
        context["featured_article"] = Article.objects.filter(status=Article.Status.PUBLISHED).first()
        context["featured_route"] = TravelRoute.objects.first()
        return context

class SearchView(TemplateView):
    template_name = "articles/list.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        query = self.request.GET.get("q", "")
        if query:
            context["object_list"] = Article.objects.filter(title__icontains=query, status=Article.Status.PUBLISHED)
        else:
            context["object_list"] = []
        return context

class BookmarkViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ContributionViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = ContributionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Contribution.objects.filter(user=self.request.user).order_by("-created_at")
