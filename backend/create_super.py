from django.contrib.auth import get_user_model

User = get_user_model()
if not User.objects.filter(email='admin@techmasters.com').exists():
    User.objects.create_superuser(
        email='admin@techmasters.com',
        username='admin',
        password='adminpassword123',
        first_name='Admin',
        last_name='User'
    )
    print("Superuser created successfully!")
else:
    print("Superuser already exists.")
