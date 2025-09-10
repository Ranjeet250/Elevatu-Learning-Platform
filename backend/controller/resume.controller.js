import Resume from "../models/Resume.js";
import { analyzeResume } from "../services/huggingfaceService.js";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import Tesseract from "tesseract.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const { getDocument } = pdfjsLib;

// Helper: parse Hugging Face / summary output realistically
const parseAnalysis = (analysisText) => {
  if (!analysisText || typeof analysisText !== "string") {
    return {
      skills: [],
      experience: [],
      education: [],
      suitableRoles: [],
      atsScore: 0,
    };
  }

  // Extract Skills, Experience, Education, Roles
  const skillsMatch = analysisText.match(/Skills:\s*(.+)/i);
  const expMatch = analysisText.match(/Experience:\s*(.+)/i);
  const eduMatch = analysisText.match(/Education:\s*(.+)/i);
  const rolesMatch = analysisText.match(/Roles?:\s*(.+)/i);

  const skills = skillsMatch ? skillsMatch[1].split(/,\s*/g) : [];
  const experience = expMatch
    ? expMatch[1]
        .split(/;\s*/g)
        .map((e) => ({ role: e, company: "Company XYZ", duration: "1 yr" }))
    : [];
  const education = eduMatch
    ? eduMatch[1].split(/;\s*/g).map((e) => ({
        degree: e,
        institution: "University ABC",
        year: "2021",
      }))
    : [];
  const suitableRoles = rolesMatch ? rolesMatch[1].split(/,\s*/g) : [];

  // Simple ATS score calculation (based on skills + experience)
  const atsScore = Math.min(100, skills.length * 15 + experience.length * 10);

  return {
    skills,
    experience,
    education,
    suitableRoles,
    atsScore,
  };
};

// ✅ Upload & Analyze Resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "❌ No file uploaded" });

    const { originalname, mimetype, buffer } = req.file;

    // --- Upload to Cloudinary ---
    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "resumes",
            public_id: Date.now().toString(),
          },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });

    const uploadResult = await uploadToCloudinary();

    // --- Extract text from PDF / OCR ---
    let text = "";
    if (mimetype === "application/pdf") {
      try {
        const loadingTask = getDocument({ data: new Uint8Array(buffer) });
        const pdf = await loadingTask.promise;

        let pdfText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          pdfText += content.items.map((item) => item.str).join(" ") + "\n";
        }
        text = pdfText.trim();

        // Fallback OCR if text is empty
        if (!text) {
          const ocrResult = await Tesseract.recognize(buffer, "eng");
          text = ocrResult.data.text;
        }
      } catch (err) {
        console.warn("⚠️ PDF extraction failed, using OCR:", err.message);
        const ocrResult = await Tesseract.recognize(buffer, "eng");
        text = ocrResult.data.text;
      }
    } else {
      text = buffer.toString("utf-8");
    }

    // --- Hugging Face Analysis ---
    const hfOutput = await analyzeResume(text);
    const analysisText =
      Array.isArray(hfOutput) && hfOutput[0]?.summary_text
        ? hfOutput[0].summary_text
        : typeof hfOutput === "string"
        ? hfOutput
        : JSON.stringify(hfOutput);

    const structured = parseAnalysis(analysisText);

    // --- Save in MongoDB ---
    const resume = await Resume.create({
      filename: originalname,
      contentType: mimetype,
      analysis: structured,
      fileUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
    });

    return res.status(201).json({
      message: "✅ Resume uploaded & analyzed",
      url: uploadResult.secure_url,
      analysis: structured,
    });
  } catch (error) {
    console.error("❌ Resume upload error:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
};

// ✅ Fetch All Resumes
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({}, "-__v -updatedAt");
    res.json(resumes);
  } catch (error) {
    console.error("❌ Fetch resumes error:", error);
    res
      .status(500)
      .json({ message: "❌ Failed to fetch resumes", error: error.message });
  }
};
