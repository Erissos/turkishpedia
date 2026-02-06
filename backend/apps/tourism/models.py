from django.db import models


class City(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    description = models.TextField(blank=True)
    hero_image = models.ImageField(upload_to="city-images/", blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class Place(models.Model):
    class Kind(models.TextChoices):
        NATURE = "nature", "Nature"
        HISTORY = "history", "History"
        FOOD = "food", "Food"
        CULTURE = "culture", "Culture"
        BUDGET = "budget", "Budget"

    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="places")
    name = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True)
    description = models.TextField()
    kind = models.CharField(max_length=20, choices=Kind.choices, default=Kind.CULTURE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class PlaceImage(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="place-images/")
    caption = models.CharField(max_length=200, blank=True)
