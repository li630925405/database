from rest_framework import serializers
from Gamehub.models import *

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('username', 'email', 'password')

class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = ()
