import os
import django
import decimal

# Set up environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'techmasters_backend.settings')
django.setup()

from courses.models import Course

courses_data = [
    ('Flask Framework', '4 Months', 10000, "Flask is a lightweight and powerful WSGI web application framework written in Python."),
    ('Java Full Stack Development', '6 Months', 12500, "Refers to development of both front-end and back-end portions using Java-based technologies."),
    ('Django', '4 Months', 10000, "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design."),
    ('Python Programming', '4 Months', 8500, "Master the most versatile programming language. Covers Python 3 basics to advanced concepts."),
    ('Python Full Stack Development', '6 Months', 12500, "Comprehensive training in Python-based web development, Django, React and PostgreSQL."),
    ('Artificial Intelligence', '6 Months', 15000, "Neural Networks, Natural Language Processing, and Computer Vision foundations."),
    ('Data Science', '6 Months', 15000, "Extract insights from data using statistics, visualization and predictive modeling."),
    ('Java DSA', '6 Months', 12000, "Intensive training on Data Structures and Algorithms using Java core."),
    ('Python DSA', '4 Months', 10500, "Master complex algorithms and data structures using Python efficient syntax."),
    ('Cloud', '4 Months', 14000, "Design, deploy and manage applications on AWS and Azure cloud platforms."),
    ('Machine Learning', '6 Months', 14500, "Focus on statistical modeling and predictive algorithms using Scikit-Learn."),
    ('C Programming', '3 Months', 6500, "System-level programming, pointers, and memory management foundations."),
    ('Spring Framework', '4 Months', 11000, "Master the standard Java framework for enterprise applications and MVC."),
    ('MySQL', '2 Months', 5000, "Relational database management, SQL queries and indexing optimization."),
    ('Oracle', '3 Months', 8500, "Advanced Oracle Database Management with PL/SQL and security."),
    ('PostgreSQL', '3 Months', 8500, "Master ACID compliance, JSONB and Geospatial data in open-source DB."),
    ('Java programming', '4 Months', 8500, "Comprehensive training in Core Java, JVM internals and Multithreading."),
    ('Advance Programming - Databases', '4 Months', 11500, "Bridging the gap between high-level programming and database optimization."),
    ('MERN Full Stack Development', '6 Months', 12500, "Modern web apps using MongoDB, Express, React and Node.js."),
    ('Development Course', '4 Months', 8500, "Comprehensive SDLC, agile methodologies and cross-platform tools."),
    ('Frontend Development', '4 Months', 9500, "Building accessible user interfaces with React and Next.js."),
    ('Backend Development', '4 Months', 10500, "Server-side logic, load balancing and high-performance API design."),
    ('DSA Programming', '4 Months', 10000, "Language-agnostic approach to problem solving and algorithmic efficiency."),
    ('Spring Boot', '4 Months', 11500, "Building cloud-native production-grade Java applications with Spring Boot."),
    ('C DSA', '4 Months', 9000, "Implementing fundamental data structures and algorithms from scratch in C.")
]

def seed():
    print(f"Seeding {len(courses_data)} courses...")
    for title, duration, price, desc in courses_data:
        course, created = Course.objects.update_or_create(
            title=title,
            defaults={
                'duration': duration,
                'price': decimal.Decimal(price),
                'description': desc,
                'status': 'accepted',
                'location': 'Bidar, Karnataka.',
                'mode': 'Offline'
            }
        )
        if created:
            print(f"Created: {title}")
        else:
            print(f"Updated: {title} (Price: ₹{price})")

if __name__ == '__main__':
    seed()
