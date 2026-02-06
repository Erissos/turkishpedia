from .models import Contribution


def track_contribution(user, action: str, content_type, object_id: int) -> None:
    Contribution.objects.create(
        user=user,
        action=action,
        content_type=content_type,
        object_id=object_id,
    )
