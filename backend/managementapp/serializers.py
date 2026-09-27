from rest_framework import serializers
from .models import Asset,Assignment,InventoryItem,RepairTicket,Chat
from django.contrib.auth.models import User

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'

class RepairTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairTicket
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id','username','email','role']
        read_only_fields = ['id','role']

    def get_fullName(self,obj):
        return f"{obj.first_name} {obj.last_name}".strip()

    def get_role(self,obj):
        if obj.groups.filter(name='Admin').exists():
            return "Admin"
        if obj.groups.filter(name="Employee").exists():
            return "Employee"
        return "Unknown"

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'
        read_only_fields = ['user']