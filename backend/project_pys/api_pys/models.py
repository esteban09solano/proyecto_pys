from django.db import models


class Car(models.Model):
    placa = models.CharField(max_length=10, unique=True)
    color = models.CharField(max_length=50)
    fecha_ingreso = models.DateField()

    def __str__(self):
        return f"{self.placa} {self.color} {self.fecha_ingreso}"


class City(models.Model):
    nombre = models.CharField(max_length=100)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class Viaje(models.Model):
    carro = models.ForeignKey(Car, on_delete=models.CASCADE)
    ciudad_origen = models.ForeignKey(
        City, on_delete=models.CASCADE, related_name='origen')
    ciudad_destino = models.ForeignKey(
        City, on_delete=models.CASCADE, related_name='destino')
    tiempo_horas = models.FloatField()
    fecha = models.DateField()

    def __str__(self):
        return f"{self.carro.placa} - {self.fecha}"
