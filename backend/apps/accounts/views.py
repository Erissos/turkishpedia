from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from .permissions import IsAdminOrSelf
from .serializers import ProfileUpdateSerializer, PublicUserSerializer, UserSerializer
from .services import update_profile

User = get_user_model()


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class PublicProfileViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = PublicUserSerializer
    permission_classes = [AllowAny]
    lookup_field = "username"
    lookup_url_kwarg = "username"


class ProfileViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated, IsAdminOrSelf]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        update_profile(self.request.user, serializer.validated_data)
