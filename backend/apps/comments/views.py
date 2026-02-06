from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Comment, Rating
from .permissions import IsOwnerOrReadOnly
from .serializers import CommentSerializer, RatingSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related("user", "content_type").all().order_by("-created_at")
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filterset_fields = ["content_type", "object_id"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.select_related("user", "content_type").all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filterset_fields = ["content_type", "object_id"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
