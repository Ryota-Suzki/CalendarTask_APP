# api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', views.TaskDeleteUpdateView.as_view(), name='task-delete-update'),
]
