"""
URL configuration for pubmed project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from . import views
from .views import ReactAppView

urlpatterns = [
    # Catch-all pattern for React routes, excluding '/api/'
    re_path(r'^(?!api/).*$', ReactAppView.as_view(), name='ReactApp'),
    path('api/journals/', views.journals_list, name='journals_list'),
    path('api/journal/', views.journal_detail, name='journal_detail'),
    path('api/author/', views.author_detail, name='author_detail'),
    path('api/article-authors/', views.article_authors, name='article_authors'),
]
