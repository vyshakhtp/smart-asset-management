from django.urls import path,include
from . import views 
from rest_framework.routers import DefaultRouter
#  from rest_framework_simplejwt.views import

router = DefaultRouter()

router.register(r'assets',views.AssetViewset)
router.register(r'assignment',views.AssignmentViewset)
router.register(r'tickets',views.RepairTicketViewset)
router.register(r'inventory',views.InventoryItemViewset)

urlpatterns = [
    path("",views.home,name="home"),
    path("asset/",views.add_asset,name="add_asset"),
    path("assignment/",views.add_assignment,name="add_assignment"),
    path("inventory/",views.add_inventoryitem,name="add_inventoryitem"),
    path("repairticket/",views.add_repairticket,name="add_repairticket"),
    path("api/profile/", views.ProfileView.as_view(), name="profile"),
    path("api/chat_bot/",views.chat_bot,name = "chat_bot"),

    path(
        "api/dashboard/",
        views.DashboardAnalyticsView.as_view(),
        name="dashboard"
    ),

    path("api/",include(router.urls)),
]