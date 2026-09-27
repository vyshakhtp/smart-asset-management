from rest_framework.permissions import BasePermission

def isAdmin(user):
    return user.groups.filter(name ='Admin').exists()

def isEmployee(user):
    return user.groups.filter(name="Employee").exists()

class IsAdmin(BasePermission):
    def has_permission(self,request,view):
        if not request.user.is_authenticated:
            return False
        return(isAdmin(request.user))

class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return(isEmployee(request.user))

class IsAdminOrEmployee(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return (isAdmin(request.user) or isEmployee(request.user))