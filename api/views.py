# api/views.py

from rest_framework import generics
from calendar_app.models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework import status


class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        data['completed'] = 'Incomplete'  # タスク作成時にcompletedのデフォルト値を設定
        serializer = TaskSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class TaskDeleteUpdateView(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer