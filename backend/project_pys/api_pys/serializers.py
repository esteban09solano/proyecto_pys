from rest_framework import serializers
from .models import Car, City, Viaje


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viaje
        fields = '__all__'

    def validate(self, data):
        carro = data.get("carro")
        ciudad_origen = data.get("ciudad_origen")
        ciudad_destino = data.get("ciudad_destino")
        tiempo_horas = data.get("tiempo_horas")

        # # Validar carro
        # if not Car.objects.filter(id=carro.id).exists():
        #     raise serializers.ValidationError("El carro no existe.")

        # # Validar origen
        # if not City.objects.filter(id=ciudad_origen.id, activo=True).exists():
        #     raise serializers.ValidationError(
        #         "La ciudad de origen no existe o está inactiva.")

        # # Validar destino
        # if not City.objects.filter(id=ciudad_destino.id, activo=True).exists():
        #     raise serializers.ValidationError(
        #         "La ciudad de destino no existe o está inactiva.")

        # Validar que origen y destino no sean iguales
        if ciudad_origen.id == ciudad_destino.id:
            raise serializers.ValidationError(
                "La ciudad de origen y destino deben ser diferentes.")

        # Validar tiempo
        if tiempo_horas <= 0:
            raise serializers.ValidationError(
                "El tiempo en horas debe ser mayor que 0.")

        return data
