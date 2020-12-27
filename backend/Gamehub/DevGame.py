from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import render, redirect
from django.contrib import auth
from .models import *
from .check import *
import json

def addGame(request):
   is_login,userName,userType = check_login()
   if not is_login:
       res = {
           'success': 'false',
           'mess': 'Login first'
       }
       return HttpResponse(json.dumps(res), content_type='application/json')
   if userType!='developer':
       res = {
           'success': 'false',
           'mess': 'Only support for Developers'
       }
       return HttpResponse(json.dumps(res), content_type='application/json')
   else:
       dev = Developer.objects.get(username=userName)
       data = json.loads(request.body)
       name = data.get('game')
       exist = Game.objects.filter(name=name)
       print('#########################')
       print(exist)
       if exist:
           res = {
               'success': 'false',
               'mess': 'Game already Exist'
           }
           return HttpResponse(json.dumps(res), content_type='application/json')
       price = data.get('price')
       g_type = data.get('g_type')
       file = data.get('avatar')
       print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
       print(name,price,g_type,dev,file)
       Game.objects.create(name=name,price=price,type=g_type, developer=dev, avatar=file)
       res = {
           'success': 'true',
       }
       return HttpResponse(json.dumps(res), content_type='application/json')


def delGame(request):
    is_login, userName, userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if userType != 'developer':
        res = {
            'success': 'false',
            'mess': 'Only support for Developers'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    else:
        data = json.loads(request.body)
        name = data.get('game')
        dev = Developer.objects.get(username=userName)
        exist = Game.objects.filter(name=name, developer=dev)
        if not exist:
            res = {
                'success': 'false',
                'mess': 'No such game'
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
        else:
            item = exist[0]
            item.delete()
            res = {
                'success': True
            }
            return HttpResponse(json.dumps(res), content_type='application/json')