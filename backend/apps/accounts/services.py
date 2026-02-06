from django.contrib.auth import get_user_model

User = get_user_model()


def update_profile(user: User, data: dict) -> User:
    fields = [
        "display_name",
        "bio",
        "avatar",
        "first_name",
        "last_name",
        "birth_date",
        "gender",
        "current_location",
        "birth_place",
        "religion",
        "education_level",
        "occupation",
        "job_title",
        "phone_number",
        "public_full_name",
        "public_email",
        "public_phone_number",
        "public_birth_date",
        "public_gender",
        "public_current_location",
        "public_birth_place",
        "public_religion",
        "public_education_level",
        "public_occupation",
        "public_job_title",
        "public_membership_date",
    ]
    for field in fields:
        if field in data:
            setattr(user, field, data[field])
    user.save(update_fields=fields)
    return user
