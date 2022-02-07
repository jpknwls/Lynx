# core/routers.py

from rest_framework.routers import SimpleRouter
from core.user.viewsets import UserViewSet, PageViewset, UpdateViewSet
from core.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet

routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
## updating user
routes.register(r'user/(?P<user>.+)', UpdateViewSet, basename='user')
## getting user data 
routes.register(r'^(?P<id>.+)', PageViewset, basename='page')


urlpatterns = [
    *routes.urls    
]