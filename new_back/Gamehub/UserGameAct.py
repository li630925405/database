from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import render, redirect
from django.contrib import auth
from .models import *
from .check import *
import json

def addDreamList(request):
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
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username=name)
    data = json.loads(request.body)
    game_name = data.get('name')
    game_list = Game.objects.filter(name=game_name)
    if game_list:
        game_item = game_list[0]
        exist = DreamList.objects.filter(user=user, game=game_item)
        if not exist:
            DreamList.objects.create(user=user, game=game_item)
            res = {
                'success': 'true',
            }
            return HttpResponse(json.dumps(res),content_type='application/json')
        else:
            res = {
                'success':'false',
                'mess': 'Duplicate Add Games'
            }
            return HttpResponse(json.dumps(res),content_type='application/json')
    else:
        res = {
            'success': 'false',
            'mess': 'Game non-exist'
        }
        return HttpResponse(json.dumps(res),content_type='application/json')
    #

def delDreamList(request):
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
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username=name)
    data = json.loads(request.body)
    game_name = data.get('name')
    game_list = Game.objects.filter(name=game_name)
    if game_list:
        game_item = game_list[0]
        exist = DreamList.objects.filter(user=user, game=game_item)
        if not exist:
            res = {
                'success': 'false',
                'mess':'Do not have game in dreamList',
            }
            return HttpResponse(json.dumps(res),content_type='application/json')
        else:
            item = exist[0]
            item.delete()
            res = {
                'success':'true',
            }
            return HttpResponse(json.dumps(res),content_type='application/json')
    else:
        res = {
            'success': 'false',
            'mess': 'Game non-exist'
        }
        return HttpResponse(json.dumps(res),content_type='application/json')

def buyGame(request):
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
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username=name)
    data = json.loads(request.body)
    game_name = data.get('name')
    game_list = Game.objects.filter(name=game_name)
    if game_list is not None:
        game_item = game_list[0]
        exist = Depository.objects.filter(user=user, game=game_item)
        if not exist:
            Depository.objects.create(user=user, game=game_item)
            Play.objects.create(player=user, game=game_item,progress=0)
            res = {
                'success': 'true',
            }
            return HttpResponse(json.dumps(res),content_type='application/json')
        else:
            res = {
                'success':'false',
                'mess':'Duplicate Add Games',
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
    else:
        res = {
            'success': 'false',
            'mess': 'Game not exist!',
        }
        return HttpResponse(json.dumps(res), content_type='application/json')


def grade(request):
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
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username=name)
    data = json.loads(request.body)
    game_name = data.get('gamename')
    game_list = Game.objects.filter(name=game_name)
    if not game_list:
        res = {
            'success': 'false',
            'mess': 'Game not exist!',
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    game = game_list[0]
    cur_game_commentors = game.n_comments
    cur_game_score = game.grade
    buy = Depository.objects.filter(user=user, game=game)
    if not buy:
        res = {
            'success': 'false',
            'mess': 'Not Buy Yet',
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    item = Play.objects.get(game=game, player=user)
    grade = eval(data.get('grade'))
    print('1111111111111111111111')
    print(grade)
    print(type(grade))
    game.grade = (cur_game_commentors*cur_game_score+grade)/(cur_game_commentors + 1)
    game.n_comments = cur_game_commentors+1
    item.rate = grade
    game.save()
    item.save()
    res = {
        'success':'true',
    }
    return HttpResponse(json.dumps(res), content_type='application/json')


def progress(request):
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
            'mess': 'Only support for Players'
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    user = Player.objects.get(username=name)
    data = json.loads(request.body)
    game_name = data.get('gamename')
    game_list = Game.objects.filter(name=game_name)
    if not game_list:
        res = {
            'success': 'false',
            'mess': 'Game Nonexist!',
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    game_item = game_list[0]
    item_list = Play.objects.filter(game=game_item, player=user)
    if not item_list:
        res = {
            'success': 'false',
            'mess': 'Purchase First!',
        }
        return HttpResponse(json.dumps(res), content_type='application/json')
    progress = data.get('progress')
    item = item_list[0]
    item.progress += progress
    item.save()
    res = {
        'success': 'true',
    }
    return  HttpResponse(json.dumps(res), content_type='application/json')





