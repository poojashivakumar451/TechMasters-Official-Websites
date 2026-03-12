import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Briefcase, Monitor } from 'lucide-react';

const Courses = ({ adminCourses = [] }) => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);


  const companyName = "TechMasters Trainings private limited";
  const location = "Bidar, Karnataka.";
  const workMode = "Offline";

  const generateExhaustiveData = () => {
    const baseData = {
      'Flask Framework': {
        duration: '4 Months', fees: '₹10,000',
        definition: "Flask is a lightweight and powerful WSGI web application framework written in Python. It is designed to make getting started quick and easy, with the ability to scale up to complex applications. Originally begun as a simple wrapper around Werkzeug and Jinja, Flask has become one of the most popular Python web frameworks. It offers suggestions but doesn't enforce any dependencies or project layout. It is widely used for creating microservices and RESTful APIs due to its modular design.",
        softwareRequirements: ['Python 3.10+', 'VS Code', 'Postman', 'Git & GitHub', 'SQLite/PostgreSQL'],
        syllabus: [
          { module: "Module 1", title: "WSGI & Core Engine", topics: ["WSGI Overview", "Environment Setup", "Virtual Environments"] },
          { module: "Module 2", title: "Routing & Logic", topics: ["Dynamic URL Building", "HTTP Methods", "Custom Error Handlers"] },
          { module: "Module 3", title: "ORM & Database Management", topics: ["Flask-SQLAlchemy Integration", "Database Migrations", "Model Relationships"] },
          { module: "Module 4", title: "Authentication & Security", topics: ["JWT Token Integration", "Flask-Login", "Bcrypt Hashing"] },
          { module: "Module 5", title: "Enterprise Scalability", topics: ["Blueprints Architecture", "Celery Tasks", "Redis Integration"] }
        ],
        projects: [
          { title: "Personalized Content CMS", desc: "A robust blog platform supporting Markdown and multi-user authoring." },
          { title: "Inventory Rest API", desc: "Enterprise-grade API with JWT security for tracking warehouse movements." },
          { title: "Health Monitoring Dashboard", desc: "Real-time tracker using WebSockets." },
          { title: "Automated Feedback System", desc: "A microservice that triggers automated email responses." },
          { title: "Real Estate Listing Portal", desc: "Dynamic listing engine with advanced search filters." },
          { title: "Weather Analytics Hub", desc: "Third-party API integration displaying historical weather data." },
          { title: "School Management System", desc: "Full CRUD application for managing student records." },
          { title: "Task Scheduler Bot", desc: "Asynchronous task manager using Celery." }
        ]
      },
      'Java Full Stack Development': {
        duration: '6 Months', fees: '₹12,500',
        definition: "Java Full Stack development refers to the development of both front-end and back-end portions of an application using Java-based technologies. A Java Full Stack Developer is proficient in Java Core, Spring Boot, Hibernate, and React. This course is designed to design end-to-end systems with high security and community support.",
        softwareRequirements: ['JDK 17+', 'IntelliJ IDEA', 'MySQL Workbench', 'Maven', 'Docker', 'Postman'],
        syllabus: [
          { module: "Module 1", title: "Core Language Mastery", topics: ["OOPs Concepts", "Exception Handling", "Collections Framework"] },
          { module: "Module 2", title: "Spring Ecosystem", topics: ["Spring Core & IoC", "Spring Boot Starters", "Dependency Injection"] },
          { module: "Module 3", title: "Persistence Layer", topics: ["Hibernate ORM", "Spring Data JPA", "Transaction Management"] },
          { module: "Module 4", title: "Microservices Architecture", topics: ["Eureka Discovery", "API Gateway", "Config Server"] },
          { module: "Module 5", title: "Frontend Integration", topics: ["React Hooks", "Redux Toolkit", "Axios Connectivity"] }
        ],
        projects: [
          { title: "Digital Banking Solution", desc: "Secure banking app with money transfer logic." },
          { title: "Healthcare Information Portal", desc: "Management system for hospitals." },
          { title: "Microservices E-Commerce", desc: "Decoupled system with separate services for Products and Payments." },
          { title: "Corporate ERP System", desc: "Resource planning tool including payroll." },
          { title: "Insurance Claim Engine", desc: "Workflow automation system to track claims." },
          { title: "Social Connect Engine", desc: "Networking platform supporting friend requests." },
          { title: "Smart City Management", desc: "IoT-simulated dashboard for monitoring traffic." },
          { title: "University LMS", desc: "E-learning portal with video streaming." }
        ]
      },
      'Django': {
        duration: '4 Months', fees: '₹10,000',
        definition: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel.",
        softwareRequirements: ['Python 3.10+', 'Django 4.2+', 'PostgreSQL', 'Redis', 'Docker'],
        syllabus: [
          { module: "Module 1", title: "The MTV Architecture", topics: ["Models, Templates, Views", "URLconf", "Admin Interface"] },
          { module: "Module 2", title: "Data Modeling & ORM", topics: ["QuerySets", "Migrations", "Custom Managers"] },
          { module: "Module 3", title: "REST Framework", topics: ["Serializers", "Viewsets", "Authentication & Permissions"] },
          { module: "Module 4", title: "Asynchronous Django", topics: ["Django Channels", "WebSockets", "Celery & Redis"] },
          { module: "Module 5", title: "Deployment & Scaling", topics: ["Gunicorn & Nginx", "DigitalOcean/AWS", "Caching Strategies"] }
        ],
        projects: [
          { title: "Enterprise E-Commerce API", desc: "Scalable backend for a multi-vendor store with DRF." },
          { title: "Real-time Chat Application", desc: "Instant messaging system using Django Channels and WebSockets." },
          { title: "HR Management System", desc: "Automated workflow for employee tracking and payroll." },
          { title: "Healthcare Inventory Hub", desc: "Medical stock management with automated low-stock alerts." },
          { title: "Social Media Analytics", desc: "Dashboard to pull and visualize data from public APIs." },
          { title: "SaaS Subscription Engine", desc: "Recurring billing system with Stripe integration." },
          { title: "Online Coding Judge", desc: "Platform that executes and evaluates code snippets." },
          { title: "Personal Finance Tracker", desc: "Expense manager with dynamic charting and reports." }
        ]
      },
      'Python Programming': {
        duration: '4 Months', fees: '₹8,500',
        definition: "Master the most versatile programming language. From basic syntax to advanced concepts like decorators and generators, this course prepares you for Data Science, Web Dev, or Automation.",
        softwareRequirements: ['Python 3.12', 'PyCharm/VS Code', 'Jupyter Notebook'],
        syllabus: [
          { module: "Module 1", title: "Foundations", topics: ["Data Types", "Control Flow", "Functions"] },
          { module: "Module 2", title: "Object Oriented Python", topics: ["Classes", "Inheritance", "Magic Methods"] },
          { module: "Module 3", title: "Standard Library", topics: ["OS Module", "Requests", "JSON Handling"] }
        ],
        projects: [
          { title: "Automated File Organizer", desc: "Script to clean up and organize messy directories." },
          { title: "Crypto Price Tracker", desc: "Fetches live market data and sends alerts." },
          { title: "Stock Analysis Tool", desc: "Visualizes historical data using Matplotlib." },
          { title: "Web Scraper", desc: "Extracts product data from e-commerce sites." },
          { title: "CLI Dictionary", desc: "Search meanings using Oxford/Google APIs from terminal." },
          { title: "Email Automator", desc: "Sends bulk dynamic emails with customized attachments." }
        ]
      },
      'Python Full Stack Development': {
        duration: '6 Months', fees: '₹12,500',
        definition: "Comprehensive training in Python-based web development. Covers Python core, Django, Flask, PostgreSQL, and React. Graduates are capable of building high-performance, secure, and scalable modern web applications.",
        softwareRequirements: ['Python 3.12', 'Django', 'PostgreSQL', 'Docker', 'React'],
        syllabus: [
          { module: "Module 1", title: "Backend Mastery", topics: ["Django Ninja", "FastAPI Integration", "PostgreSQL Admin"] },
          { module: "Module 2", title: "Frontend Architecture", topics: ["React Server Components", "State Management", "Material UI"] }
        ],
        projects: [
          { title: "Real-time Auction System", desc: "Live bidding platform with WebSockets and automated notifications." },
          { title: "Global Logistics Tracker", desc: "Geospatial mapping and fleet management system." },
          { title: "Enterprise Knowledge Base", desc: "AI-powered internal wiki and document management system." },
          { title: "SaaS Subscription Manager", desc: "Multi-tenant billing and user management portal." },
          { title: "E-Learning Management System", desc: "Course delivery platform with quiz and video integration." },
          { title: "Fleet Management Hub", desc: "Telematics tracking and maintenance logging system." }
        ]
      },
      'Artificial Intelligence': {
        duration: '6 Months', fees: '₹15,000',
        definition: "Dive into the world of AI. Cover Neural Networks, Natural Language Processing, and Computer Vision. Build intelligent agents that can learn and adapt.",
        softwareRequirements: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
        syllabus: [
          { module: "Module 1", title: "Deep Learning", topics: ["Neural Networks", "CNNs", "RNNs & LSTMs"] },
          { module: "Module 2", title: "LLM & GenAI", topics: ["Transformers", "Prompt Engineering", "Fine-tuning Models"] }
        ],
        projects: [
          { title: "Smart Healthcare Diagnostic", desc: "AI image recognition for medical X-rays and reports." },
          { title: "Voice-to-Task Assistant", desc: "Intelligent agent that processes verbal commands to execute code." },
          { title: "Sentiment Analytics Engine", desc: "Real-time analysis of social media trends and emotions." },
          { title: "Autonomous Path Finder", desc: "AI agent navigating complex virtual grids with obstacles." },
          { title: "Face Recognition Attendance", desc: "Security-grade biometric system with mask detection." },
          { title: "Customer Interaction Bot", desc: "Natural language chatbot for complex support queries." }
        ]
      },
      'Data Science': {
        duration: '6 Months', fees: '₹15,000',
        definition: "Extract insights from structured and unstructured data. Master statistics, data visualization, and predictive modeling using industry-leading tools.",
        softwareRequirements: ['Python', 'Pandas', 'Scikit-Learn', 'Tableau', 'SQL'],
        syllabus: [
          { module: "Module 1", title: "Data Engineering", topics: ["ETL Pipelines", "Big Data with Spark", "Data Lake Setup"] },
          { module: "Module 2", title: "Advanced Analytics", topics: ["Prescriptive Analysis", "Hypothesis Testing", "A/B Testing"] }
        ],
        projects: [
          { title: "Financial Market Predictor", desc: "Machine learning model to identify stock market anomalies." },
          { title: "Customer Churn Analyzer", desc: "Predictive dashboard for telecom and retail sectors." },
          { title: "Agricultural Yield Optimizer", desc: "Satellite data analysis for crop health and harvesting." },
          { title: "Fraud Detection Engine", desc: "Real-time monitoring system for suspicious banking transactions." },
          { title: "Supply Chain forecaster", desc: "Inventory demand prediction based on seasonal trends." },
          { title: "Property Valuation Model", desc: "Regression-based engine for predicting real estate prices." }
        ]
      },
      'Java DSA': {
        duration: '6 Months', fees: '₹12,000',
        definition: "Intensive training on Data Structures and Algorithms using Java. Focuses on competitive programming, complexity analysis, and technical interview cracking.",
        softwareRequirements: ['JDK 21', 'IntelliJ IDEA', 'LeetCode/HackerRank'],
        syllabus: [
          { module: "Module 1", title: "Data Structures", topics: ["Linked Lists", "Trees & Graphs", "Heaps & HashMaps"] },
          { module: "Module 2", title: "Algorithms", topics: ["Dynamic Programming", "Greedy Algorithms", "Backtracking"] }
        ],
        projects: [
          { title: "Advanced Search Engine Optimizer", desc: "Implementing Trie and Graph traversal for rapid indexing." },
          { title: "Shortest Path Logistics", desc: "Dijkstra-based system for city route optimization." },
          { title: "File Compression Utility", desc: "Huffman Coding implementation for space-saving storage." },
          { title: "Task Priority Scheduler", desc: "Priority Queue based system for OS task management." },
          { title: "Memory Allocation Simulator", desc: "Simulating First-fit/Best-fit algorithms in Java." },
          { title: "Social Graph Analyzer", desc: "BFS/DFS based BFS implementation for friend recommendations." }
        ]
      },
      'Python DSA': {
        duration: '4 Months', fees: '₹10,500',
        definition: "Master complex algorithms and data structures using Python's efficient syntax. Ideal for FAANG prep and high-performance scripting.",
        softwareRequirements: ['Python 3.12', 'PyCharm'],
        syllabus: [
          { module: "Module 1", title: "Python Dynamics", topics: ["Complexity Analysis", "Sorting & Searching", "Recursion"] },
          { module: "Module 2", title: "Advanced Pythonic Structures", topics: ["Deque", "Priority Queues", "Graph Coloring"] }
        ],
        projects: [
          { title: "Sudoku Solver Hub", desc: "Backtracking algorithm visualized with dynamic solving." },
          { title: "Network Packet Analyzer", desc: "Mapping network hops using Kruskal’s algorithm." },
          { title: "Stock Arbitrage Finder", desc: "Detecting price differences using Bellman-Ford algorithm." },
          { title: "Spam Detection Logic", desc: "String matching and pattern recognition algorithms." },
          { title: "Plagiarism Checker", desc: "Longest Common Subsequence implementation for text comparison." },
          { title: "Optimal Caching System", desc: "LRU Cache implementation with O(1) time complexity." }
        ]
      },
      'Cloud': {
        duration: '4 Months', fees: '₹14,000',
        definition: "Learn to design, deploy and manage applications on AWS and Azure. Covers Serverless, Microservices, and Cloud Security.",
        softwareRequirements: ['AWS Console', 'Azure Portal', 'Terraform', 'Docker'],
        syllabus: [
          { module: "Module 1", title: "Infrastructure as Code", topics: ["Terraform Scripts", "CloudFormation", "VPC Networking"] },
          { module: "Module 2", title: "Serverless Computing", topics: ["AWS Lambda", "Azure Functions", "API Gateway"] }
        ],
        projects: [
          { title: "Auto-Scaling E-Commerce", desc: "Cloud infrastructure that adapts to traffic spikes automatically." },
          { title: "Serverless Image Processor", desc: "Lambda-driven system that resize images on upload." },
          { title: "Multi-Region Disaster Recovery", desc: "Failover system across different geographical zones." },
          { title: "Cloud Cost Optimizer", desc: "Automated script to shut down idle resources." },
          { title: "DevOps CI/CD Pipeline", desc: "Automating cloud deployments with Jenkins and GitHub Actions." },
          { title: "Hybrid Cloud Storage Manager", desc: "Syncing data between local servers and AWS S3 buckets." }
        ]
      },
      'Machine Learning': {
        duration: '6 Months', fees: '₹14,500',
        definition: "Focus on statistical modeling and predictive algorithms. From Linear Regression to Random Forests and Gradient Boosting.",
        softwareRequirements: ['Scikit-learn', 'Pandas', 'XGBoost', 'Tableau'],
        syllabus: [
          { module: "Module 1", title: "Supervised Learning", topics: ["Classification", "Regression", "Support Vector Machines"] },
          { module: "Module 2", title: "Ensemble Methods", topics: ["Random Forest", "Boosting", "Bagging"] }
        ],
        projects: [
          { title: "Credit Default Predictor", desc: "Analyzing loan history to predict repayment behavior." },
          { title: "Real Estate Value Trend", desc: "Time-series analysis of property market data." },
          { title: "User Recommendation Engine", desc: "Collaborative filtering for personalized user experiences." },
          { title: "Anomaly Detection for IoT", desc: "Identifying sensor failures in industrial machinery." },
          { title: "NLP Topic Modeler", desc: "Categorizing thousands of news articles automatically." },
          { title: "Cancer Treatment Efficacy", desc: "Predicting drug response based on clinical parameters." }
        ]
      },
      'C Programming': {
        duration: '3 Months', fees: '₹6,500',
        definition: "Deep dive into system-level programming. Master pointers, memory management, and high-performance logic building.",
        softwareRequirements: ['GCC Compiler', 'CodeBlocks/VS Code'],
        syllabus: [
          { module: "Module 1", title: "Pointers & Memory", topics: ["Pointer Arithmetic", "Dynamic Allocation", "Structures"] },
          { module: "Module 2", title: "File Operations & OS Hooks", topics: ["File Handling", "Process Management", "Thread Basics"] }
        ],
        projects: [
          { title: "Custom Shell Implementation", desc: "Building a command-line interface from scratch in C." },
          { title: "Static Memory Manager", desc: "Custom implementation of malloc and free libraries." },
          { title: "Bank Transaction Ledger", desc: "File-based database system with concurrency control." },
          { title: "Embedded Traffic Controller", desc: "Low-level logic for managing intersection signals." },
          { title: "Scientific Calculator Engine", desc: "Parsing and evaluating complex mathematical expressions." },
          { title: "Game Engine Prototype", desc: "2D graphics rendering logic using low-level libraries." }
        ]
      },
      'Spring Framework': {
        duration: '4 Months', fees: '₹11,000',
        definition: "Master the standard Java framework for enterprise applications. Covers Spring Core, MVC, Security, and Microservices.",
        softwareRequirements: ['Spring Tool Suite', 'Maven', 'Redis', 'Postman'],
        syllabus: [
          { module: "Module 1", title: "Dependency Injection", topics: ["IoC Container", "Bean Lifecycle", "Config Options"] },
          { module: "Module 2", title: "Security & Auth", topics: ["Spring Security", "OAuth2", "SSO Integration"] }
        ],
        projects: [
          { title: "Enterprise Identity Manager", desc: "Unified authentication service for corporate applications." },
          { title: "Reactive Gateway Service", desc: "Non-blocking API gateway for high-throughput traffic." },
          { title: "Inventory Reconciliation Engine", desc: "Automated stock matching between ERP and Web Store." },
          { title: "Corporate Messaging System", desc: "Internal notification hub with WebSocket support." },
          { title: "Compliance Audit Tracker", desc: "Logging every sensitive action for regulatory review." },
          { title: "Performance Monitoring Dashboard", desc: "Real-time health check for microservices cluster." }
        ]
      },
      'MySQL': {
        duration: '2 Months', fees: '₹5,000',
        definition: "Learn relational database management using MySQL. Covers SQL queries, indexing, and database design optimization.",
        softwareRequirements: ['MySQL Server', 'MySQL Workbench'],
        syllabus: [
          { module: "Module 1", title: "SQL Fundamentals", topics: ["DDL", "DML", "Joins"] },
          { module: "Module 2", title: "Optimization", topics: ["Indexes", "Stored Procedures", "Triggers"] }
        ],
        projects: [
          { title: "Library Management Database", desc: "Complex schema for tracking books, members, and loans." },
          { title: "Retail Inventory System", desc: "Transactional database for handling sales and stock." },
          { title: "University Enrollment Schema", desc: "Mapping students, courses, faculty, and grades." },
          { title: "Hotel Reservation Engine", desc: "Managing room availability and booking conflicts." },
          { title: "E-Commerce Recommendation Database", desc: "Building tables for tracking user behavior and preferences." },
          { title: "CRM Data Warehouse", desc: "Storing and analyzing customer lifecycle data." }
        ]
      },
      'Oracle': {
        duration: '3 Months', fees: '₹8,500',
        definition: "Advanced Oracle Database Management. Master SQL, PL/SQL, database security, and performance tuning for enterprise clusters.",
        softwareRequirements: ['Oracle 19c', 'SQL Developer'],
        syllabus: [
          { module: "Module 1", title: "Advanced SQL", topics: ["Analytic Functions", "Hierarchical Queries", "Partitioning"] },
          { module: "Module 2", title: "PL/SQL Mastery", topics: ["Stored Procedures", "Triggers", "Cursor Management"] }
        ],
        projects: [
          { title: "Retail Data Warehouse", desc: "Enterprise schema for multi-branch retail history and analysis." },
          { title: "Automated Backup Manager", desc: "PL/SQL scripts for scheduled recovery and maintenance." },
          { title: "Financial Audit Trail", desc: "Advanced trigger-based logging for high-security banking rows." },
          { title: "Materialized Logistics Hub", desc: "Managing supply chain views and refresh schedules." },
          { title: "Enterprise Access Control", desc: "Complex role-based security and privilege management." },
          { title: "Performance Diagnostic tool", desc: "Analysis engine for slow queries and execution plans." }
        ]
      },
      'PostgreSQL': {
        duration: '3 Months', fees: '₹8,500',
        definition: "Master the world's most advanced open-source database. Focus on ACID compliance, JSONB, and geospatial data.",
        softwareRequirements: ['PostgreSQL 16', 'pgAdmin 4'],
        syllabus: [
          { module: "Module 1", title: "Relational Design", topics: ["Normalization", "Constraints", "Indexes"] },
          { module: "Module 2", title: "PostgreSQL Specifics", topics: ["PostGIS", "JSONB documents", "Full-text Search"] }
        ],
        projects: [
          { title: "Geospatial Delivery Tracker", desc: "Mapping routes and delivery zones using PostGIS." },
          { title: "Document-Relational Hybrid DB", desc: "Combining structured and JSONB data for flexible CMS." },
          { title: "Real-time Logging Cluster", desc: "Highly available database setup with replication." },
          { title: "Search Engine Backend", desc: "Utilizing TsVector and TsQuery for rapid text search." },
          { title: "IOT Metric Aggregator", desc: "Time-series data management and aggregation." },
          { title: "Identity Provider Store", desc: "High-performance storage for user session and auth keys." }
        ]
      },
      'Java programming': {
        duration: '4 Months', fees: '₹8,500',
        definition: "Comprehensive training in Core Java. Master OOPs, Exceptions, Multithreading, and the Foundations of Java ecosystem.",
        softwareRequirements: ['JDK 21', 'Eclipse/IntelliJ'],
        syllabus: [
          { module: "Module 1", title: "Core Architecture", topics: ["JVM Internals", "Memory Management", "Garbage Collection"] },
          { module: "Module 2", title: "Advanced Logic", topics: ["Streams API", "Multithreading", "Reflection API"] }
        ],
        projects: [
          { title: "ATM Interface Simulator", desc: "A logic-heavy console application with multi-user session management." },
          { title: "Smart Student Ledger", desc: "File-system based database for academic record management." },
          { title: "Custom Logging Framework", desc: "Thread-safe logging system for enterprise applications." },
          { title: "File Encryption Engine", desc: "Utility for securing files using AES algorithm in Java." },
          { title: "Quiz Engine Desktop App", desc: "Interactive GUI-based application using Swing and JDBC." },
          { title: "Library Resource Tracker", desc: "Object-oriented system for cataloging and loaning assets." }
        ]
      },
      'Advance Programming - Databases': {
        duration: '4 Months', fees: '₹11,500',
        definition: "Specialized bridge course between high-level programming and database optimization. Master JDBC, Hibernate, and Query performance.",
        softwareRequirements: ['JDK', 'PostgreSQL', 'Hibernate'],
        syllabus: [
          { module: "Module 1", title: "ORM Depth", topics: ["Session Management", "Caching Strategies", "Lazy Loading"] },
          { module: "Module 2", title: "Advanced Connectivity", topics: ["Connection Pooling", "Stored Proc Calls", "Mapping Profiles"] }
        ],
        projects: [
          { title: "Distributed Order Hub", desc: "Managing transactions across multiple database instances." },
          { title: "Database Migration Automator", desc: "Java utility for ETL processes between MySQL and Postgres." },
          { title: "Legacy Data Bridge Engine", desc: "Syncing physical stock records with digital tables." },
          { title: "Audit Trail Microservice", desc: "Dedicated service for tracking all database mutations." },
          { title: "Connection Pool Manager", desc: "Custom implementation of a database connection pooling library." },
          { title: "Schema Evolution Tracker", desc: "Version control for database migrations and rollbacks." }
        ]
      },
      'MERN Full Stack Development': {
        duration: '6 Months', fees: '₹12,500',
        definition: "Build modern web applications using MongoDB, Express, React, and Node.js. Focuses on JavaScript throughout the stack.",
        softwareRequirements: ['Node.js', 'MongoDB Atlas', 'VS Code', 'Postman'],
        syllabus: [
          { module: "Module 1", title: "Backend with Node & Express", topics: ["RESTful APIs", "JWT Auth", "Mongoose ORM"] },
          { module: "Module 2", title: "Frontend with React", topics: ["Hooks", "Redux Toolkit", "Tailwind CSS"] }
        ],
        projects: [
          { title: "Collaborative Task Manager", desc: "Real-time Trello clone with drag-and-drop." },
          { title: "Video Streaming Platform", desc: "Netflix-style app with video hosting and playback." },
          { title: "Food Delivery Dashboard", desc: "Customer and restaurant interfaces with live order tracking." },
          { title: "Real-time Auction Portal", desc: "Live bidding with price updates via WebSockets." },
          { title: "Healthcare Appointment Hub", desc: "Booking system with automated doctor schedule matching." },
          { title: "Global Freelance Market", desc: "Gig posting and hiring platform with payment escrow." }
        ]
      },
      'Development Course': {
        duration: '4 Months', fees: '₹8,500',
        definition: "A comprehensive course on modern software development life cycle, agile methodologies, and cross-platform tools.",
        softwareRequirements: ['Jira', 'Postman', 'Git', 'Docker'],
        syllabus: [
          { module: "Module 1", title: "Agile & DevOps", topics: ["Scrum Framework", "CI/CD Basics", "Unit Testing"] },
          { module: "Module 2", title: "System Integration", topics: ["API Design", "Middleware", "Environment Management"] }
        ],
        projects: [
          { title: "Agile Project Tracker", desc: "Kanban board implementation with sprint planning features." },
          { title: "Automated Bug Reporter", desc: "System that captures and logs runtime errors to a central database." },
          { title: "Software Release Automator", desc: "Scripts to handle versioning and deployment to staging." },
          { title: "Enterprise Service Bus", desc: "Communication layer between disparate software systems." },
          { title: "Developer Productivity Suite", desc: "Tool for tracking time and managing personal coding goals." },
          { title: "Legacy System Wrapper", desc: "API layer to modernize access to older software databases." }
        ]
      },
      'Frontend Development': {
        duration: '4 Months', fees: '₹9,500',
        definition: "Focus on building high-performance, accessible, and stunning user interfaces using modern JavaScript frameworks.",
        softwareRequirements: ['React/Next.js', 'Tailwind CSS', 'Figma', 'Chrome DevTools'],
        syllabus: [
          { module: "Module 1", title: "Core UI/UX", topics: ["Responsive Design", "Accessibility (A11y)", "State Management"] },
          { module: "Module 2", title: "Advanced Frameworks", topics: ["SSG & SSR", "React Hooks", "Component Libraries"] }
        ],
        projects: [
          { title: "High-Performance SaaS Dashboard", desc: "Stunning analytics interface with real-time data charts." },
          { title: "E-Commerce VR Showroom", desc: "Interactive web store featuring 3D product visualization." },
          { title: "Universal Design System", desc: "Building a reusable component library from scratch." },
          { title: "Social Media Feed Engine", desc: "Liquid smooth infinite scrolling with optimistic updates." },
          { title: "Interactive Portfolio Studio", desc: "Dynamic site builder for creative professionals." },
          { title: "Micro-Frontend Portal", desc: "Orchestrating multiple React apps into a single interface." }
        ]
      },
      'Backend Development': {
        duration: '4 Months', fees: '₹10,500',
        definition: "Master server-side logic, database management, and high-performance API development.",
        softwareRequirements: ['Node.js', 'Go', 'Redis', 'Docker', 'Kubernetes'],
        syllabus: [
          { module: "Module 1", title: "Server Architecture", topics: ["Load Balancing", "Microservices", "Caching"] },
          { module: "Module 2", title: "Security", topics: ["Encryption", "Authentication", "Rate Limiting"] }
        ],
        projects: [
          { title: "Distributed Authentication Service", desc: "High-security SSO provider for multi-app ecosystems." },
          { title: "Real-time Message Broker", desc: "Scalable pub/sub system for microservice communication." },
          { title: "Global CDN Edge Cache", desc: "Implementing intelligent data caching at the edge." },
          { title: "Large Scale Web Scraper", desc: "Distributed system to crawl and index thousands of pages." },
          { title: "Streaming Analytics Engine", desc: "Processing millions of events per second in real-time." },
          { title: "Hybrid SQL-v-NoSQL Bridge", desc: "Middleware for syncing relational and document data." }
        ]
      },
      'DSA Programming': {
        duration: '4 Months', fees: '₹10,000',
        definition: "Language-agnostic approach to mastering complex problem solving and algorithmic efficiency.",
        softwareRequirements: ['Whiteboard Tools', 'Python/Java/C++', 'Debugger'],
        syllabus: [
          { module: "Module 1", title: "Advanced Patterns", topics: ["Sliding Window", "Bit Manipulation", "Union Find"] },
          { module: "Module 2", title: "Interview Mastery", topics: ["Mock Interviews", "Complexity Analysis", "Optimization"] }
        ],
        projects: [
          { title: "Advanced Search Engine Library", desc: "Developing a Trie-based rapid lookup and autocomplete engine." },
          { title: "City Traffic Optimizer", desc: "Graph algorithms for calculating shortest paths in live city maps." },
          { title: "File Compression Suite", desc: "Implementing Huffman and LZW algorithms for storage saving." },
          { title: "Algorithmic Trading Bot", desc: "Applying DP and Greedy logic to financial data streams." },
          { title: "Memory Allocation Simulator", desc: "Designing complex heap and stack management logic." },
          { title: "Recursive Maze Solver", desc: "Visualization of backtracking and pathfinding algorithms." }
        ]
      },
      'Spring Boot': {
        duration: '4 Months', fees: '₹11,500',
        definition: "Specialized training on Spring Boot for building cloud-native, production-grade Java applications.",
        softwareRequirements: ['STS IDE', 'Maven', 'Docker', 'AWS'],
        syllabus: [
          { module: "Module 1", title: "Spring Ecosystem", topics: ["Spring Data", "Spring Security", "Spring Cloud"] },
          { module: "Module 2", title: "Enterprise Readiness", topics: ["Actuator", "Logging", "Containerization"] }
        ],
        projects: [
          { title: "Reactive Microservices Cluster", desc: "Fully asynchronous system with WebFlux and Netty." },
          { title: "Event-Driven Payment Gateway", desc: "Using Kafka for resilient and consistent payment flows." },
          { title: "Dynamic Cloud Config Server", desc: "Managing configurations for hundreds of service instances." },
          { title: "Enterprise Ledger Hub", desc: "Transparent transaction ledger for enterprise data auditing." },
          { title: "Self-Healing App Monitor", desc: "Automated service recovery and health check system." },
          { title: "Global Transaction Synchronizer", desc: "Handling distributed transactions across different DBs." }
        ]
      },
      'C DSA': {
        duration: '4 Months', fees: '₹9,000',
        definition: "Implementing fundamental data structures and algorithms from scratch using C for maximum performance.",
        softwareRequirements: ['GCC', 'GDB', 'Valgrind', 'VS Code'],
        syllabus: [
          { module: "Module 1", title: "Pointer-Based Structures", topics: ["Linked Lists", "Heaps", "Binary Trees"] },
          { module: "Module 2", title: "Algorithmic Efficiency", topics: ["Sort Logic", "Search Patterns", "Big O in C"] }
        ],
        projects: [
          { title: "Custom RAM File System", desc: "Implementing a virtual file storage in memory using C." },
          { title: "Low-level Process Scheduler", desc: "Building a task manager with priority queue logic." },
          { title: "Highly Optimized Hash Map", desc: "Collision resolution and rapid key-value storage in C." },
          { title: "B-Tree Database Indexer", desc: "Logic for managing large data indices on disk." },
          { title: "Thread-Safe Storage Library", desc: "Implementing mutex-protected data structures." },
          { title: "C-based Regex Engine", desc: "String pattern matching using Finite Automata logic." }
        ]
      }
    };

    // Add admin-added courses with rich fallbacks (only accepted ones)
    adminCourses.filter(c => c.status === 'accepted').forEach(course => {
      baseData[course.name] = {
        duration: course.duration,
        fees: course.fees,
        definition: course.description,
        softwareRequirements: ['Standard IDE', 'Postman', 'Git & GitHub', 'Terminal'],
        syllabus: [
          { module: "Module 1", title: "Core Architecture", topics: ["Introduction to Architecture", "Environment Setup", "Fundamentals"] },
          { module: "Module 2", title: "Implementation Logic", topics: ["Core Module Development", "Workflow Automation", "Security Implementation"] },
          { module: "Module 3", title: "Testing & Scalability", topics: ["Unit Testing", "Performance Optimization", "Production Ready Deployment"] }
        ],
        projects: [
          { title: `${course.name} Professional Capstone`, desc: `A complete industry-grade implementation of ${course.name} featuring modern standards.` },
          { title: "Industrial Case Study", desc: "Solving real-world organizational challenges using learned concepts." }
        ]
      };
    });

    return baseData;
  };

  const allCourses = generateExhaustiveData();

  const handleEnroll = (courseName) => {
    sessionStorage.setItem('preselectedCourse', courseName);
    navigate('/enroll');
  };

  const handleBackToGrid = () => {
    setSelectedCourse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedCourse) {
    const course = allCourses[selectedCourse.name] || {
      ...selectedCourse,
      definition: "Program details are being updated.",
      softwareRequirements: [],
      syllabus: [],
      projects: [],
      duration: "TBD",
      fees: "TBD"
    };
    return (
      <div className="course-detail-container">
        <style>{`
          .course-detail-container { 
            background-color: #f8fafc; 
            min-height: 100vh;
            padding-top: 20px;
          }
          .detail-nav-sticky {
            position: sticky;
            top: 140px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 15px 5%;
            border-bottom: 1px solid #e2e8f0;
            z-index: 100;
            max-width: 1400px;
            margin: 0 auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border-radius: 0 0 12px 12px;
          }
          .back-btn {
            background: transparent;
            color: #123e72;
            border: 1px solid #cbd5e1;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
          }
          .back-btn:hover {
            background: #123e72;
            color: white;
            border-color: #123e72;
          }
          .course-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
            color: white;
            padding: 80px 5%;
          }
          .hero-inner {
            max-width: 1200px;
            margin: 0 auto;
          }
          .course-hero h1 {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            color: white;
          }
          @media (max-width: 768px) {
            .course-hero h1 { font-size: 2rem; }
            .course-hero { padding: 40px 5%; }
          }
          @media (max-width: 480px) {
            .course-hero h1 { font-size: 1.7rem; }
            .meta-item { width: 100%; justify-content: center; }
          }
          .course-meta {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
          }
          .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            background: rgba(255,255,255,0.1);
            padding: 8px 16px;
            border-radius: 30px;
            font-size: 0.9rem;
          }
          .detail-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
            max-width: 1300px;
            margin: 0 auto;
            padding: 60px 5%;
          }
          .section-heading {
            font-size: 1.8rem;
            color: #123e72;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .overview-text {
            color: #475569;
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 40px;
          }
          .module-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            transition: all 0.3s;
          }
          .module-card:hover {
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
            border-color: #bfdbfe;
          }
          .mod-tag {
            background: #eff6ff;
            color: #2563eb;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 700;
            display: inline-block;
            margin-bottom: 12px;
          }
          .mod-title {
            font-size: 1.25rem;
            color: #0f172a;
            margin-bottom: 16px;
          }
          .topic-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
            list-style: none;
            padding: 0;
          }
          .topic-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #64748b;
            font-size: 0.95rem;
          }
          .topic-item::before {
            content: '';
            width: 6px; height: 6px;
            background: #3b82f6;
            border-radius: 50%;
          }
          .project-card {
            background: white;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            border-radius: 0 8px 8px 0;
            margin-bottom: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          }
          .project-card h4 {
            color: #0f172a;
            font-size: 1.1rem;
            margin-bottom: 8px;
          }
          .project-card p {
            color: #64748b;
            font-size: 0.95rem;
            margin: 0;
          }
          .sidebar-card {
            background: white;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
            position: sticky;
            top: 150px;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
            border-bottom: 1px solid #f1f5f9;
            color: #475569;
          }
          .summary-val {
            font-weight: 700;
            color: #0f172a;
          }
          .price-tag {
            font-size: 2rem;
            font-weight: 800;
            color: #2563eb;
            margin: 20px 0;
            display: block;
          }
          .tools-cloud {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
          }
          .tool-badge {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            color: #475569;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
          }
          .btn-solid-enroll {
            width: 100%;
            background: #2563eb;
            color: white;
            padding: 16px;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 700;
            border: none;
            margin-top: 30px;
            cursor: pointer;
            transition: all 0.3s;
          }
          .btn-solid-enroll:hover {
            background: #1d4ed8;
            box-shadow: 0 10px 20px -5px rgba(37,99,235,0.3);
          }
          @media (max-width: 992px) {
            .detail-grid { grid-template-columns: 1fr; }
            .sidebar-card { position: static; margin-top: 40px; }
          }
        `}</style>

        <div className="detail-nav-sticky">
          <button className="back-btn" onClick={handleBackToGrid}>
            <ArrowLeft size={18} /> Back to Courses
          </button>
        </div>

        <div className="course-hero">
          <div className="hero-inner fade-in">
            <h1>{selectedCourse.name} Professional Training</h1>
            <div className="course-meta">
              <div className="meta-item"><Clock size={18} /> {course.duration}</div>
              <div className="meta-item"><MapPin size={18} /> {location}</div>
              <div className="meta-item"><Briefcase size={18} /> Professional Certification</div>
            </div>
          </div>
        </div>

        <div className="detail-grid fade-in">
          <div>
            <section style={{ marginBottom: '60px' }}>
              <h2 className="section-heading">Course Overview</h2>
              <p className="overview-text">{course.definition}</p>
            </section>

            <section style={{ marginBottom: '60px' }}>
              <h2 className="section-heading">Industrial Syllabus</h2>
              {course.syllabus.map((mod, i) => (
                <div key={i} className="module-card">
                  <div className="mod-tag">{mod.module}</div>
                  <h3 className="mod-title">{mod.title}</h3>
                  <ul className="topic-list">
                    {mod.topics.map((topic, j) => (
                      <li key={j} className="topic-item">{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <h2 className="section-heading">Real-Time Industry Projects</h2>
              {course.projects.map((p, i) => (
                <div key={i} className="project-card">
                  <h4>Project {i + 1}: {p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </section>
          </div>

          <div>
            <div className="sidebar-card">
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '20px' }}>Program Details</h3>

              <span className="price-tag">{course.fees}</span>

              <div className="summary-row">
                <span>Duration</span>
                <span className="summary-val">{course.duration}</span>
              </div>
              <div className="summary-row">
                <span>Location</span>
                <span className="summary-val">{location}</span>
              </div>
              <div className="summary-row">
                <span>Mode</span>
                <span className="summary-val">{workMode}</span>
              </div>

              <h4 style={{ marginTop: '24px', color: '#0f172a' }}>Tools & Technologies</h4>
              <div className="tools-cloud">
                {course.softwareRequirements.map((s, i) => (
                  <span key={i} className="tool-badge">{s}</span>
                ))}
              </div>

              <button className="btn-solid-enroll" onClick={() => handleEnroll(selectedCourse.name)}>
                Enroll in Program
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <style>{`
        .course-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          margin-top: 40px;
        }
        @media (max-width: 480px) {
          .course-grid-container {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 0 10px;
          }
        }
        .course-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .course-card:hover {
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1);
          border-color: #bfdbfe;
        }
        .card-top {
          display: flex;
          justify-content: space-between;
          padding: 24px;
          background: linear-gradient(to right, #f8fafc, white);
        }
        .card-top-left {
          flex: 1;
        }
        .card-logo {
          width: 55px;
          height: 55px;
          object-fit: contain;
          border-radius: 10px;
          background: white;
          border: 1px solid #f1f5f9;
          padding: 6px;
        }
        .paid-tag {
          background: #d97706;
          color: white;
          padding: 3px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 12px;
          text-transform: capitalize;
        }
        .course-title-card {
          font-size: 1.25rem;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .company-subtitle {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }
        .card-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 0 24px;
        }
        .card-middle {
          padding: 24px;
          flex-grow: 1;
        }
        .info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #334155;
          font-size: 0.95rem;
          margin-bottom: 12px;
        }
        .i-icon {
          color: #0f172a;
        }
        .info-row strong {
          color: #0f172a;
          margin-right: 4px;
        }
        .card-desc {
          margin-top: 16px;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #475569;
        }
        .card-bottom {
          padding: 20px 24px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        .view-btn {
          background: white;
          color: #2563eb;
          border: 1px solid #cbd5e1;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .view-btn:hover {
          border-color: #2563eb;
        }
      `}</style>

      <h1 className="section-title">Professional Training Programs</h1>
      <p className="section-subtitle">
        Explore our exhaustive catalog of industry-ready programs. Built for professionals who demand excellence.
      </p>

      <div className="course-grid-container">
        {Object.keys(allCourses).map((courseName) => (
          <div key={courseName} className="course-card">
            <div className="card-top">
              <div className="card-top-left">
                <span className="paid-tag">Paid</span>
                <h3 className="course-title-card">{courseName}</h3>
                <p className="company-subtitle">at {companyName}</p>
              </div>
              <div className="card-top-right">
                <img src="/logo.jpg" alt="Logo" className="card-logo" />
              </div>
            </div>

            <div className="card-divider"></div>

            <div className="card-middle">
              <div className="info-row">
                <MapPin size={16} className="i-icon" />
                <strong>Internship Location:</strong> {location}
              </div>
              <div className="info-row">
                <Monitor size={16} className="i-icon" />
                <strong>Work mode:</strong> {workMode}
              </div>
              <div className="info-row">
                <Clock size={16} className="i-icon" />
                <strong>Duration:</strong> {allCourses[courseName].duration}
              </div>
              <div className="info-row">
                <span className="info-row-fees" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: 800 }}>₹</span>
                  <strong>Fees:</strong> {allCourses[courseName].fees}
                </span>
              </div>

              <p className="card-desc">
                {allCourses[courseName].definition.substring(0, 110)}...
              </p>
            </div>

            <div className="card-bottom">
              <button
                className="view-btn"
                onClick={() => {
                  setSelectedCourse({ name: courseName });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
