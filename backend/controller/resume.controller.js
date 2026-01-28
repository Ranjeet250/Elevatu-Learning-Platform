import Resume from "../models/Resume.js";
import { analyzeResume } from "../services/huggingfaceService.js";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import Tesseract from "tesseract.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const { getDocument } = pdfjsLib;

// Helper: Extract text from various file formats
async function extractTextFromFile(buffer, mimetype) {
  let text = "";

  try {
    if (mimetype === "application/pdf") {
      // Extract from PDF
      const loadingTask = getDocument({ data: new Uint8Array(buffer) });
      const pdf = await loadingTask.promise;

      let pdfText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        pdfText += content.items.map((item) => item.str).join(" ") + "\n";
      }
      text = pdfText.trim();

      // Fallback to OCR if PDF text extraction is empty
      if (!text || text.length < 50) {
        console.warn("⚠️ PDF text extraction produced minimal text, using OCR...");
        const ocrResult = await Tesseract.recognize(buffer, "eng");
        text = ocrResult.data.text;
      }
    } else if (mimetype === "application/msword" || 
               mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      // For .doc/.docx - convert to text (basic approach)
      text = buffer.toString("utf-8");
    } else {
      // Plain text files
      text = buffer.toString("utf-8");
    }

    if (!text || text.trim().length < 50) {
      throw new Error("Could not extract meaningful text from resume");
    }

    return text.trim();
  } catch (error) {
    console.error("Text extraction error:", error.message);
    throw new Error(`Failed to extract text from file: ${error.message}`);
  }
}

// Upload & Analyze Resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "No file uploaded. Please upload a resume (PDF, DOC, or DOCX)",
      });
    }

    const { originalname, mimetype, buffer } = req.file;

    // Validate file type
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedMimeTypes.includes(mimetype)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid file type. Please upload PDF, DOC, DOCX, or TXT",
      });
    }

    // --- Extract text from resume ---
    let resumeText;
    try {
      resumeText = await extractTextFromFile(buffer, mimetype);
    } catch (extractError) {
      return res.status(400).json({
        status: 400,
        message: extractError.message,
      });
    }

    // --- Upload to Cloudinary ---
    let uploadResult;
    try {
      uploadResult = await new Promise((resolve, reject) => {
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
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({
        status: 500,
        message: "Failed to upload file to cloud storage",
      });
    }

    // --- Analyze Resume with HuggingFace ---
    let analysis;
    try {
      analysis = await analyzeResume(resumeText);
    } catch (analysisError) {
      console.error("Analysis error:", analysisError);
      return res.status(500).json({
        status: 500,
        message: "Resume analysis failed. Please try again.",
        error: process.env.NODE_ENV === "development" ? analysisError.message : undefined,
      });
    }

    // --- Save to MongoDB ---
    try {
      const resume = await Resume.create({
        filename: originalname,
        contentType: mimetype,
        analysis,
        fileUrl: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
      });

      return res.status(201).json({
        status: 201,
        message: "Resume uploaded and analyzed successfully",
        data: {
          id: resume._id,
          filename: resume.filename,
          fileUrl: uploadResult.secure_url,
          analysis: resume.analysis,
          uploadedAt: resume.createdAt,
        },
      });
    } catch (dbError) {
      console.error("Database save error:", dbError);
      return res.status(500).json({
        status: 500,
        message: "Failed to save resume analysis",
      });
    }
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({
      status: 500,
      message: "Server error during resume processing",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

// Fetch All Resumes
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({}, "-__v -updatedAt").sort({
      createdAt: -1,
    });
    
    res.status(200).json({
      status: 200,
      message: "Resumes retrieved successfully",
      data: resumes,
    });
  } catch (error) {
    console.error("Fetch resumes error:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to fetch resumes",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
