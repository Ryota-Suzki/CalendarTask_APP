# calendar_app/models.py

from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    # 他に必要なフィールドがあれば追加

    def __str__(self):
        return self.title
