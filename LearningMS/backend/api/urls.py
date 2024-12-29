from django.urls import path
from .views import LoginView, RegisterView, CourseListView, InstructorListView, UpdateCourseView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('instructors/', InstructorListView.as_view(), name='instructors-list'),
    path('courses/<str:code>/', UpdateCourseView.as_view(), name='update-course'),
]
    