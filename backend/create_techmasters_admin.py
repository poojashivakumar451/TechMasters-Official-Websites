from django.contrib.auth import get_user_model

User = get_user_model()
username = 'techmasterstrainings@gmail.com'
email = 'techmasterstrainings@gmail.com'
password = 'Fri10Feb@2023'

user = User.objects.filter(username=username).first()
if not user:
    user = User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
    )
    user.role = 'ADMIN'
    user.save()
    print("Created superuser successfully.")
else:
    user.set_password(password)
    user.is_staff = True
    user.is_superuser = True
    user.role = 'ADMIN'
    user.save()
    print("Updated superuser successfully.")
