from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r"carros", CarViewSet, basename="car")
router.register(r"viajes", ViajeViewSet, basename="viaje")
router.register(r"ciudades", CityViewSet, basename="city")

urlpatterns = [
    path("login", login, name="login"),
]

urlpatterns += router.urls
