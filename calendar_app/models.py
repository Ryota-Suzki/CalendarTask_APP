from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    importance = models.CharField(
        max_length=10,
        choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')],
        default='Low'  # デフォルト値として'Low'を指定
    )

    def __str__(self):
        return self.title
