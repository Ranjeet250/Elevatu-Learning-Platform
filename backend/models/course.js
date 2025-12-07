import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    category: {
      type: String,
      enum: ["Tech", "Non-Tech"],
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    tags: [String],
    videoPlaylistLinks: [
      {
        title: String,
        url: String,
      },
    ],
    documentationLinks: [
      {
        title: String,
        url: String,
      },
    ],
    roadmapSteps: [
      {
        stepNumber: Number,
        title: String,
        description: String,
        resources: [String],
        duration: String,
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        createdAt: Date,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
