# api/views.py

from rest_framework import generics
from calendar_app.models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework import status

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
