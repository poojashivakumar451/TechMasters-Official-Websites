from rest_framework import viewsets, permissions
from django.core.mail import send_mail
from django.conf import settings
from .models import Enquiry
from .serializers import EnquirySerializer

class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    
    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), permissions.IsAdminUser()]

    def perform_create(self, serializer):
        enquiry = serializer.save()
        
        # Send email to admin
        subject = f"New Enquiry from {enquiry.name}"
        message = f"You have received a new enquiry:\n\n" \
                  f"Name: {enquiry.name}\n" \
                  f"Email: {enquiry.email}\n" \
                  f"Phone: {enquiry.phone}\n" \
                  f"Message: {enquiry.message}\n"
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.EMAIL_HOST_USER], # Admin email
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error sending email: {e}")
