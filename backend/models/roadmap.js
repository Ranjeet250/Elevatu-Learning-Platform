import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    interest: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Roadmap", roadmapSchema);
