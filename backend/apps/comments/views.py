from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Comment, Rating
from .permissions import IsOwnerOrReadOnly
from .serializers import CommentSerializer, RatingSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related("user", "content_type").all().order_by("-created_at")
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        model_name = self.request.query_params.get("model")
        object_id = self.request.query_params.get("object_id")
        
        if model_name:
            queryset = queryset.filter(content_type__model=model_name)
        if object_id:
            queryset = queryset.filter(object_id=object_id)
            
        return queryset

    def perform_create(self, serializer):
        # Allow passing "model" name instead of ID in create if needed, 
        # but usually frontend sends ID. 
        # For simplicity, if frontend wants to create, they need content_type ID.
        # Let's actually make it easier: if "model" is in data, resolve it.
        serializer.save(user=self.request.user)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.select_related("user", "content_type").all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filterset_fields = ["content_type", "object_id"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
