# api/serializers.py

from rest_framework import serializers
from calendar_app.models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
