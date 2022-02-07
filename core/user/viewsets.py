# core/user/viewsets.py
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from http import HTTPStatus
from core.user.serializers import UserSerializer
from core.user.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.response import Response


class UpdateViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_class = (IsAuthenticated,)
    queryset = User.objects.all()


    # def get_queryset(self):
    #     return User.objects.filter(pk=self.request.user.profile.id)


    # # def update(self, request, pk=None):
    # #     print(request)

    def put(self, request, user, format=None):
        item = get_object_or_404(User, pk=user)
        # why arent we getting the full object?

        serializer = UserSerializer(item, data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTPStatus.BAD_REQUEST)
            #self.update(request, *args, id)

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'put']
    serializer_class = UserSerializer
    permission_class = (IsAuthenticated,)
    filter_backend = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        print(self.request.user.id)
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj



class PageViewset(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer


    def get_queryset(self):
        path = self.request.get_full_path().split("/")
        stripped_path = list(filter(lambda x: x != "", path))
        last_item = stripped_path[-1]
        return User.objects.filter(username=last_item)


