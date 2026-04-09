from rest_framework import serializers
from .models import Course, Enrollment, Lesson, LessonProgress
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'role']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class LessonProgressSerializer(serializers.ModelSerializer):
    lesson_details = LessonSerializer(source='lesson', read_only=True)
    class Meta:
        model = LessonProgress
        fields = ['id', 'lesson', 'is_completed', 'last_watched', 'lesson_details']

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    lesson_count = serializers.IntegerField(source='lessons.count', read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'description', 'duration', 'price', 
            'location', 'mode', 'status', 'image', 'created_at', 
            'lessons', 'lesson_count'
        ]

class EnrollmentSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)
    student_details = UserSerializer(source='student', read_only=True)
    lesson_progress = LessonProgressSerializer(many=True, read_only=True)
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'student', 'course', 'enrolled_on', 'status',
            'attendance', 'project_status', 'start_date', 'end_date',
            'progress_percentage', 'paid', 'paid_amount', 'total_fee', 'date_paid',
            'certificate_unlocked',
            'course_details', 'student_details', 'lesson_progress'
        ]

