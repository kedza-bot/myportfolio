from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    reply_to = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'author_name', 'content', 'timestamp', 'reply_to']

    def get_reply_to(self, obj):
        if obj.reply_to:
            return {
                "id": obj.reply_to.id,
                "author_name": obj.reply_to.author.username,
                "content": obj.reply_to.content
            }
        return None

