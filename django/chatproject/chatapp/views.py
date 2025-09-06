from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Message
from .serializers import MessageSerializer


# --------------------------
# FRONTEND CHAT PAGE VIEW
# --------------------------
def chat_home(request):
    return render(request, "chatapp/index.html")

def about(request):
    return render(request, 'chatapp/about.html')

def achievements(request):
    return render(request, 'chatapp/achievements.html')

def projects(request):
    return render(request, 'chatapp/projects.html')

def contact(request):
    return render(request, 'chatapp/contact.html')

def blog(request):
    return render(request, 'chatapp/blog.html')


@login_required(login_url='/accounts/login/')
def chatroom(request):
    """Only allow authenticated users into chatroom."""
    return render(request, "chatapp/chatroom.html")


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
    reply_to_id = request.data.get('reply_to')  # get the reply_to ID from the request
    reply_to_msg = None

    if reply_to_id:
        try:
            reply_to_msg = Message.objects.get(id=reply_to_id)
        except Message.DoesNotExist:
            reply_to_msg = None  # ignore if not found

    if content:
        msg = Message.objects.create(
            author=request.user,
            content=content,
            reply_to=reply_to_msg
        )
        serializer = MessageSerializer(msg)
        return Response(serializer.data, status=201)

    return Response({"error": "Content required"}, status=400)




# --------------------------
# AUTH HELPERS
# --------------------------
def current_user(request):
    """Return current logged-in user info for frontend JS."""
    if request.user.is_authenticated:
        return JsonResponse({
            "username": request.user.username,
            "email": request.user.email,
            "id": request.user.id,
        })
    return JsonResponse({"username": None})
