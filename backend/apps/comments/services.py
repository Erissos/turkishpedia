from .models import Comment


def get_recent_comments(content_type, object_id: int):
    return Comment.objects.filter(content_type=content_type, object_id=object_id).order_by("-created_at")
