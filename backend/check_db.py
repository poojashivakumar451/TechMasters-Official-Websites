import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'techmasters_backend.settings')
django.setup()

from courses.models import Course

print("ACCEPTED COUNT:", Course.objects.filter(status='accepted').count())
for c in Course.objects.all():
    print(c.title, "->", c.status)

