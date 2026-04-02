from django.db import models
from users.models import User
from courses.models import Course
import uuid

class Certificate(models.Model):
    certificate_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='certificates')
    issue_date = models.DateField(auto_now_add=True)
    certificate_file = models.FileField(upload_to='certificates/', blank=True, null=True)

    def __str__(self):
        return f"Cert {self.certificate_id} - {self.student.username}"
