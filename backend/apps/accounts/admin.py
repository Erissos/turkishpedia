from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "display_name",
        "first_name",
        "last_name",
        "role",
        "is_active",
    )
    list_filter = ("role", "is_active", "gender", "education_level")
    search_fields = ("username", "email", "display_name", "first_name", "last_name")
