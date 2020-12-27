from .models import *

def check_login():
    name = None
    userType = None
    for item in Info.objects.all():
        name = item.name
        userType = item.type
    if not name:
        return False,name,userType
    return True,name,userType

def check_Player(name):
    exist = Player.objects.get(username=name)
    if not exist:
        return False
    return True

def check_Developer(name):
    exist = Developer.objects.get(username=name)
    if not exist:
        return False
    return True