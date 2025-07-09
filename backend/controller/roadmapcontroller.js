import Roadmap from "../models/roadmap.js";

export const createRoadmap = async (req, res) => {
  try {
    const { interest, skills } = req.body;

    if (!interest || !skills) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newRoadmap = new Roadmap({ interest, skills });
    await newRoadmap.save();

    res.status(201).json({
      message: "Roadmap saved successfully",
      data: newRoadmap,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().sort({ createdAt: -1 });
    res.status(200).json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const { interest, skills } = req.body;

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    roadmap.interest = interest || roadmap.interest;
    roadmap.skills = skills || roadmap.skills;

    const updated = await roadmap.save();
    res.status(200).json({
      message: "Roadmap updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params;

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    await roadmap.deleteOne();
    res.status(200).json({ message: "Roadmap deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting roadmap:", error);
    res.status(500).json({ message: "Server error" });
  }
};
