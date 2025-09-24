# chatapp/sitemaps.py

from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class StaticViewSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return [
            "chat_home",
            "about",
            "achievements",
            "projects",
            "contact",
            "blog",
            "chatroom",
        ]

    def location(self, item):
        return reverse(item)
