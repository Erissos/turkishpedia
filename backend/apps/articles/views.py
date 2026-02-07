from django.views.generic import ListView, DetailView, TemplateView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.core.permissions import IsEditorOrReadOnly

from .models import Article, ArticleRevision, Category, Tag
from .serializers import (
    ArticleRevisionSerializer,
    ArticleSerializer,
    ArticleWriteSerializer,
    CategorySerializer,
    TagSerializer,
)
from .services import create_revision


class ArticleListView(ListView):
    model = Article
    template_name = "articles/list.html"
    context_object_name = "articles"
    paginate_by = 12

    def get_queryset(self):
        queryset = Article.objects.filter(status=Article.Status.PUBLISHED).order_by("-created_at")
        category_slug = self.request.GET.get("category")
        if category_slug:
            queryset = queryset.filter(categories__slug=category_slug)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = Category.objects.all()
        return context

class ArticleDetailView(DetailView):
    model = Article
    template_name = "articles/detail.html"
    context_object_name = "article"
    queryset = Article.objects.filter(status=Article.Status.PUBLISHED)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [IsEditorOrReadOnly]
    search_fields = ["name", "slug"]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by("name")
    serializer_class = TagSerializer
    permission_classes = [IsEditorOrReadOnly]
    search_fields = ["name", "slug"]


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related("author", "approved_by").prefetch_related("categories", "tags")
    permission_classes = [IsEditorOrReadOnly]
    filterset_fields = ["status", "categories", "tags"]
    search_fields = ["title", "content"]
    ordering_fields = ["created_at", "updated_at", "title"]

    def get_serializer_class(self):
        if self.request.method in {"POST", "PUT", "PATCH"}:
            return ArticleWriteSerializer
        return ArticleSerializer

    def perform_create(self, serializer):
        article = serializer.save(author=self.request.user)
        create_revision(article, self.request.user, summary="Initial version")

    def perform_update(self, serializer):
        article = serializer.save()
        create_revision(article, self.request.user, summary="Updated content")


class ArticleRevisionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ArticleRevision.objects.select_related("article", "editor").order_by("-created_at")
    serializer_class = ArticleRevisionSerializer
    permission_classes = [IsAuthenticated]
