import json  # Add this import at the top of your file
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from .serializers import LoginSerializer, RegisterSerializer, CourseSerializer, InstructorSerializer
from .models import Course, Instructor
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse



#Login view
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]  # Get the authenticated user
            login(request, user)  # Log the user in
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "username": user.username,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Register view
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # Save the new user
            user = serializer.save()
            return Response({
                "message": "Registration successful. Please log in.",
                "username": user.username,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class InstructorListView(APIView):
    def get(self, request):
        instructors = Instructor.objects.all()
        serializer = InstructorSerializer(instructors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


@method_decorator(csrf_exempt, name='dispatch')  # Exempt this view from CSRF for development
class UpdateCourseView(View):
    def put(self, request, code):
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)

            # Find the course by its code
            course = Course.objects.get(code=code)

            # Update course fields with the provided data
            course.name = data.get('name', course.name)
            course.description = data.get('description', course.description)
            course.duration = data.get('duration', course.duration)
            course.instructor = data.get('instructor', course.instructor)
            course.save()

            # Return success response
            return JsonResponse({'message': 'Course updated successfully.'}, status=200)

        except Course.DoesNotExist:
            return JsonResponse({'error': 'Course not found.'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)








