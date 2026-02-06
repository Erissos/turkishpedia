from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        USER = "user", "User"
        EDITOR = "editor", "Editor"
        MODERATOR = "moderator", "Moderator"
        ADMIN = "admin", "Admin"

    class Gender(models.TextChoices):
        MALE = "male", "Male"
        FEMALE = "female", "Female"
        OTHER = "other", "Other"
        UNSPECIFIED = "unspecified", "Unspecified"

    class EducationLevel(models.TextChoices):
        PRIMARY = "primary", "Primary"
        SECONDARY = "secondary", "Secondary"
        HIGH_SCHOOL = "high_school", "High School"
        ASSOCIATE = "associate", "Associate"
        BACHELOR = "bachelor", "Bachelor"
        MASTER = "master", "Master"
        DOCTORATE = "doctorate", "Doctorate"
        OTHER = "other", "Other"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.USER)
    display_name = models.CharField(max_length=150, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=20, choices=Gender.choices, default=Gender.UNSPECIFIED)
    current_location = models.CharField(max_length=150, blank=True)
    birth_place = models.CharField(max_length=150, blank=True)
    religion = models.CharField(max_length=100, blank=True)
    education_level = models.CharField(
        max_length=20,
        choices=EducationLevel.choices,
        default=EducationLevel.OTHER,
    )
    occupation = models.CharField(max_length=120, blank=True)
    job_title = models.CharField(max_length=120, blank=True)
    phone_number = models.CharField(max_length=30, blank=True)
    public_full_name = models.BooleanField(default=False)
    public_email = models.BooleanField(default=False)
    public_phone_number = models.BooleanField(default=False)
    public_birth_date = models.BooleanField(default=False)
    public_gender = models.BooleanField(default=False)
    public_current_location = models.BooleanField(default=False)
    public_birth_place = models.BooleanField(default=False)
    public_religion = models.BooleanField(default=False)
    public_education_level = models.BooleanField(default=False)
    public_occupation = models.BooleanField(default=False)
    public_job_title = models.BooleanField(default=False)
    public_membership_date = models.BooleanField(default=False)
    following = models.ManyToManyField(
        "self",
        symmetrical=False,
        related_name="followers",
        blank=True,
    )

    def __str__(self) -> str:
        return self.display_name or self.username
