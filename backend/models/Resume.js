import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String },
    fileUrl: { type: String },
    cloudinaryId: { type: String },
    analysis: {
      skills: { type: [String], default: [] },
      experience: {
        type: [
          {
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
            degree: String,
            institution: String,
            year: String,
          },
        ],
        default: [],
      },
      suitableRoles: { type: [String], default: [] },
      atsScore: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
