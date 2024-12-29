from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    # You can add custom fields if needed
    pass


class Course(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.CharField(max_length=50)  # Example: "6 weeks"
    instructor = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.code} - {self.name}"


class Instructor(models.Model):
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True, null=True)  # Optional biography

    def __str__(self):
        return self.name

