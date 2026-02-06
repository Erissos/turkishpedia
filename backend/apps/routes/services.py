from .models import TravelRoute


def get_route_with_details(route_id: int):
    return TravelRoute.objects.select_related("city", "created_by").prefetch_related("stops", "days").get(id=route_id)
