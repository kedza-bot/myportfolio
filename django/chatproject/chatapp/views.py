from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Message
from .serializers import MessageSerializer

# --------------------------
# FRONTEND CHAT PAGE VIEW
# --------------------------
def chat_home(request):
    return render(request, "chatapp/index.html")   # looks inside templates/chat/index.html

# --------------------------
# API VIEWS
# --------------------------
@api_view(['GET'])
def get_messages(request):
    messages = Message.objects.all().order_by('-timestamp')[:50]
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    content = request.data.get('content')
    if content:
        msg = Message.objects.create(author=request.user, content=content)
        serializer = MessageSerializer(msg)
        return Response(serializer.data, status=201)
    return Response({"error": "Content required"}, status=400)
