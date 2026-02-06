from rest_framework.permissions import BasePermission


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj) -> bool:
        if request.method in {"GET", "HEAD", "OPTIONS"}:
            return True
        return request.user.is_authenticated and obj.user == request.user
