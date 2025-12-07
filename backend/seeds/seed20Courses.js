import mongoose from "mongoose";
import Course from "../models/course.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const seed20Courses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Find or create admin user
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.log("Creating admin user...");
      admin = await User.create({
        name: "ElevateU Admin",
        email: "admin@elevatu.com",
        password: "admin123",
        role: "admin",
      });
    }

    const courses20 = [
      // ========== TECH - WEB DEVELOPMENT ==========
      {
        title: "React.js Complete Masterclass 2024",
        description:
          "Complete guide to building modern React applications with hooks, context, and state management. Learn component design patterns, optimization techniques, and build real-world projects.",
        thumbnail:
          "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
        price: 49.99,
        level: "Intermediate",
        category: "Tech",
        subcategory: "Web Development",
        tags: ["React", "JavaScript", "Frontend", "Hooks"],
        videoPlaylistLinks: [
          {
            title: "React Basics Tutorial",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
          {
            title: "Advanced React Patterns",
            url: "https://www.youtube.com/playlist?list=PLC3y8-rFHvwgWTSrDiwXznuJiZIbOxvX7",
          },
        ],
        documentationLinks: [
          { title: "React Docs", url: "https://react.dev" },
          { title: "React Router Docs", url: "https://reactrouter.com" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "React Fundamentals",
            description: "JSX, Components, Props, State",
            resources: ["JSX", "Components", "Props", "State"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Hooks & Effects",
            description: "useState, useEffect, useContext, Custom Hooks",
            resources: ["Hooks", "Effects", "Context"],
            duration: "1 week",
          },
          {
            stepNumber: 3,
            title: "State Management",
            description: "Redux, Redux Toolkit, Zustand",
            resources: ["Redux", "Redux Toolkit", "State"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "Real-world Projects",
            description: "Build 3 production-ready apps",
            resources: ["Projects", "Best Practices"],
            duration: "2 weeks",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Node.js & Express Backend Development",
        description:
          "Build scalable backend applications with Node.js and Express. Learn RESTful APIs, middleware, authentication, and database integration.",
        thumbnail:
          "https://images.unsplash.com/photo-1627873649417-ad8f26420eb1?w=500&h=300&fit=crop",
        price: 54.99,
        level: "Intermediate",
        category: "Tech",
        subcategory: "Web Development",
        tags: ["Node.js", "Express", "Backend", "API"],
        videoPlaylistLinks: [
          {
            title: "Node.js Crash Course",
            url: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbljtBitHl5V-r42W49CW-2V",
          },
          {
            title: "Express.js Tutorial",
            url: "https://www.youtube.com/playlist?list=PLYQSYpPSrQwNnH87D8-NKzCUC0MpWAHlw",
          },
        ],
        documentationLinks: [
          { title: "Node.js Docs", url: "https://nodejs.org/docs" },
          { title: "Express Docs", url: "https://expressjs.com" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Node.js Basics",
            description: "Modules, Events, Streams",
            resources: ["Modules", "Events", "Streams"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Express Framework",
            description: "Routing, Middleware, Error Handling",
            resources: ["Routing", "Middleware"],
            duration: "1 week",
          },
          {
            stepNumber: 3,
            title: "Databases",
            description: "MongoDB, SQL, Mongoose, Sequelize",
            resources: ["MongoDB", "SQL", "ORM"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "Authentication & Security",
            description: "JWT, OAuth, Bcrypt",
            resources: ["JWT", "OAuth", "Security"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Full Stack Web Development with MERN",
        description:
          "Complete full-stack development course using MongoDB, Express, React, and Node.js. Build and deploy complete web applications.",
        thumbnail:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
        price: 79.99,
        level: "Advanced",
        category: "Tech",
        subcategory: "Web Development",
        tags: ["MERN", "Full Stack", "React", "Node.js"],
        videoPlaylistLinks: [
          {
            title: "MERN Stack Complete",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
        ],
        documentationLinks: [
          {
            title: "MERN Stack Guide",
            url: "https://www.mongodb.com/languages/mern-stack",
          },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Frontend Setup",
            description: "React, Redux, Tailwind CSS",
            resources: ["React", "Redux", "CSS"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Backend Setup",
            description: "Node.js, Express, MongoDB",
            resources: ["Node", "Express", "MongoDB"],
            duration: "1 week",
          },
          {
            stepNumber: 3,
            title: "Integration",
            description: "APIs, Authentication, Real-time",
            resources: ["REST API", "Auth", "WebSocket"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "Deployment",
            description: "Heroku, Vercel, AWS",
            resources: ["Deployment", "CI/CD"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Machine Learning with Python from Scratch",
        description:
          "Master machine learning fundamentals with Python. Learn supervised and unsupervised learning, model evaluation, and real-world projects.",
        thumbnail:
          "https://images.unsplash.com/photo-1677442d019cecf8b13b3c6f0be3b9ef?w=500&h=300&fit=crop",
        price: 59.99,
        level: "Intermediate",
        category: "Tech",
        subcategory: "AI / ML",
        tags: ["Python", "ML", "Scikit-learn", "Data Science"],
        videoPlaylistLinks: [
          {
            title: "Machine Learning Tutorial",
            url: "https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYB_RGVnqlNQQoGrne",
          },
          {
            title: "Scikit-learn Complete Guide",
            url: "https://www.youtube.com/playlist?list=PLQVvvDA0OjdlLfn6KOyT4mJw0pLlT0Gpt",
          },
        ],
        documentationLinks: [
          { title: "Scikit-learn Docs", url: "https://scikit-learn.org" },
          {
            title: "Python ML Guide",
            url: "https://www.kaggle.com/learn/machine-learning",
          },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Python Basics",
            description: "NumPy, Pandas, Matplotlib",
            resources: ["NumPy", "Pandas", "Visualization"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Supervised Learning",
            description: "Regression, Classification",
            resources: ["Linear Regression", "SVM", "Trees"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "Unsupervised Learning",
            description: "Clustering, Dimensionality",
            resources: ["K-Means", "PCA"],
            duration: "1 week",
          },
          {
            stepNumber: 4,
            title: "Model Deployment",
            description: "Flask, Docker, Cloud",
            resources: ["Flask", "Docker", "Deployment"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Deep Learning & Neural Networks",
        description:
          "Advanced deep learning course covering CNNs, RNNs, transformers, and GANs. Build state-of-the-art computer vision and NLP models.",
        thumbnail:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop",
        price: 69.99,
        level: "Advanced",
        category: "Tech",
        subcategory: "AI / ML",
        tags: ["Deep Learning", "TensorFlow", "PyTorch", "Neural Networks"],
        videoPlaylistLinks: [
          {
            title: "Deep Learning Complete",
            url: "https://www.youtube.com/playlist?list=PLKnIA16_RmvbqLmSopt-MSF5Z63xREKKJ",
          },
          {
            title: "TensorFlow & Keras",
            url: "https://www.youtube.com/playlist?list=PLqnslrQVBMcq3jHGX7MnBNzIR-XQ--pnJ",
          },
        ],
        documentationLinks: [
          { title: "TensorFlow Docs", url: "https://tensorflow.org" },
          { title: "PyTorch Docs", url: "https://pytorch.org" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Neural Network Basics",
            description: "Perceptron, Backprop, Activation",
            resources: ["Perceptron", "Backprop"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "CNNs for Vision",
            description: "Image Classification, Object Detection",
            resources: ["CNN", "ResNet", "YOLO"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "RNNs & Transformers",
            description: "LSTM, GRU, Attention, BERT",
            resources: ["RNN", "Transformer", "Attention"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "Advanced Projects",
            description: "GANs, Transfer Learning",
            resources: ["GAN", "Transfer Learning"],
            duration: "2 weeks",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Cybersecurity Essentials & Ethical Hacking",
        description:
          "Comprehensive cybersecurity course covering network security, encryption, penetration testing, and ethical hacking principles.",
        thumbnail:
          "https://images.unsplash.com/photo-1550439062-609e7e7316cb?w=500&h=300&fit=crop",
        price: 54.99,
        level: "Beginner",
        category: "Tech",
        subcategory: "Cybersecurity",
        tags: ["Security", "Hacking", "Network", "Encryption"],
        videoPlaylistLinks: [
          {
            title: "Cybersecurity Basics",
            url: "https://www.youtube.com/playlist?list=PLSIUOFhnxEiCWGsN9t5A9Yw32CJZZezCP",
          },
          {
            title: "Ethical Hacking Intro",
            url: "https://www.youtube.com/playlist?list=PLBf0hzazHTGOEuhPQSnq-Ej8jRyXxfYvl",
          },
        ],
        documentationLinks: [
          { title: "OWASP Top 10", url: "https://owasp.org/top10" },
          {
            title: "Security Best Practices",
            url: "https://www.nist.gov/cybersecurity",
          },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Networking Fundamentals",
            description: "TCP/IP, DNS, HTTP, HTTPS",
            resources: ["TCP/IP", "DNS", "Protocols"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Cryptography",
            description: "Encryption, Hashing, SSL/TLS",
            resources: ["Encryption", "Hashing", "SSL"],
            duration: "1 week",
          },
          {
            stepNumber: 3,
            title: "Penetration Testing",
            description: "Scanning, Exploitation, Reporting",
            resources: ["Nmap", "Metasploit"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "Web Security",
            description: "SQL Injection, XSS, CSRF",
            resources: ["OWASP", "Burp Suite"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Data Analytics with Python & SQL",
        description:
          "Learn data analysis and visualization using Python, SQL, and Power BI. Extract insights from data and create compelling visualizations.",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        price: 44.99,
        level: "Beginner",
        category: "Tech",
        subcategory: "Data Analytics",
        tags: ["Data Analysis", "SQL", "Python", "Visualization"],
        videoPlaylistLinks: [
          {
            title: "Data Analytics with Python",
            url: "https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYB_RGVnqlNQQoGrne",
          },
          {
            title: "SQL Complete Tutorial",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
        ],
        documentationLinks: [
          { title: "Pandas Docs", url: "https://pandas.pydata.org" },
          { title: "SQL Tutorial", url: "https://www.w3schools.com/sql" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "SQL Fundamentals",
            description: "SELECT, WHERE, JOIN, GROUP BY",
            resources: ["SQL Queries", "Databases"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Python Data Analysis",
            description: "Pandas, NumPy, Data Cleaning",
            resources: ["Pandas", "NumPy", "Cleaning"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "Visualization",
            description: "Matplotlib, Seaborn, Power BI",
            resources: ["Matplotlib", "Seaborn", "BI"],
            duration: "1 week",
          },
          {
            stepNumber: 4,
            title: "Real Projects",
            description: "Business intelligence dashboards",
            resources: ["Dashboards", "Reports"],
            duration: "2 weeks",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "DevOps & Docker Kubernetes Mastery",
        description:
          "Complete DevOps course covering Docker, Kubernetes, CI/CD pipelines, and cloud deployment on AWS and GCP.",
        thumbnail:
          "https://images.unsplash.com/photo-1587148882107-e7e86da1e2f9?w=500&h=300&fit=crop",
        price: 64.99,
        level: "Advanced",
        category: "Tech",
        subcategory: "DevOps",
        tags: ["Docker", "Kubernetes", "DevOps", "CI/CD"],
        videoPlaylistLinks: [
          {
            title: "Docker Complete Course",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
          {
            title: "Kubernetes Tutorial",
            url: "https://www.youtube.com/playlist?list=PLLNulKxsrxJbQ4DnD3fHfzJ8vKXAQK_mj",
          },
        ],
        documentationLinks: [
          { title: "Docker Docs", url: "https://docs.docker.com" },
          { title: "Kubernetes Docs", url: "https://kubernetes.io/docs" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Docker Basics",
            description: "Images, Containers, Docker Compose",
            resources: ["Docker", "Compose"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Kubernetes",
            description: "Pods, Services, Deployments",
            resources: ["K8s", "Deployments"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "CI/CD Pipelines",
            description: "Jenkins, GitLab CI, GitHub Actions",
            resources: ["CI/CD", "Automation"],
            duration: "1 week",
          },
          {
            stepNumber: 4,
            title: "Cloud Deployment",
            description: "AWS, GCP, Azure",
            resources: ["AWS", "Cloud"],
            duration: "2 weeks",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Professional Communication & Public Speaking",
        description:
          "Master effective communication skills for career success. Learn public speaking, presentation skills, and interpersonal communication.",
        thumbnail:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
        price: 29.99,
        level: "Beginner",
        category: "Non-Tech",
        subcategory: "Communication Skills",
        tags: ["Communication", "Speaking", "Presentation"],
        videoPlaylistLinks: [
          {
            title: "Public Speaking Tips",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
        ],
        documentationLinks: [
          {
            title: "Communication Guide",
            url: "https://www.mindtools.com/pages/article/newCS_97.htm",
          },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Basics of Communication",
            description: "Listening, Speaking, Body Language",
            resources: ["Listening", "Speaking"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Public Speaking",
            description: "Presentation, Confidence, Delivery",
            resources: ["Presentation", "Confidence"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "Professional Writing",
            description: "Email, Reports, Proposals",
            resources: ["Writing", "Reports"],
            duration: "1 week",
          },
          {
            stepNumber: 4,
            title: "Leadership Communication",
            description: "Team interaction, Negotiation",
            resources: ["Leadership", "Negotiation"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Personal Finance & Investment Strategies",
        description:
          "Complete guide to personal finance, investing, and wealth management. Learn stock market, mutual funds, and financial planning.",
        thumbnail:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
        price: 34.99,
        level: "Beginner",
        category: "Non-Tech",
        subcategory: "Finance for beginners",
        tags: ["Finance", "Investment", "Wealth"],
        videoPlaylistLinks: [
          {
            title: "Finance Fundamentals",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
          {
            title: "Stock Market 101",
            url: "https://www.youtube.com/playlist?list=PL-wAqhfQnNVDJJcXEqnuNEVQiLLiLjyJ4",
          },
        ],
        documentationLinks: [
          { title: "Investopedia", url: "https://www.investopedia.com" },
          { title: "Financial Literacy", url: "https://www.investor.gov" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Financial Basics",
            description: "Budgeting, Saving, Emergency Fund",
            resources: ["Budget", "Saving"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Investment Fundamentals",
            description: "Stocks, Bonds, Mutual Funds",
            resources: ["Stocks", "Bonds"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "Stock Market Investing",
            description: "Trading, Analysis, Strategies",
            resources: ["Trading", "Analysis"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "Financial Planning",
            description: "Retirement, Insurance, Taxes",
            resources: ["Retirement", "Planning"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Business Analytics & Data-Driven Decisions",
        description:
          "Learn to analyze business data, create reports, and make data-driven decisions. Includes Excel, Tableau, and business metrics.",
        thumbnail:
          "https://images.unsplash.com/photo-1516321318423-f06f70504c07?w=500&h=300&fit=crop",
        price: 39.99,
        level: "Intermediate",
        category: "Non-Tech",
        subcategory: "Business Analytics",
        tags: ["Analytics", "Business", "Excel", "Tableau"],
        videoPlaylistLinks: [
          {
            title: "Business Analytics Course",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
        ],
        documentationLinks: [
          {
            title: "Tableau Docs",
            url: "https://www.tableau.com/learn/tutorials",
          },
          {
            title: "Excel Guide",
            url: "https://support.microsoft.com/en-us/excel",
          },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Excel Mastery",
            description: "Advanced formulas, Pivot Tables",
            resources: ["Excel", "Formulas"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Data Visualization",
            description: "Tableau, Power BI",
            resources: ["Tableau", "BI"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "Business Metrics",
            description: "KPIs, ROI, Performance Analysis",
            resources: ["KPI", "Metrics"],
            duration: "1 week",
          },
          {
            stepNumber: 4,
            title: "Reporting & Insights",
            description: "Dashboards, Presentations",
            resources: ["Reporting", "Insights"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Human Resources & Recruitment Management",
        description:
          "Complete HR course covering recruitment, employee relations, performance management, and organizational development.",
        thumbnail:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
        price: 34.99,
        level: "Intermediate",
        category: "Non-Tech",
        subcategory: "HR Skills",
        tags: ["HR", "Recruitment", "Management"],
        videoPlaylistLinks: [
          {
            title: "HR Management Course",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
        ],
        documentationLinks: [
          {
            title: "HR Best Practices",
            url: "https://www.shrm.org/resourcesandtools",
          },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "HR Fundamentals",
            description: "Recruitment, Selection, Onboarding",
            resources: ["Recruitment", "Selection"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Employee Relations",
            description: "Engagement, Culture, Retention",
            resources: ["Culture", "Engagement"],
            duration: "1 week",
          },
          {
            stepNumber: 3,
            title: "Performance Management",
            description: "Appraisals, Feedback, Development",
            resources: ["Appraisals", "Feedback"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "Compliance & Legal",
            description: "Labor Laws, Compliance, Ethics",
            resources: ["Compliance", "Legal"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Mobile App Development with Flutter",
        description:
          "Build cross-platform mobile applications using Flutter and Dart. Create beautiful, fast, and native-feeling apps.",
        thumbnail:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
        price: 49.99,
        level: "Intermediate",
        category: "Tech",
        subcategory: "Mobile App Development",
        tags: ["Flutter", "Mobile", "Dart", "App Development"],
        videoPlaylistLinks: [
          {
            title: "Flutter Complete Course",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
        ],
        documentationLinks: [
          { title: "Flutter Docs", url: "https://flutter.dev/docs" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Dart Fundamentals",
            description: "Syntax, OOP, Async Programming",
            resources: ["Dart", "OOP"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Flutter Basics",
            description: "Widgets, State Management, UI",
            resources: ["Widgets", "State"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "Advanced Flutter",
            description: "Navigation, HTTP, Database",
            resources: ["Navigation", "API"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "App Deployment",
            description: "App Store, Play Store",
            resources: ["Deployment", "Publishing"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Cloud Computing with AWS",
        description:
          "Master Amazon Web Services. Learn EC2, S3, Lambda, RDS, and build scalable cloud applications.",
        thumbnail:
          "https://images.unsplash.com/photo-1667482747291-c1d3e06e0dfa?w=500&h=300&fit=crop",
        price: 59.99,
        level: "Intermediate",
        category: "Tech",
        subcategory: "Cloud",
        tags: ["AWS", "Cloud", "Serverless"],
        videoPlaylistLinks: [
          {
            title: "AWS Fundamentals",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
        ],
        documentationLinks: [
          { title: "AWS Documentation", url: "https://docs.aws.amazon.com" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "AWS Basics",
            description: "EC2, S3, IAM, VPC",
            resources: ["EC2", "S3", "Security"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Databases",
            description: "RDS, DynamoDB, ElastiCache",
            resources: ["Databases", "Caching"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "Serverless",
            description: "Lambda, API Gateway, SNS",
            resources: ["Lambda", "Serverless"],
            duration: "1 week",
          },
          {
            stepNumber: 4,
            title: "Advanced Architecture",
            description: "Auto-scaling, Load Balancing",
            resources: ["Architecture", "Scaling"],
            duration: "2 weeks",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Blockchain & Web3 Development",
        description:
          "Learn blockchain technology, smart contracts, DeFi, and develop Web3 applications using Solidity and Ethereum.",
        thumbnail:
          "https://images.unsplash.com/photo-1522066401248-010f-4c9a85b7?w=500&h=300&fit=crop",
        price: 69.99,
        level: "Advanced",
        category: "Tech",
        subcategory: "Blockchain",
        tags: ["Blockchain", "Solidity", "Web3", "Smart Contracts"],
        videoPlaylistLinks: [
          {
            title: "Blockchain Fundamentals",
            url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
          },
        ],
        documentationLinks: [
          {
            title: "Ethereum Docs",
            url: "https://ethereum.org/en/developers/docs",
          },
          { title: "Solidity Docs", url: "https://docs.soliditylang.org" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Blockchain Basics",
            description: "Distributed Ledger, Cryptography",
            resources: ["Blockchain", "Crypto"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Smart Contracts",
            description: "Solidity, Ethereum, Gas Optimization",
            resources: ["Solidity", "Contracts"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "DeFi Protocols",
            description: "DEX, Staking, Lending",
            resources: ["DeFi", "Protocols"],
            duration: "2 weeks",
          },
          {
            stepNumber: 4,
            title: "Web3 Apps",
            description: "Web3.js, Hardhat, Deployment",
            resources: ["Web3.js", "Tools"],
            duration: "2 weeks",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
    ];

    // Clear existing courses
    await Course.deleteMany({});
    console.log("Cleared existing courses");

    // Insert all courses
    const created = await Course.insertMany(courses20);
    console.log(`Successfully created ${created.length} courses!`);

    console.log("\nCOURSE SUMMARY:");
    console.log("================");
    const techCourses = created.filter((c) => c.category === "Tech").length;
    const nonTechCourses = created.filter(
      (c) => c.category === "Non-Tech"
    ).length;
    console.log(`Tech Courses: ${techCourses}`);
    console.log(`Non-Tech Courses: ${nonTechCourses}`);
    console.log(`Total Price Range: $29.99 - $79.99`);
    console.log(
      `Total Revenue Potential: $${created
        .reduce((sum, c) => sum + c.price, 0)
        .toFixed(2)}`
    );

    console.log("\nCOURSES CREATED:");
    created.forEach((course) => {
      console.log(`  - ${course.title} ($${course.price}) - ${course.level}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
};

seed20Courses();
