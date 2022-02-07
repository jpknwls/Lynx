from core.user.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    # do we want to deserialize here?

    class Meta:
            model = User
            fields = ['id', 'username', 'email', 'is_active', 'created', 'updated', 'links']
            read_only_field = ['is_active', 'created', 'updated']

            
