from django.contrib import admin
from .models import Asset,Assignment,InventoryItem,RepairTicket

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('name','type','serial_number','status','purchase_date')
    list_filter = ('type','status')
    search_fields = ('name','serial_number')
    ordering = ('name',)

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('asset','employee','date_assigned','date_returned')
    list_filter = ('date_assigned','date_returned')
    search_fields = ('asset__name','employee__username')
    ordering = ('-date_assigned',)

@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('item_type','quantity','threshold')
    search_fields = ('item_type',)
    ordering = ('item_type',)

@admin.register(RepairTicket)
class RepairTicketAdmin(admin.ModelAdmin):
    list_display = ('asset','issue','status','assigned_technician')
    list_filter = ('status',)
    search_fields = ('asset__name','issue','assigned_technician__username')
    ordering = ('status',)