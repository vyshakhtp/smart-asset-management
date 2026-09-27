from django.db import models
from django.contrib.auth.models import User

class Asset(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    serial_number=models.CharField(max_length=100,unique=True)
    status = models.CharField(
        max_length=50,
        choices = [
            ('Available','Available'),
            ('Assigned','Assigned'),
            ('Under Repair','Under Repair'),
            ('Retired','Retired'),
        ],
        default = 'Available'
        )
    purchase_date = models.DateField()

    def __str__(self):
        return self.name

class InventoryItem(models.Model):
    item_type = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    threshold = models.PositiveIntegerField()

    def __str__(self):
        return self.item_type

class Assignment(models.Model):
    asset = models.ForeignKey(Asset,on_delete=models.PROTECT)
    employee = models.ForeignKey(User,on_delete=models.PROTECT)
    date_assigned = models.DateField()
    date_returned = models.DateField(null=True,blank=True)

    def __str__(self):
        return f"{self.asset} - {self.employee}"

class RepairTicket(models.Model):
    asset = models.ForeignKey(Asset,on_delete=models.PROTECT)
    issue = models.CharField(max_length=50)
    status =  models.CharField(
        max_length=50,
        choices=[
            ("Pending","Pending"),
            ("In Progress","In Progress"),
            ("Resolved","Resolved"),
            ("Closed","Closed"),
        ],
        default="Pending",
       )
    assigned_technician = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True,related_name='repair_tickets')

    def __str__(self):
        return f"{self.asset} - {self.status}"

class Chat(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    prompt = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.prompt[:50]