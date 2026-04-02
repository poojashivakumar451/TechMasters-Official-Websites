from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from .models import Course, Enrollment, Lesson, LessonProgress
from .serializers import CourseSerializer, EnrollmentSerializer
from users.permissions import IsAdminRole
from django.shortcuts import get_object_or_404

User = get_user_model()

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_admin())

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    search_fields = ['title', 'description']
    lookup_field = 'slug'
    pagination_class = None
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsAdminRole()]

    def get_queryset(self):
        if self.action == 'list':
            return Course.objects.filter(status='accepted')
        return Course.objects.all()

class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        if self.request.user.is_admin():
            return Enrollment.objects.all().select_related('course', 'student').prefetch_related('lesson_progress')
        return Enrollment.objects.filter(student=self.request.user).select_related('course', 'student').prefetch_related('lesson_progress')

    @action(detail=True, methods=['post'], url_path='mark-lesson-complete')
    def mark_lesson_complete(self, request, pk=None):
        enrollment = self.get_object()
        lesson_id = request.data.get('lesson_id')
        
        if not lesson_id:
            return Response({"error": "lesson_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        lesson = Lesson.objects.filter(id=lesson_id, course=enrollment.course).first()
        if not lesson:
            return Response({"error": "Lesson not found for this course"}, status=status.HTTP_404_NOT_FOUND)
            
        progress, created = LessonProgress.objects.get_or_create(
            enrollment=enrollment,
            lesson=lesson,
            defaults={'is_completed': True}
        )
        
        if not created and not progress.is_completed:
            progress.is_completed = True
            progress.save()
            
        # Update progress percentage
        total_lessons = enrollment.course.lessons.count()
        completed_lessons = enrollment.lesson_progress.filter(is_completed=True).count()
        
        if total_lessons > 0:
            enrollment.progress_percentage = int((completed_lessons / total_lessons) * 100)
            if enrollment.progress_percentage == 100:
                enrollment.status = 'completed'
            enrollment.save()
            
        return Response({
            "message": "Lesson marked as complete",
            "progress_percentage": enrollment.progress_percentage,
            "status": enrollment.status
        })

    def perform_create(self, serializer):
        enrollment = serializer.save(student=self.request.user)
        # Send emails as before...
        # ... (keeping existing logic)
        admin_subject = f"[ADMIN] New Enrollment Attempt: {enrollment.course.title}"
        admin_message = f"Student {enrollment.student.get_full_name()} ({enrollment.student.email}) has enrolled in {enrollment.course.title}.\n\nPlease review the application in the Admin Dashboard."
        student_subject = f"Enrollment Received: {enrollment.course.title}"
        student_message = f"Dear {enrollment.student.get_full_name()},\n\nWe have received your enrollment request for the course {enrollment.course.title} at TechMasters Training private Limited.\n\nOur academic counselor will review your profile and contact you shortly for the next steps."

        try:
            send_mail(admin_subject, admin_message, settings.DEFAULT_FROM_EMAIL, [settings.EMAIL_HOST_USER], fail_silently=True)
            send_mail(student_subject, student_message, settings.DEFAULT_FROM_EMAIL, [enrollment.student.email], fail_silently=True)
        except Exception as e:
            print(f"Error sending enrollment emails: {e}")

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def public_enroll(self, request):
        # ... keeping existing public_enroll logic
        data = request.data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        course_name = data.get('course')
        
        if not all([name, email, phone, course_name]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        user, created = User.objects.get_or_create(email=email, defaults={
            'username': email, 'first_name': name, 'phone': phone, 'role': 'STUDENT'
        })
        
        course, c_created = Course.objects.get_or_create(title=course_name, defaults={
            'description': f"{course_name} default description", 'duration': 'TBD', 'price': 0.00
        })
        
        enrollment = Enrollment.objects.create(student=user, course=course)
        return Response({"message": "Successfully enrolled", "enrollment_id": enrollment.id, "status": enrollment.status}, status=status.HTTP_201_CREATED)
