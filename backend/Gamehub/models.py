from django.db import models
from django.contrib.auth.models import User

class Player(User):
    name = models.CharField(max_length=100,unique=True)


class Developer(User):
    name = models.CharField(max_length=100,unique=True)


class Game(models.Model):
    gameType = (
        ('ACT', '动作'),
        ('RPG', '角色扮演'),
        ('PS', '射击'),
        ('RTS', '战略'),
        ('SLG', '策略'),
        ('MOBA', '多人竞技')
    )

    name = models.CharField(max_length=100,unique=True)
    grade = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10, choices=gameType, default='动作')
    developer = models.ForeignKey('Developer', on_delete=models.CASCADE, to_field="name")
    pubtime = models.DateTimeField(auto_now_add=True)
    avatar = models.FileField(upload_to='avatar')
    n_comments = models.IntegerField(default=0)              #评价人数

    class Meta:
        ordering = ['-pubtime']


class Play(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE,to_field="name")
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    progress = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    rate = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)

    class Meta:
        unique_together = (('game', 'player'))


class DreamList(models.Model):
    user = models.ForeignKey(Player,on_delete=models.CASCADE,null=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE,to_field="name")


class Depository(models.Model):
    user = models.ForeignKey(Player, on_delete=models.CASCADE, null=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE,to_field="name")


class Friend(models.Model):
    player1 = models.ForeignKey(Player, related_name='player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(Player, related_name='player2', on_delete=models.CASCADE,to_field="name")
    time = models.DateTimeField(auto_now_add=True)


class Info(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20)
    is_login = models.IntegerField(default=1)

