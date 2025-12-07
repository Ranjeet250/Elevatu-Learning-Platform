import mongoose from "mongoose";
import Course from "../models/course.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Find an admin user
    let admin = await User.findOne({ role: "admin" });
    
    if (!admin) {
      console.log("No admin user found. Creating one...");
      admin = await User.create({
        name: "Admin User",
        email: "admin@elevatu.com",
        password: "admin123", // Will be hashed by pre-save hook
        role: "admin",
      });
    }

    const sampleCourses = [
      {
        title: "Advanced Web Development with React",
        description: "Learn advanced React concepts including hooks, context API, and performance optimization. Build production-ready applications.",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300",
        price: 49.99,
        level: "Advanced",
        category: "Tech",
        subcategory: "Web Development",
        tags: ["React", "JavaScript", "Frontend"],
        videoPlaylistLinks: [
          { title: "React Advanced Patterns", url: "https://youtube.com/playlist?list=advanced-react" },
          { title: "Performance Optimization", url: "https://youtube.com/playlist?list=react-perf" },
        ],
        documentationLinks: [
          { title: "React Documentation", url: "https://react.dev" },
          { title: "Redux Documentation", url: "https://redux.js.org" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "React Hooks Deep Dive",
            description: "Master useState, useEffect, useContext, and custom hooks",
            resources: ["useState", "useEffect", "useContext", "Custom Hooks"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "State Management with Redux",
            description: "Learn Redux, Redux Toolkit, and state management patterns",
            resources: ["Redux", "Redux Toolkit", "Middleware", "Thunks"],
            duration: "1 week",
          },
          {
            stepNumber: 3,
            title: "Performance Optimization",
            description: "Optimize React applications for better performance",
            resources: ["Memoization", "Code Splitting", "Lazy Loading", "Bundle Analysis"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Machine Learning Fundamentals",
        description: "Master the fundamentals of machine learning including supervised and unsupervised learning algorithms.",
        thumbnail: "https://images.unsplash.com/photo-1677442d019cecf8b13b3c6f0be3b9ef?w=400&h=300",
        price: 59.99,
        level: "Intermediate",
        category: "Tech",
        subcategory: "AI / ML",
        tags: ["Python", "ML", "Data Science"],
        videoPlaylistLinks: [
          { title: "ML Algorithms Explained", url: "https://youtube.com/playlist?list=ml-algorithms" },
        ],
        documentationLinks: [
          { title: "Scikit-learn Guide", url: "https://scikit-learn.org" },
          { title: "TensorFlow Docs", url: "https://tensorflow.org" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Python for ML",
            description: "Learn Python libraries essential for machine learning",
            resources: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Supervised Learning",
            description: "Master regression and classification algorithms",
            resources: ["Linear Regression", "Logistic Regression", "Decision Trees", "SVM"],
            duration: "2 weeks",
          },
          {
            stepNumber: 3,
            title: "Unsupervised Learning",
            description: "Learn clustering and dimensionality reduction",
            resources: ["K-Means", "Hierarchical Clustering", "PCA", "T-SNE"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Cybersecurity Essentials",
        description: "Comprehensive guide to cybersecurity, covering network security, encryption, and ethical hacking.",
        thumbnail: "https://images.unsplash.com/photo-1550439062-609e7e7316cb?w=400&h=300",
        price: 54.99,
        level: "Beginner",
        category: "Tech",
        subcategory: "Cybersecurity",
        tags: ["Security", "Networking", "Encryption"],
        videoPlaylistLinks: [
          { title: "Cybersecurity Basics", url: "https://youtube.com/playlist?list=cyber-basics" },
        ],
        documentationLinks: [
          { title: "OWASP Top 10", url: "https://owasp.org/top10" },
          { title: "Security Best Practices", url: "https://www.acm.org/security" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Networking Fundamentals",
            description: "Understand TCP/IP, DNS, and networking protocols",
            resources: ["TCP/IP", "DNS", "HTTP", "HTTPS"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Encryption & Cryptography",
            description: "Learn encryption algorithms and secure communication",
            resources: ["Symmetric Encryption", "Asymmetric Encryption", "Hashing", "SSL/TLS"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Data Analytics with Python",
        description: "Learn data analysis, visualization, and insights using Python libraries.",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300",
        price: 44.99,
        level: "Beginner",
        category: "Tech",
        subcategory: "Data Analytics",
        tags: ["Python", "Data Analysis", "Visualization"],
        videoPlaylistLinks: [
          { title: "Data Analytics Course", url: "https://youtube.com/playlist?list=data-analytics" },
        ],
        documentationLinks: [
          { title: "Pandas Documentation", url: "https://pandas.pydata.org" },
          { title: "Matplotlib Guide", url: "https://matplotlib.org" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Data Exploration with Pandas",
            description: "Master data loading, cleaning, and manipulation",
            resources: ["DataFrame", "Data Cleaning", "Groupby", "Merging"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Data Visualization",
            description: "Create compelling visualizations with Matplotlib and Seaborn",
            resources: ["Matplotlib", "Seaborn", "Plotly", "Interactive Viz"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Professional Communication Skills",
        description: "Enhance your communication abilities for career success in any field.",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300",
        price: 29.99,
        level: "Beginner",
        category: "Non-Tech",
        subcategory: "Communication Skills",
        tags: ["Communication", "Professional", "Development"],
        videoPlaylistLinks: [
          { title: "Communication Masterclass", url: "https://youtube.com/playlist?list=comm-skills" },
        ],
        documentationLinks: [
          { title: "Communication Tips", url: "https://www.example.com/comm-tips" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Effective Listening",
            description: "Learn active listening and empathetic communication",
            resources: ["Active Listening", "Empathy", "Feedback", "Body Language"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Professional Writing",
            description: "Master business emails, reports, and presentations",
            resources: ["Email Etiquette", "Report Writing", "Presentations", "Tone"],
            duration: "1 week",
          },
        ],
        instructor: admin._id,
        isPublished: true,
      },
      {
        title: "Finance for Beginners",
        description: "Understand personal finance, investing, and wealth management basics.",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300",
        price: 34.99,
        level: "Beginner",
        category: "Non-Tech",
        subcategory: "Finance for beginners",
        tags: ["Finance", "Investment", "Wealth"],
        videoPlaylistLinks: [
          { title: "Finance Basics", url: "https://youtube.com/playlist?list=finance-basics" },
        ],
        documentationLinks: [
          { title: "Investment Guide", url: "https://www.investopedia.com" },
        ],
        roadmapSteps: [
          {
            stepNumber: 1,
            title: "Financial Basics",
            description: "Learn budgeting, saving, and emergency funds",
            resources: ["Budgeting", "Saving", "Emergency Fund", "Debt Management"],
            duration: "1 week",
          },
          {
            stepNumber: 2,
            title: "Investing 101",
            description: "Introduction to stocks, bonds, and mutual funds",
            resources: ["Stocks", "Bonds", "Mutual Funds", "Diversification"],
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

    // Create new courses
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`Created ${createdCourses.length} courses successfully!`);

    console.log("\nSample courses created:");
    createdCourses.forEach((course) => {
      console.log(`- ${course.title} (${course.category} - ${course.subcategory})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
};

seedCourses();
