from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.http import JsonResponse

def home_view(request):
    return JsonResponse({
        "message": "TechMasters Backend API is running successfully.",
        "endpoints": [
            "/api/users/",
            "/api/courses/",
            "/api/payments/",
            "/api/certificates/",
            "/api/enquiries/"
        ]
    })

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/certificates/', include('certificates.urls')),
    path('api/enquiries/', include('enquiries.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
