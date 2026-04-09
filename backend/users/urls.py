from django.urls import path
from .views import RegisterView, UserListView, UserDetailView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('list/', UserListView.as_view(), name='user_list'),
    path('profile/', ProfileView.as_view(), name='user_profile'),
    path('<int:pk>/', UserDetailView.as_view(), name='user_detail'),
]
