import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String },
    fileUrl: { type: String },
    cloudinaryId: { type: String },
    analysis: {
      summary: { type: String, default: "" },
      contact: {
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
      },
      skills: { type: [String], default: [] },
      experience: {
        type: [
          {
            id: Number,
            role: String,
            company: String,
            duration: String,
          },
        ],
        default: [],
      },
      education: {
        type: [
          {
            id: Number,
            degree: String,
            institution: String,
            year: String,
          },
        ],
        default: [],
      },
      suitableRoles: { type: [String], default: [] },
      atsScore: { type: Number, default: 0, min: 0, max: 100 },
      keywords: { type: [String], default: [] },
      strengths: { type: [String], default: [] },
      improvements: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
