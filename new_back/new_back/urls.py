"""Project2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path
from Gamehub import views
from Gamehub import UserAct as useract
from new_back.settings import *
from django.conf.urls.static import static
from Gamehub import DevGame as devGame
from Gamehub import views as views
from Gamehub import UserGameAct as usergameact


urlpatterns = [
    path('admin/',admin.site.urls),
    path('login/', useract.login),
    path('register/', useract.register),
    path('check/',useract.check),
    path('modify_user/', useract.modify),
    path('logout/', useract.logout),
    path('addFriend/', useract.addFriend),
    path('delFriend/', useract.delFriend),
    path('addGame/', devGame.addGame),
    path('delGame/', devGame.delGame),
    path('list_players/', views.list_players),
    path('list_allGames/', views.list_allGames),
    path('list_nameGames/', views.list_nameGames),
    path('list_typeGames/', views.list_typeGames),
    path('list_Dreamlist/', views.list_DreamList),
    path('list_Depository/', views.list_Depository),
    path('list_Friends1/', views.list_Friends1),
    path('list_Developers/',views.list_developers),
    # path('list_Friends2/', views.list_Friends2), -- no need
    path('list_nameUser/', views.list_nameUser),
    path('get_curUser/', views.get_curUser),
    path('list_play/', views.listPlay),
    path('addDreamList/', usergameact.addDreamList),
    path('delDreamList/', usergameact.delDreamList),
    path('buyGame/', usergameact.buyGame),
    path('grade/', usergameact.grade),
    path('progress/', usergameact.progress),

]+ static(MEDIA_URL, document_root=MEDIA_ROOT) #如果单纯的是上传，文件并不用来显示或者读取，就不用加这个
