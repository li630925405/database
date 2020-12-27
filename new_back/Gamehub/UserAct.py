from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import render, redirect
from django.contrib import auth
from .models import *
from .check import *
import json

def register(request):
    data = json.loads(request.body)
    name = data.get('username')
    passwd1 = data.get('password')
    email = data.get('email')
    type = data.get('type', 'player')
    player_name_exist = Player.objects.filter(username=name)
    dev_name_exist = Developer.objects.filter(username=name)
    if player_name_exist or dev_name_exist:
        res = {
            'success':"false",
            'mess': 'Name exist'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if type == 'player':
        exist = Player.objects.filter(email=email)
        if exist:
            res = {
                'success': "false",
                'mess': 'Email exist'
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
        else:
            Player.objects.create_user(username=name, email=email, password=passwd1,name=name)
            res = {
                'success': "true",
            }
            return HttpResponse(json.dumps(res), content_type='application/json')

    if type == 'developer':
        exist = Developer.objects.filter(email=email)
        if exist:
            res = {
                'success': "false",
                'mess': 'Email exist'
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
        else:
            Developer.objects.create_user(username=name, email=email, password=passwd1,name=name)
            res = {
                'success': "true",
                # "Access-Control-Allow-Origin": " http://127.0.0.1:8000/",
                # "Access-Control-Allow-Credentials": "true",
                # "Access-Control-Allow-Methods": "GET,POST",
                # "Access-Control-Allow-Headers": "Origin,Content-Type,Cookie,Accept,Token",
            }
            return HttpResponse(json.dumps(res), content_type='application/json')


def login(request):
    is_login,userName,userType  = check_login()
    if is_login:
        res = {
            'success': "false",
            'mess': 'Duplicate Login!'
        }
        print('Unsucess!!!!')
        # user = Player.objects.get(username=userName)
        # print(user)
        return HttpResponse(json.dumps(res), content_type='application/json')
    data = json.loads(request.body)
    name = data.get('username')
    passwd = data.get('password')
    type = data.get('type', 'player')
    user = auth.authenticate(username=name, password=passwd)
    if user is None:
        res = {
            'success': 'false',
            'mess': 'Wrong Type'

        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if type == 'player':
        exist = Player.objects.filter(username=name)
        if not exist:
            res = {
                'success': 'false',
                'mess': 'Wrong Type'
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
    if type == 'developer':
        exist = Developer.objects.filter(username=name)
        if not exist:
            res = {
                'success': 'false',
                'mess': 'Wrong Type'
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
    auth.login(request, user)
    Info.objects.create(name=name,type=type)
    res = {
        'success': 'true',
        # "Access-Control-Allow-Origin":" http://127.0.0.1:8000/",
        # "Access-Control-Allow-Credentials":"true",
        # "Access-Control-Allow-Methods":"GET,POST",
        # "Access-Control-Allow-Headers":"Origin,Content-Type,Cookie,Accept,Token",
    }
    return_res = HttpResponse(json.dumps(res), content_type='application/json')
    return_res["Access-Control-Allow-Origin"] = "http://127.0.0.1:8000"
    return_res["Access-Control-Allow-Credentials"] = "true"
    return_res["Access-Control-Allow-Methods"] = "GET,POST"
    return_res["Access-Control-Allow-Headers"] = "Origin,Content-Type,Cookie,Accept,Token"
    #request.session['user_email'] = email
    return return_res

def login1(request):
    print('!!!!!!!!!!!!!!!!!!in login..........................')
    print(request.session.session_key)
    # print(request.user)
    # print(request.user.username)

def check(request):
    print('###############################################')
    print(request.user)

def modify(request):
    data = json.loads(request.body)
    is_login,name,userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if userType == 'player':
        result = Player.objects.filter(username=name)
    else:
        result = Developer.objects.filter(username=name)
    if result:
        oldPassword = data.get('oldPassword')
        user = auth.authenticate(username=name, password=oldPassword)
        if user is not None and user.is_active:
            account = result[0]
            print('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            print(account)
            password = data.get('newPassword')
            print(password)
            account.set_password(password)
            account.save()
            res = {
                'success': 'true'
            }
            # request.session['user_email'] = email
            return HttpResponse(json.dumps(res), content_type='application/json')
    res = {
        'success': 'false',
        'mess': 'Email not found or invalid old password'
    }
    return HttpResponse(json.dumps(res), content_type='application/json')



def logout(request):
    is_login, name, userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    auth.logout(request)
    Info.objects.all().delete()
    res = {
        'success': 'true'
    }
    return HttpResponse(json.dumps(res), content_type='application/json')

def addFriend(request):
    is_login, name, userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    # user= request.user
    # is_player = Player.objects.filter(username=user.username)
    if userType != 'player':
        res = {
            'success': 'false',
            'mess': 'Only support between Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    # user_name = user.username
    # user = Player.objects.get(username=user_name)
    user = Player.objects.get(username=name)
    data = json.loads(request.body)
    tgt_id = data.get('target')
    tgt_list = Player.objects.filter(username=tgt_id)
    if tgt_list:
        tgt = tgt_list[0]
        exist = Friend.objects.filter(player1=user, player2=tgt)
        if exist:
            res = {
                'success': 'false',
                'mess': 'Duplicate Follow'
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
        else:
            item = Friend.objects.create(player1=user, player2=tgt)
            res = {
                'success': 'true',
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
    else:
        res = {
            'success': 'false',
            'mess': 'Invalid target id'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')


def delFriend(request):
    is_login, name, userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if userType != 'player':
        res = {
            'success': 'false',
            'mess': 'Only support between Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username = name)
    data = json.loads(request.body)
    tgt_id = data.get('target')
    tgt_list = Player.objects.filter(username=tgt_id)
    if tgt_list:
        tgt = tgt_list[0]
        exist = Friend.objects.filter(player1=user, player2=tgt)
        if exist:
            item = Friend.objects.get(player1=user, player2=tgt)
            item.delete()
            return HttpResponse('Remove Successfully!')
    else:
        res = {
            'success': 'false',
            'mess': 'Invalid target id'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')

