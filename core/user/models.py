# core/user/models.py
from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, **kwargs):
        """create and return a user with email"""
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(username=username,
                          email=self.normalize_email(email))

        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(self, username, email, password):
        """ create and return a user with email"""
        if password is None:
            raise TypeError('Superusers must have a password.')

        if username is None:
            raise TypeError('Superusers must have a username.')

        if email is None:
            raise TypeError('Superusers must have an email.')

        user = self.model(username=username,
                          email=self.normalize_email(email))

        user.set_password(password)
        user.is_superstar = True
        user.is_staff = True

        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True, null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    links = models.TextField(blank=True)
    
    """ custom fields"""
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

