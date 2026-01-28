// Backend Configuration
export const config = {
  // Server
  PORT: process.env.PORT || 4003,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGO_URI: process.env.MONGO_URI,

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: "7d",

  // API Limits
  MAX_REQUEST_SIZE: "10mb",
  REQUEST_TIMEOUT: 15000, // 15 seconds

  // File Upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB

  // CORS
  ALLOWED_ORIGINS: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://localhost:3000",
  ],

  // Email (if using)
  SMTP_SERVICE: process.env.SMTP_SERVICE,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};

// Validate required configs
export const validateConfig = () => {
  const required = [
    "MONGO_URI",
    "JWT_SECRET",
    "HUGGINGFACE_API_KEY",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};
