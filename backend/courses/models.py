from django.db import models
from users.models import User

class Course(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, null=True, blank=True)
    description = models.TextField()
    duration = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2) # this is the 'fees'
    location = models.CharField(max_length=255, default='Bidar, Karnataka.')
    mode = models.CharField(max_length=50, default='Offline')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='accepted') 
    image = models.ImageField(upload_to='courses/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    order = models.PositiveIntegerField(default=1)
    title = models.CharField(max_length=255)
    video_url = models.URLField(max_length=500, help_text="YouTube/Vimeo Embed URL")
    content = models.TextField(blank=True, null=True)
    duration = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.course.title} - {self.title}"

class Enrollment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    )
    PROJECT_CHOICES = (
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
    )
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_on = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # academic tracking
    attendance = models.IntegerField(default=0)
    project_status = models.CharField(max_length=20, choices=PROJECT_CHOICES, default='Ongoing')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    progress_percentage = models.IntegerField(default=0)
    
    # payment tracking
    paid = models.BooleanField(default=False)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    date_paid = models.DateTimeField(null=True, blank=True)
    
    # certificate control
    certificate_unlocked = models.BooleanField(default=False)  # Admin can manually unlock


    def __str__(self):
        return f"{self.student.username} - {self.course.title}"

class LessonProgress(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    last_watched = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('enrollment', 'lesson')

    def __str__(self):
        return f"{self.enrollment.student.username} - {self.lesson.title}"

