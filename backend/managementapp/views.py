from django.shortcuts import render,redirect
from .forms import AssetForm,AssignmentForm,InventoryItemForm,RepairTicketForm
from .models import Asset,Assignment,InventoryItem,RepairTicket,Chat
from .serializers import AssetSerializer,AssignmentSerializer,InventoryItemSerializer,RepairTicketSerializer,UserSerializer,ProfileSerializer,ChatSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User
from .permissions import IsAdmin,IsEmployee,IsAdminOrEmployee
from rest_framework.views import APIView
from django.db.models import Count
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.decorators import api_view,permission_classes
import ollama

def add_asset(request):
    if request.method == 'POST':
        form=AssetForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')

    else:
        form=AssetForm()
    return render(request,'asset.html',{"form":form})

def home(request):
    return render(request,'home.html')

def add_assignment(request):
    if request.method == 'POST':
        form = AssignmentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')

    else:
        form=AssignmentForm()
    return render(request,"assignmentform.html",{"form":form})

def add_inventoryitem(request):
    if request.method == 'POST':
        form = InventoryItemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')

    else:
        form = InventoryItemForm()
    return render(request,'inventoryitemform.html',{"form":form})

def add_repairticket(request):
    if request.method == 'POST':
        form = RepairTicketForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')

    else:
        form = RepairTicketForm()
    return render(request,'repairticketform.html',{"form":form})


class AssetViewset(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

    filterset_fields = ['status','type']
    search_fields = ['name','type','serial_number']

    def get_permissions(self):
        if self.request.method in ['GET','HEAD','OPTIONS' ]:
            permission_classes = [IsAdminOrEmployee]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]


class AssignmentViewset(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def get_permissions(self):
        if self.request.method in ['GET','HEAD','OPTIONS' ]:
            permission_classes = [IsAdminOrEmployee]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]

class InventoryItemViewset(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer

    def get_permissions(self):
        if self.request.method in ['GET','HEAD','OPTIONS' ]:
            permission_classes = [IsAdminOrEmployee]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]

class RepairTicketViewset(viewsets.ModelViewSet):
    queryset = RepairTicket.objects.all()
    serializer_class = RepairTicketSerializer

    def get_permissions(self):
        if self.request.method in ['GET','HEAD','OPTIONS' ]:
            permission_classes = [IsAdminOrEmployee]
        else:
            permission_classes = [IsAdminOrEmployee]
        return [permission() for permission in permission_classes]

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

class DashboardAnalyticsView(APIView):
    permission_classes = [IsAdminOrEmployee]
    def get(self,request):
        total_assets = Asset.objects.count()
        available_assets = Asset.objects.filter(status="Available").count()
        assigned_asset = Asset.objects.filter(status = "Assigned").count()
        open_tickets = RepairTicket.objects.filter(status__in =["Pending","In Progress"]).count()
        total_inventory_items = InventoryItem.objects.count()
        total_assignment_items = Assignment.objects.count()
        asset_status_data = Asset.objects.values("status").annotate(count=Count('id')).order_by("status")
        asset_type_data = Asset.objects.values("type").annotate(count=Count('id')).order_by("type")
        ticket_status_data = RepairTicket.objects.values("status").annotate(count=Count("id")).order_by("status")

        return Response({
            "counts":{
                "total_assets" : total_assets,
                "available_assets" : available_assets,
                "assigned_assets" : assigned_asset,
                "open_tickets" : open_tickets,
                "total_inventory_items" : total_inventory_items,
                "total_assignment_items" : total_assignment_items,
            },
            "asset_status_chart" :list(asset_status_data),
            "asset_type_chart" : list(asset_type_data),
            "ticket_status_chart" : list(ticket_status_data),
        })

class LogoutView(APIView):
    def post(self,request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({"error":"Refresh token is required"},
                            status = status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({
                "message":"Logout Successfull"
            },
            status = status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response({"error":"Invalid or expired refresh token"},
                            status = status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def chat_bot(request):
    if request.method == 'GET':
        chats = Chat.objects.filter(user=request.user).order_by('created_at')
        serializer = ChatSerializer(chats,many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        prompt = request.data.get('prompt')
        if not prompt:
            return Response(
                {"error:prompt is required" },
                status = status.HTTP_400_BAD_REQUEST
            )
        previous_chats = list(Chat.objects.filter(user=request.user).order_by('-created_at')[:20])[::-1]
        messages = []
        for chat in previous_chats:
            messages.append({
                "role":"user",
                "content" : chat.prompt
            })
            messages.append({
                "role" : "AI",
                "content" : chat.response
            })

        messages.append({
            "role" : "user",
            "content" : prompt
        })

        response = ollama.chat(
            model = "llama3",
            messages = messages
        )
        response_text = response["message"]["content"]
        chat = Chat.objects.create(
            user = request.user,
            prompt = prompt,
            response = response_text
        )
        serializer = ChatSerializer(chat)
        return Response(
            serializer.data,
            status = status.HTTP_201_CREATED
        )