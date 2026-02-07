from django.contrib.auth import get_user_model
from django.views.generic import FormView, DetailView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from rest_framework import mixins, viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from .permissions import IsAdminOrSelf
from .serializers import ProfileUpdateSerializer, PublicUserSerializer, RegisterSerializer, UserSerializer
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


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# --- Template Views ---
class UserProfileView(DetailView):
    template_name = "accounts/profile.html"
    context_object_name = "profile_user"
    slug_field = "username"
    slug_url_kwarg = "username"
    queryset = User.objects.filter(is_active=True)

class UserProfileEditView(LoginRequiredMixin, UpdateView):
    model = User
    fields = [
        "display_name", "first_name", "last_name", "avatar", "bio", 
        "birth_date", "gender", "current_location", "birth_place", 
        "occupation", "job_title", "education_level", "religion"
    ]
    template_name = "accounts/edit_profile.html"
    
    def get_success_url(self):
        return reverse_lazy("accounts_ui:profile", kwargs={"username": self.request.user.username})

    def get_object(self):
        return self.request.user
