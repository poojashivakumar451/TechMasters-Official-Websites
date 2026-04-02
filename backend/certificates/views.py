from rest_framework import viewsets, permissions
from django.core.mail import send_mail
from django.conf import settings
from .models import Certificate
from .serializers import CertificateSerializer

class CertificateViewSet(viewsets.ModelViewSet):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_admin():
            return Certificate.objects.all().select_related('student', 'course')
        return Certificate.objects.filter(student=self.request.user).select_related('student', 'course')

    def perform_create(self, serializer):
        certificate = serializer.save()
        
        # Email to student
        subject = "Congratulations! Your Certificate is Ready"
        message = f"Dear {certificate.student.get_full_name()},\n\nCongratulations on completing {certificate.course.title}! Your certificate ({certificate.certificate_id}) is now available in your dashboard.\n\nThank you,\nTechMasters Team"
        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [certificate.student.email], fail_silently=True)
        except Exception as e:
            print(f"Error sending certificate email: {e}")
