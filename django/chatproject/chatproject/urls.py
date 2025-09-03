from django.contrib import admin
from django.urls import path
from chatapp import views   # ✅ correct app

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.chat_home, name="chat_home"),  # root → chat frontend
    path("api/messages/", views.get_messages, name="get_messages"),
    path("api/send/", views.send_message, name="send_message"),
]
