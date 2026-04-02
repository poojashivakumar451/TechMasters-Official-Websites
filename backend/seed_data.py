import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'techmasters_backend.settings')
django.setup()

from courses.models import Course

system_courses = [
  { 'title': 'Python Full Stack', 'duration': '4 Months', 'price': 15000 },
  { 'title': 'Flask Framework', 'duration': '4 Months', 'price': 10000 },
  { 'title': 'Java Full Stack Development', 'duration': '6 Months', 'price': 12500 },
  { 'title': 'Django', 'duration': '4 Months', 'price': 10000 },
  { 'title': 'Python Programming', 'duration': '4 Months', 'price': 8500 },
  { 'title': 'Python Full Stack Development', 'duration': '6 Months', 'price': 12500 },
  { 'title': 'Artificial Intelligence', 'duration': '6 Months', 'price': 15000 },
  { 'title': 'Data Science', 'duration': '6 Months', 'price': 15000 },
  { 'title': 'Java DSA', 'duration': '6 Months', 'price': 12000 },
  { 'title': 'Python DSA', 'duration': '4 Months', 'price': 10500 },
  { 'title': 'Cloud', 'duration': '4 Months', 'price': 14000 },
  { 'title': 'Machine Learning', 'duration': '6 Months', 'price': 14500 },
  { 'title': 'C Programming', 'duration': '3 Months', 'price': 6500 },
  { 'title': 'Spring Framework', 'duration': '4 Months', 'price': 11000 },
  { 'title': 'MySQL', 'duration': '2 Months', 'price': 5000 },
  { 'title': 'Oracle', 'duration': '3 Months', 'price': 8500 },
  { 'title': 'PostgreSQL', 'duration': '3 Months', 'price': 8500 },
  { 'title': 'Java', 'duration': '4 Months', 'price': 8500 },
  { 'title': 'Advance Programming - Databases', 'duration': '4 Months', 'price': 11500 },
  { 'title': 'MERN Full Stack Development', 'duration': '6 Months', 'price': 12500 },
  { 'title': 'Development Course', 'duration': '4 Months', 'price': 8500 },
  { 'title': 'Frontend Development', 'duration': '4 Months', 'price': 9500 },
  { 'title': 'Backend Development', 'duration': '4 Months', 'price': 10000 },
  { 'title': 'DSA Programming', 'duration': '4 Months', 'price': 10000 },
  { 'title': 'Spring Boot', 'duration': '4 Months', 'price': 11500 },
  { 'title': 'C DSA', 'duration': '4 Months', 'price': 9000 },
]

for sc in system_courses:
    Course.objects.get_or_create(
        title=sc['title'],
        defaults={
            'duration': sc['duration'],
            'price': sc['price'],
            'description': f"Comprehensive training program for {sc['title']}.",
            'status': 'accepted'
        }
    )

print("System courses seeded successfully.")
