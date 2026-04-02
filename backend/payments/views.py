from rest_framework import viewsets, permissions
from django.core.mail import send_mail
from django.conf import settings
from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_admin():
            return Payment.objects.all().select_related('student', 'course')
        return Payment.objects.filter(student=self.request.user).select_related('student', 'course')

    def perform_create(self, serializer):
        payment = serializer.save(student=self.request.user)
        
        # Email to student
        subject = "Payment Initiated"
        message = f"Dear {payment.student.get_full_name()},\n\nYour payment for the course {payment.course.title if payment.course else 'General'} has been initiated. Current status: {payment.status}.\n\nThank you,\nTechMasters Team"
        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [payment.student.email], fail_silently=True)
        except Exception as e:
            print(f"Error sending payment email: {e}")

    def perform_update(self, serializer):
        payment = serializer.instance
        old_status = payment.status
        updated_payment = serializer.save()

        # Check if status changed
        if old_status != updated_payment.status and updated_payment.status.upper() == 'PAID':
            subject = "Payment Successful"
            message = f"Dear {updated_payment.student.get_full_name()},\n\nYour payment for the course {updated_payment.course.title if updated_payment.course else 'General'} has been successfully processed.\n\nThank you,\nTechMasters Team"
            try:
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [updated_payment.student.email], fail_silently=True)
            except Exception as e:
                print(f"Error sending payment success email: {e}")
