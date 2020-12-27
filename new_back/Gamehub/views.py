from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect
from django.contrib import auth
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from .models import *
from .check import *
import json
# Create your views here.

user_list = []

def list_players(request):
    all_players = serializers.serialize('python', Player.objects.all())
    res = {
        'success':'true',
        'data': all_players
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def list_developers(request):
    all_players = serializers.serialize('python', Developer.objects.all())
    res = {
        'success': 'true',
        'data': all_players
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def list_allGames(request):
    all_games = serializers.serialize('python',Game.objects.all())
    res = {
        'success': 'true',
        'data': all_games
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def get_curUser(request):
    is_login,username,userType = check_login()
    print(username)
    if not is_login:
        res = {
            'sucess': 'false',
            'mess': 'Login First'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if userType == 'player':
        user = Player.objects.filter(username =username)
    else:
        user = Developer.objects.filter(username=username)
    data = serializers.serialize('python',user)
    res = {
        'success': 'true',
        'data': data
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


def list_nameUser(request):
    data = json.loads(request.body)
    name = data.get('target')
    exist = Player.objects.filter(username=name)
    if not exist:
        res = {
            'sucess': 'false',
            'mess': 'Player non-exist'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    else:
        friend = serializers.serialize('python',exist)
        res = {
            'sucess': 'true',
            'data': friend
        }
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


def list_nameGames(request):
    data = json.loads(request.body)
    name = data.get('game')
    print("name: ", name)
    exist = Game.objects.filter(name=name)
    if exist is None:
        res = {
            'sucess':'false',
            'mess':'Game non-exist'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    else:
        game = serializers.serialize('python', Game.objects.filter(name=name))
        res = {
            'success': 'true',
            'data': game
        }
        print("game: ", game)
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def list_typeGames(request):
    data = json.loads(request.body)
    type = data.get('type')
    type_games = serializers.serialize('python',Game.objects.filter(type=type))
    res = {
        'success': 'true',
        'data': type_games
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def list_DreamList(request):
    is_login, userName, userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if userType != 'player':
        res = {
            'success': 'false',
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user =Player.objects.get(username=userName)
    user_dream = serializers.serialize('python', DreamList.objects.filter(user=user))
    print("!!!!!!!!!!!!!!!", user_dream)
    res = {
        'success': 'true',
        'data': user_dream
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def list_Depository(request):
    is_login, userName, userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if userType != 'player':
        res = {
            'success': 'false',
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username=userName)
    user_depos = serializers.serialize('python',Depository.objects.filter(user=user))
    print(user_depos)
    res = {
        'success': 'true',
        'data': user_depos
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def list_Friends1(request):
    is_login, userName, userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if userType != 'player':
        res = {
            'success': 'false',
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username=userName)
    user_friends = serializers.serialize('python',Friend.objects.filter(player1=user))
    print("?????", user_friends)
    res = {
        'success': 'true',
        'data': user_friends
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

# def list_Friends2(request):
#     user = request.user
#     is_player = Player.objects.get(username=user.username)
#     if not is_player:
#         res = {
#             'success': 'false',
#             'mess': 'Developer do not support!'
#         }
#         return HttpResponse(json.dumps(res), content_type='application/json')
#     user_friends = serializers.serialize('python', Friend.objects.filter(player2=user))
#     res = {
#         'success': 'true',
#         'data': user_friends
#     }
#     return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def list_games(request):
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
        dev = Developer.objects.get(username=userName)
        dev_games = serializers.serialize('python',Game.objects.filter(developer=dev))
        res = {
            'success': 'true',
            'data': dev_games
        }
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def listPlay(request):
    is_login, userName, userType = check_login()
    if not is_login:
        res = {
            'success': 'false',
            'mess': 'Login first'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    if userType != 'player':
        res = {
            'success': 'false',
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username=userName)
    user_plays = serializers.serialize('python', Play.objects.filter(player=user))
    res = {
        'success': 'true',
        'data': user_plays
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


def index(request):
    return HttpResponse('HelloWorld')