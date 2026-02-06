from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Bookmark, Contribution
from .serializers import BookmarkSerializer, ContributionSerializer


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
