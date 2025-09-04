from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    reply_to = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.SET_NULL, related_name="replies"
    )

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.author.username}: {self.content[:20]}"

    @property
    def author_name(self):
        return self.author.get_full_name() or self.author.username
