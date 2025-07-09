import Course from "../models/course.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("❌ Error creating course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email");
    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};
