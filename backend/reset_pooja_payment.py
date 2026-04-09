import os
import django

# Set up environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'techmasters_backend.settings')
django.setup()

from courses.models import Enrollment

def reset_payment():
    try:
        # Search for Pooja Shivakumar's enrollment
        # Based on screenshot ID: TM-2023-6
        enrollment = Enrollment.objects.get(id=6)
        print(f"Found enrollment for: {enrollment.student.get_full_name() or enrollment.student.username}")
        
        enrollment.paid = False
        enrollment.paid_amount = 0.00
        enrollment.date_paid = None
        enrollment.save()
        
        print("Successfully reset payment status to PENDING and amount to 0.")
    except Enrollment.DoesNotExist:
        print("Enrollment with ID 6 not found.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    reset_payment()
