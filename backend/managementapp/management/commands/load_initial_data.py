import os

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.management import call_command
from django.core.management.base import BaseCommand

from managementapp.models import Asset


class Command(BaseCommand):
    help = "Load initial application data if the database is empty"

    def handle(self, *args, **options):

        # If application data already exists, do not load the fixture again.
        if Asset.objects.exists():
            self.stdout.write(
                self.style.WARNING(
                    "Initial data already exists. Skipping fixture import."
                )
            )
            return

        # Remove groups created by the automatic admin setup.
        Group.objects.filter(name__in=["Admin", "Employee"]).delete()

        # Remove the automatically created initial admin user, if it exists.
        admin_username = os.getenv("ADMIN_USERNAME")

        if admin_username:
            User = get_user_model()
            User.objects.filter(username=admin_username).delete()

        self.stdout.write("Loading initial data...")

        call_command("loaddata", "data.json")

        self.stdout.write(
            self.style.SUCCESS(
                "Initial data loaded successfully."
            )
        )