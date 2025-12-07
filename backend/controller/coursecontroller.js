import Course from "../models/course.js";

// Get all courses (public)
export const getAllCourses = async (req, res) => {
  try {
    const { category, subcategory, level } = req.query;
    let filter = { isPublished: true };

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (level) filter.level = level;

    const courses = await Course.find(filter)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      message: "Courses fetched successfully",
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// Get course by ID (public)
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email")
      .populate("enrolledStudents", "name email");

    if (!course) {
      return res.status(404).json({
        status: 404,
        message: "Course not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// Create course (Admin only) - FLEXIBLE VERSION
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnail,
      price,
      level,
      category,
      subcategory,
      tags,
      videoPlaylistLinks,
      documentationLinks,
      roadmapSteps,
    } = req.body;

    // Only title and description are required
    if (!title || !title.trim()) {
      return res.status(400).json({
        status: 400,
        message: "Course title is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        status: 400,
        message: "Course description is required",
      });
    }

    // Create course with defaults for optional fields
    const course = await Course.create({
      title: title.trim(),
      description: description.trim(),
      thumbnail: thumbnail || "https://via.placeholder.com/400x300?text=Course",
      price: parseFloat(price) || 0,
      level: level 
      ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()
      : "Beginner",
      category: category || "Tech",
      subcategory: subcategory || "Web Development",
      tags: Array.isArray(tags) ? tags : (tags || []),
      videoPlaylistLinks: Array.isArray(videoPlaylistLinks) ? videoPlaylistLinks : [],
      documentationLinks: Array.isArray(documentationLinks) ? documentationLinks : [],
      roadmapSteps: Array.isArray(roadmapSteps) ? roadmapSteps : [],
      instructor: req.user._id,
      isPublished: true, // Auto-publish for flexibility
    });

    res.status(201).json({
      status: 201,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      status: 500,
      message: error.message || "Failed to create course",
    });
  }
};

// Update course (Admin only)
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: 404,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized to update this course",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      status: 200,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// Delete course (Admin only)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: 404,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized to delete this course",
      });
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      status: 200,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// Add roadmap step (Admin only)
export const addRoadmapStep = async (req, res) => {
  try {
    const { id } = req.params;
    const { stepNumber, title, description, resources, duration } = req.body;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: 404,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized",
      });
    }

    course.roadmapSteps.push({
      stepNumber,
      title,
      description,
      resources: resources || [],
      duration: duration || "1 week",
    });

    await course.save();

    res.status(201).json({
      status: 201,
      message: "Roadmap step added successfully",
      course,
    });
  } catch (error) {
    console.error("Error adding roadmap step:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// Publish course (Admin only)
export const publishCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: 404,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized",
      });
    }

    course.isPublished = true;
    await course.save();

    res.status(200).json({
      status: 200,
      message: "Course published successfully",
      course,
    });
  } catch (error) {
    console.error("Error publishing course:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// Get admin's courses
export const getAdminCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: 200,
      message: "Admin courses fetched",
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Error fetching admin courses:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

// Enroll student in course
export const enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        status: 404,
        message: "Course not found",
      });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({
        status: 400,
        message: "Already enrolled in this course",
      });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    res.status(200).json({
      status: 200,
      message: "Enrolled successfully",
      course,
    });
  } catch (error) {
    console.error("Error enrolling course:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};



