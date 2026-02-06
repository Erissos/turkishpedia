from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsRouteEditor(BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        user = request.user
        return user.is_authenticated and user.role in {"editor", "moderator", "admin"}
