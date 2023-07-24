# calendar_app/models.py

from django.db import models

class Task(models.Model):
    COMPLETION_STATUS_CHOICES = (
        ('Incomplete', '未完了'),
        ('Completed', '完了'),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    importance = models.CharField(
        max_length=10,
        choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')],
        default='Low'
    )
    completed = models.CharField(
        max_length=10,
        choices=COMPLETION_STATUS_CHOICES,
        default='Incomplete',
    )

    def __str__(self):
        return self.title
