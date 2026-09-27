import os

from django.contrib.auth.models import User, Group
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create the initial admin user"

    def handle(self, *args, **options):
        username = os.getenv("ADMIN_USERNAME")
        email = os.getenv("ADMIN_EMAIL", "")
        password = os.getenv("ADMIN_PASSWORD")

        if not username or not password:
            self.stdout.write(
                self.style.ERROR(
                    "ADMIN_USERNAME and ADMIN_PASSWORD are required."
                )
            )
            return

        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "is_staff": True,
                "is_superuser": True,
                "is_active": True,
            },
        )

        if created:
            user.set_password(password)
            user.save()

        admin_group, _ = Group.objects.get_or_create(name="Admin")
        user.groups.add(admin_group)

        self.stdout.write(
            self.style.SUCCESS(
                f"Initial admin user '{username}' is ready."
            )
        )