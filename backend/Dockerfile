# Use official Python image
FROM python:3.14-slim
# Set work directory
WORKDIR /app
# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy project files
COPY . .
# Expose Django’s default port
EXPOSE 8000
# Run the app
EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn smartAssetAndInventoryManagementSystem.wsgi:application --bind 0.0.0.0:${PORT:-8000}"]