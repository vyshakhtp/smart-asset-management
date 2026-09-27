from django.core.management import call_command
from django.core.management.base import BaseCommand

from managementapp.models import Asset


class Command(BaseCommand):
    help = "Load initial application data if the database is empty"

    def handle(self, *args, **options):
        if Asset.objects.exists():
            self.stdout.write(
                self.style.WARNING(
                    "Initial data already exists. Skipping fixture import."
                )
            )
            return

        self.stdout.write("Loading initial data...")

        call_command("loaddata", "data.json")

        self.stdout.write(
            self.style.SUCCESS(
                "Initial data loaded successfully."
            )
        )