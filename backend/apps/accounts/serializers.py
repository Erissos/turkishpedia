from datetime import date

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.IntegerField(source="followers.count", read_only=True)
    following_count = serializers.IntegerField(source="following.count", read_only=True)
    membership_date = serializers.DateTimeField(source="date_joined", read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "display_name",
            "bio",
            "avatar",
            "role",
            "birth_date",
            "gender",
            "current_location",
            "birth_place",
            "religion",
            "education_level",
            "occupation",
            "job_title",
            "phone_number",
            "membership_date",
            "followers_count",
            "following_count",
        ]
        read_only_fields = ["id", "role", "membership_date", "followers_count", "following_count"]


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
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


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "display_name"]

    def validate_password(self, value: str) -> str:
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class PublicUserSerializer(serializers.ModelSerializer):
    followers_count = serializers.IntegerField(source="followers.count", read_only=True)
    following_count = serializers.IntegerField(source="following.count", read_only=True)
    membership_date = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()
    birth_date = serializers.SerializerMethodField()
    gender = serializers.SerializerMethodField()
    current_location = serializers.SerializerMethodField()
    birth_place = serializers.SerializerMethodField()
    religion = serializers.SerializerMethodField()
    education_level = serializers.SerializerMethodField()
    occupation = serializers.SerializerMethodField()
    job_title = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "display_name",
            "bio",
            "avatar",
            "full_name",
            "email",
            "phone_number",
            "birth_date",
            "age",
            "gender",
            "current_location",
            "birth_place",
            "religion",
            "education_level",
            "occupation",
            "job_title",
            "membership_date",
            "followers_count",
            "following_count",
        ]

    def _is_owner_or_staff(self, obj: User) -> bool:
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return request.user.is_staff or request.user == obj

    def _expose(self, obj: User, flag: str, value):
        if self._is_owner_or_staff(obj) or getattr(obj, flag):
            return value
        return None

    def get_full_name(self, obj: User):
        full_name = " ".join([part for part in [obj.first_name, obj.last_name] if part]).strip()
        return self._expose(obj, "public_full_name", full_name) if full_name else None

    def get_email(self, obj: User):
        return self._expose(obj, "public_email", obj.email)

    def get_phone_number(self, obj: User):
        return self._expose(obj, "public_phone_number", obj.phone_number)

    def get_birth_date(self, obj: User):
        return self._expose(obj, "public_birth_date", obj.birth_date)

    def get_age(self, obj: User):
        if not (obj.birth_date and (self._is_owner_or_staff(obj) or obj.public_birth_date)):
            return None
        today = date.today()
        years = today.year - obj.birth_date.year
        if (today.month, today.day) < (obj.birth_date.month, obj.birth_date.day):
            years -= 1
        return years

    def get_gender(self, obj: User):
        return self._expose(obj, "public_gender", obj.gender)

    def get_current_location(self, obj: User):
        return self._expose(obj, "public_current_location", obj.current_location)

    def get_birth_place(self, obj: User):
        return self._expose(obj, "public_birth_place", obj.birth_place)

    def get_religion(self, obj: User):
        return self._expose(obj, "public_religion", obj.religion)

    def get_education_level(self, obj: User):
        return self._expose(obj, "public_education_level", obj.education_level)

    def get_occupation(self, obj: User):
        return self._expose(obj, "public_occupation", obj.occupation)

    def get_job_title(self, obj: User):
        return self._expose(obj, "public_job_title", obj.job_title)

    def get_membership_date(self, obj: User):
        return self._expose(obj, "public_membership_date", obj.date_joined)
