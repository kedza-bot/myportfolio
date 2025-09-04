from django.contrib import admin
from django.urls import path, include
from chatapp import views

urlpatterns = [
    path("admin/", admin.site.urls),

    # Main pages
    path("", views.chat_home, name="chat_home"),
    path("about/", views.about, name="about"),
    path("achievements/", views.achievements, name="achievements"),
    path("projects/", views.projects, name="projects"),
    path("contact/", views.contact, name="contact"),
    path("blog/", views.blog, name="blog"),
    path("chatroom/", views.chatroom, name="chatroom"),

    # API endpoints
    path("api/messages/", views.get_messages, name="get_messages"),
    path("api/send/", views.send_message, name="send_message"),
    path("api/current_user/", views.current_user, name="current_user"),

    # Allauth (Google/Github login)
    path("accounts/", include("allauth.urls")),
]
