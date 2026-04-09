from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from .models import Course, Enrollment, Lesson, LessonProgress
from .serializers import CourseSerializer, EnrollmentSerializer
from users.permissions import IsAdminRole

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
    pagination_class = None

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsAdminRole()]

    def get_queryset(self):
        if self.action == 'list':
            # If user is admin (check both possibilities), show all courses
            if self.request.user and self.request.user.is_authenticated and hasattr(self.request.user, 'role') and self.request.user.role == 'ADMIN':
                 return Course.objects.all()
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

    def get_permissions(self):
        if self.action == 'public_enroll':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=True, methods=['post'], url_path='send-mail')
    def send_acceptance_mail(self, request, pk=None):
        """Admin action to send acceptance/rejection email to student."""
        enrollment = self.get_object()
        if not request.user.is_admin():
            return Response({"error": "Admin access required"}, status=status.HTTP_403_FORBIDDEN)

        mail_type = request.data.get('mail_type', 'acceptance')
        student = enrollment.student
        course = enrollment.course

        if mail_type == 'acceptance':
            subject = f"✅ Enrollment Accepted – {course.title} | TechMasters Trainings"
            message = f"""Dear {student.first_name or student.username},

Congratulations! 🎉 Your enrollment request for the course:

📚 Course: {course.title}
📍 Location: Bidar, Karnataka
🗓️ Mode: Offline
⏱️ Duration: {course.duration}
💰 Course Fees: ₹{course.price}

...has been ACCEPTED by TechMasters Trainings Pvt. Ltd.

Next Steps:
1. Visit our institute to complete the admission formalities.
2. Complete the fee payment to activate your LMS account.
3. Once payment is confirmed, you will receive your student login credentials.

For any queries, contact us at techmasterstrainings@gmail.com or visit us at Bidar, Karnataka.

We look forward to welcoming you to the TechMasters family!

Warm regards,
Team TechMasters Trainings Pvt. Ltd.
Bidar, Karnataka"""

        elif mail_type == 'rejection':
            subject = f"❌ Enrollment Update – {course.title} | TechMasters Trainings"
            message = f"""Dear {student.first_name or student.username},

Thank you for your interest in enrolling with TechMasters Trainings Pvt. Ltd.

After careful review, we regret to inform you that your enrollment request for:

📚 Course: {course.title}

...has not been approved at this time.

If you have questions or would like to discuss alternative options, please do not hesitate to reach out to us at techmasterstrainings@gmail.com.

We encourage you to apply again in the next intake cycle.

Warm regards,
Team TechMasters Trainings Pvt. Ltd."""

        elif mail_type == 'credentials':
            subject = f"🔐 LMS Login Credentials – {course.title} | TechMasters Trainings"
            message = f"""Dear {student.first_name or student.username},

Welcome to TechMasters LMS! Your fee payment has been confirmed and your learning portal is now ACTIVE. 🚀

📚 Course: {course.title}
🌐 LMS Portal: http://localhost:3000/login

Your Login Credentials:
📧 Email: {student.email}
🔑 Temporary Password: TM@{student.id}2024 (Please change after first login)

Steps to get started:
1. Visit the LMS portal above.
2. Login with your email and temporary password.
3. Change your password immediately.
4. Start your learning journey!

For support, contact: techmasterstrainings@gmail.com

Happy Learning! 🎓
Team TechMasters Trainings Pvt. Ltd."""

        elif mail_type == 'custom':
            subject = request.data.get('subject', 'Enrollment Update')
            message = request.data.get('body', '')
            if not message:
                return Response({"error": "Body is required for custom mail"}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"error": "Invalid mail_type. Use: acceptance, rejection, credentials, custom"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [student.email],
                fail_silently=False
            )
            return Response({"success": True, "message": f"Email sent to {student.email}"})
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
        # Copy total fee from course
        enrollment.total_fee = enrollment.course.price
        enrollment.save()

        admin_subject = f"[ADMIN] New Enrollment Request: {enrollment.course.title}"
        admin_message = f"Student {enrollment.student.get_full_name() or enrollment.student.username} ({enrollment.student.email}) has submitted an enrollment request for {enrollment.course.title}.\n\nPlease review in the Admin Dashboard: http://localhost:3000/admin"
        student_subject = f"Enrollment Request Received – {enrollment.course.title} | TechMasters"
        student_message = f"""Dear {enrollment.student.get_full_name() or enrollment.student.username},

We have received your enrollment request for:
📚 {enrollment.course.title}

Our academic counselor will review your profile and contact you shortly with the next steps.

Warm regards,
TechMasters Trainings Pvt. Ltd."""

        try:
            send_mail(admin_subject, admin_message, settings.DEFAULT_FROM_EMAIL, [settings.EMAIL_HOST_USER], fail_silently=True)
            send_mail(student_subject, student_message, settings.DEFAULT_FROM_EMAIL, [enrollment.student.email], fail_silently=True)
        except Exception as e:
            print(f"Email send error: {e}")

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def public_enroll(self, request):
        """Public enrollment endpoint — no login required."""
        data = request.data
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        phone = data.get('phone', '').strip()
        course_name = data.get('course', '').strip()
        background = data.get('background', '').strip()

        if not all([name, email, phone, course_name]):
            return Response({"error": "Name, email, phone, and course are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Get or create student user
        user, user_created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email,
                'first_name': name.split()[0] if name else '',
                'last_name': ' '.join(name.split()[1:]) if len(name.split()) > 1 else '',
                'phone': phone,
                'role': 'STUDENT'
            }
        )
        if not user_created:
            # Update name/phone if user already exists
            if not user.first_name:
                user.first_name = name.split()[0] if name else ''
                user.last_name = ' '.join(name.split()[1:]) if len(name.split()) > 1 else ''
            if not user.phone:
                user.phone = phone
            user.save()

        # Find the actual course from DB (must already exist)
        course = Course.objects.filter(title__iexact=course_name).first()
        if not course:
            course = Course.objects.filter(title__icontains=course_name).first()
        if not course:
            # Fallback: create one, but mark as accepted
            from django.utils.text import slugify
            course = Course.objects.create(
                title=course_name,
                slug=slugify(course_name),
                description=f"Training program for {course_name}",
                duration="TBD",
                price=0.00,
                status='accepted'
            )

        # Prevent duplicate enrollment
        existing = Enrollment.objects.filter(student=user, course=course).first()
        if existing:
            return Response({
                "message": "You have already enrolled in this course.",
                "enrollment_id": existing.id,
                "status": existing.status
            }, status=status.HTTP_200_OK)

        enrollment = Enrollment.objects.create(
            student=user,
            course=course,
            total_fee=course.price
        )

        # Notify admin
        try:
            admin_msg = f"New public enrollment from {name} ({email}) for {course.title}.\nPhone: {phone}\nBackground: {background}\n\nReview: http://localhost:3000/admin"
            send_mail(
                f"[ADMIN] New Enrollment: {name} → {course.title}",
                admin_msg,
                settings.DEFAULT_FROM_EMAIL,
                [settings.EMAIL_HOST_USER],
                fail_silently=True
            )
            student_msg = f"""Dear {name},

Thank you for enrolling with TechMasters Trainings Pvt. Ltd.!

📚 Course Applied: {course.title}
📍 Institute: TechMasters Trainings Pvt. Ltd., Bidar, Karnataka

Your application is currently PENDING review by our admissions team. You will be notified via email once a decision is made.

For inquiries: techmasterstrainings@gmail.com

Regards,
Team TechMasters"""
            send_mail(
                f"Enrollment Received – {course.title} | TechMasters",
                student_msg,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=True
            )
        except Exception as e:
            print(f"Email error on public enroll: {e}")

        return Response({
            "message": "Enrollment submitted successfully. You will be contacted shortly.",
            "enrollment_id": enrollment.id,
            "status": enrollment.status
        }, status=status.HTTP_201_CREATED)
