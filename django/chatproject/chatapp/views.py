from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Message
from .serializers import MessageSerializer

# --------------------------
# FRONTEND PAGES
# --------------------------
def chat_home(request):
    return render(request, "chatapp/index.html")

def about(request):
    return render(request, "chatapp/about.html")

def achievements(request):
    return render(request, "chatapp/achievements.html")

def projects(request):
    return render(request, "chatapp/projects.html")

def contact(request):
    return render(request, "chatapp/contact.html")

def blog(request):
    return render(request, "chatapp/blog.html")

@login_required(login_url='/accounts/login/')
def chatroom(request):
    """Only allow authenticated users into chatroom."""
    return render(request, "chatapp/chatroom.html")


# --------------------------
# CHAT API
# --------------------------
@api_view(['GET'])
def get_messages(request):
    messages = Message.objects.all().order_by('-timestamp')[:50]
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    """Send a chat message in chatroom (requires login)."""
    content = request.data.get('content')
    reply_to_id = request.data.get('reply_to')
    reply_to_msg = None

    if reply_to_id:
        try:
            reply_to_msg = Message.objects.get(id=reply_to_id)
        except Message.DoesNotExist:
            reply_to_msg = None

    if content:
        msg = Message.objects.create(
            author=request.user,
            content=content,
            reply_to=reply_to_msg
        )
        serializer = MessageSerializer(msg)
        return Response(serializer.data, status=201)

    return Response({"error": "Content required"}, status=400)

def current_user(request):
    """Return current logged-in user info for frontend JS."""
    if request.user.is_authenticated:
        return JsonResponse({
            "username": request.user.username,
            "email": request.user.email,
            "id": request.user.id,
        })
    return JsonResponse({"username": None})


# --------------------------
# CONTACT FORM EMAIL HANDLER
# --------------------------
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.core.mail import EmailMessage
from django.conf import settings


@require_POST
def contact_submit(request):
    """
    Handle public contact form submissions.
    Expects POST data: name, email, message
    """
    name = request.POST.get("name", "").strip()
    email = request.POST.get("email", "").strip()
    message = request.POST.get("message", "").strip()

    if not (name and email and message):
        return JsonResponse(
            {"success": False, "error": "All fields are required."}, status=400
        )

    subject = f"📩 New contact message from {name}"
    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

    recipient = getattr(settings, "CONTACT_RECIPIENT", settings.DEFAULT_FROM_EMAIL)

    try:
        mail = EmailMessage(
            subject,
            body,
            settings.DEFAULT_FROM_EMAIL,  # must be a verified Brevo sender
            [recipient],
            reply_to=[email],  # ✅ safe here
        )
        mail.send(fail_silently=False)

        return JsonResponse(
            {"success": True, "message": "Message sent successfully!"}
        )
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)
    
    
    
from django.http import HttpResponse

def robots_txt(request):
    content = """User-agent: *
Disallow:

Sitemap: https://myportfolio-i2g6.onrender.com/sitemap.xml
"""
    return HttpResponse(content, content_type="text/plain")
