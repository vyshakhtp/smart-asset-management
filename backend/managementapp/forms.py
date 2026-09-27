from django import forms
from .models import Asset,Assignment,InventoryItem,RepairTicket

class AssetForm(forms.ModelForm):
    class Meta:
        model = Asset
        fields = ['name','type','serial_number','status','purchase_date']

class AssignmentForm(forms.ModelForm):
    class Meta:
        model = Assignment
        fields = ['asset','employee','date_assigned','date_returned']
         
class InventoryItemForm(forms.ModelForm):
    class Meta:
        model = InventoryItem
        fields = ['item_type','threshold','quantity']

class RepairTicketForm(forms.ModelForm):
    class Meta:
        model = RepairTicket
        fields = ['asset','issue','status','assigned_technician']            