from django.core.management.base import BaseCommand
from courses.models import Course, Lesson

class Command(BaseCommand):
    help = 'Populates courses with lessons from the YouTube channel'

    def handle(self, *args, **options):
        # 1. Java Full Stack
        java_course = Course.objects.filter(title__icontains='Java').first()
        if java_course:
            Lesson.objects.get_or_create(
                course=java_course, order=1, 
                title='Second Largest Element in Array', 
                video_url='https://www.youtube.com/embed/ZAdwmcZbs4Q',
                content='Learn how to find the second largest element in a Java array efficiently.'
            )
            Lesson.objects.get_or_create(
                course=java_course, order=2, 
                title='Java Arrays Part 1', 
                video_url='https://www.youtube.com/embed/t-yEfuBTT0U',
                content='Introduction to arrays in Java, declaration and initialization.'
            )
            Lesson.objects.get_or_create(
                course=java_course, order=3, 
                title='Java Arrays Part 2', 
                video_url='https://www.youtube.com/embed/dxHGHIxqtIw',
                content='Advanced array operations and multi-dimensional arrays in Java.'
            )
            self.stdout.write(self.style.SUCCESS(f'Populated Java lessons for {java_course.title}'))

        # 2. Python Full Stack
        python_course = Course.objects.filter(title__icontains='Python').first()
        if python_course:
            Lesson.objects.get_or_create(
                course=python_course, order=1, 
                title='Python List Data Structures', 
                video_url='https://www.youtube.com/embed/4kr-S1HGop4',
                content='Mastering Python lists and built-in methods.'
            )
            Lesson.objects.get_or_create(
                course=python_course, order=2, 
                title='Python Tutorials - Getting Started', 
                video_url='https://www.youtube.com/embed/5OiLBWKAMmc',
                content='Introduction to Python programming basics.'
            )
            self.stdout.write(self.style.SUCCESS(f'Populated Python lessons for {python_course.title}'))

        # 3. MERN/Web Development
        web_course = Course.objects.filter(title__icontains='MERN').first() or Course.objects.filter(title__icontains='Full Stack').exclude(title__icontains='Java').first()
        if web_course:
            Lesson.objects.get_or_create(
                course=web_course, order=1, 
                title='JavaScript Tutorials Part 1', 
                video_url='https://www.youtube.com/embed/EeOAQkkbDrg',
                content='Core JavaScript concepts and syntax.'
            )
            Lesson.objects.get_or_create(
                course=web_course, order=2, 
                title='JavaScript Tutorials Part 2', 
                video_url='https://www.youtube.com/embed/IUTWEY-DKxs',
                content='Advanced JS functionalities and DOM manipulation.'
            )
            Lesson.objects.get_or_create(
                course=web_course, order=3, 
                title='HTML Tutorials - Lists', 
                video_url='https://www.youtube.com/embed/CpMGg7xASFQ',
                content='Structuring web content using HTML lists.'
            )
            Lesson.objects.get_or_create(
                course=web_course, order=4, 
                title='HTML Tutorials - Introduction', 
                video_url='https://www.youtube.com/embed/vrG2FB8SfY4',
                content='Building the web foundation with HTML5.'
            )
            self.stdout.write(self.style.SUCCESS(f'Populated Web lessons for {web_course.title}'))

        # 4. Database (Generic for all modules)
        Lesson.objects.get_or_create(
            course=java_course or python_course or web_course, order=10,
            title='Database Fundamentals (Student Module)',
            video_url='https://www.youtube.com/embed/cWX15uVsaUA',
            content='Understanding relational databases and SQL basics.'
        )
