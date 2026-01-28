import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Input validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Name, email, and password are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid email format",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        status: 400,
        message:
          "Password must be at least 8 characters with uppercase, lowercase, and numbers",
      });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        status: 400,
        message: "Name must be between 2 and 50 characters",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({
        status: 400,
        message: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Only allow 'student' or 'admin' roles, default to 'student'
    const userRole = ["admin", "student"].includes(role) ? role : "student";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({
      status: 500,
      message: "Error registering user",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Email and password are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid email format",
      });
    }
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      status: 200,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      status: 500,
      message: "Error logging in",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({
      status: 200,
      message: "User retrieved successfully",
      user,
    });
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({
      status: 500,
      message: "Error fetching user",
    });
  }
};
