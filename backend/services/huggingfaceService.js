import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_BASE_URL = "https://api-inference.huggingface.co/models";

// Multiple models for different analysis tasks
const MODELS = {
  zeroShot: "facebook/bart-zero-shot-classification",
  textGeneration: "gpt2", // Fallback
  summary: "facebook/bart-large-cnn",
};

// Helper: Call HuggingFace API with retry logic
async function callHFAPI(model, input, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(
        `${HF_BASE_URL}/${model}`,
        input,
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 60000,
        }
      );

      if (response.data?.error) {
        console.warn(`HF API warning: ${response.data.error}`);
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }
      }

      return response.data;
    } catch (error) {
      console.error(`HF API attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

// Extract skills using zero-shot classification
export async function extractSkills(text) {
  try {
    const skillKeywords = [
      "Python", "JavaScript", "Java", "C++", "SQL", "React", "Node.js",
      "MongoDB", "AWS", "Docker", "Git", "REST API", "HTML", "CSS",
      "TypeScript", "Express", "Django", "Flask", "Machine Learning",
      "Data Analysis", "Communication", "Leadership", "Project Management"
    ];

    const input = {
      inputs: text.substring(0, 512), // Limit text size
      parameters: {
        candidate_labels: skillKeywords,
        multi_class: true,
      },
    };

    const result = await callHFAPI(MODELS.zeroShot, input);
    
    if (Array.isArray(result) && result[0]?.labels) {
      return result[0].labels.slice(0, 10);
    }
    return [];
  } catch (error) {
    console.error("Error extracting skills:", error.message);
    return [];
  }
}

// Enhanced resume analysis
export async function analyzeResume(text) {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("Resume text is empty");
    }

    // Extract key information using regex patterns
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    const phoneMatch = text.match(/(\d{10}|\d{3}[-.]?\d{3}[-.]?\d{4})/);
    
    const email = emailMatch ? emailMatch[1] : "Not found";
    const phone = phoneMatch ? phoneMatch[1] : "Not found";

    // Extract skills
    const skills = await extractSkills(text);

    // Summarize resume
    const summaryInput = {
      inputs: text.substring(0, 1024),
      parameters: { max_length: 150, min_length: 50 },
    };
    
    let summary = "";
    try {
      const summaryResult = await callHFAPI(MODELS.summary, summaryInput);
      summary = (Array.isArray(summaryResult) && summaryResult[0]?.summary_text) 
        ? summaryResult[0].summary_text 
        : "Resume processed successfully";
    } catch (err) {
      console.warn("Summary generation failed, using fallback");
      summary = "Resume processed successfully";
    }

    // Calculate enhanced ATS score
    const atsScore = calculateATSScore(text, skills);

    // Extract experience and education
    const experience = extractExperience(text);
    const education = extractEducation(text);
    const suitableRoles = generateSuitableRoles(skills, text);

    return {
      summary,
      contact: { email, phone },
      skills: skills.slice(0, 15),
      experience,
      education,
      suitableRoles,
      atsScore,
      keywords: extractKeywords(text),
      strengths: identifyStrengths(skills, text),
      improvements: generateImprovements(text, atsScore),
    };
  } catch (error) {
    console.error("Resume analysis error:", error.message);
    throw new Error(`Resume analysis failed: ${error.message}`);
  }
}

// Helper: Calculate ATS score
function calculateATSScore(text, skills) {
  let score = 50; // Base score

  // Skills bonus (up to 20 points)
  score += Math.min(20, skills.length * 2);

  // Keywords check
  const keywords = [
    "experience", "project", "responsibility", "achievement",
    "result", "led", "managed", "developed", "implemented"
  ];
  const keywordCount = keywords.filter(kw => 
    text.toLowerCase().includes(kw)
  ).length;
  score += Math.min(15, keywordCount * 2);

  // Format quality (sections present)
  const sections = ["experience", "education", "skills"].filter(sec =>
    text.toLowerCase().includes(sec)
  ).length;
  score += Math.min(15, sections * 5);

  return Math.min(100, score);
}

// Helper: Extract experience
function extractExperience(text) {
  const experiences = [];
  const expPattern = /(?:worked|worked as|senior|junior|engineer|manager|developer|analyst)[\s\S]{0,200}?(?:\d{4}|\w+\s*-\s*\w+)/gi;
  
  const matches = text.match(expPattern) || [];
  matches.slice(0, 5).forEach((match, index) => {
    experiences.push({
      id: index,
      role: match.substring(0, 50),
      company: "Company",
      duration: "Duration",
    });
  });

  return experiences;
}

// Helper: Extract education
function extractEducation(text) {
  const education = [];
  const eduPattern = /(?:bachelor|master|phd|b\.?s\.?|m\.?s\.?|diploma|certificate)[\s\S]{0,100}/gi;
  
  const matches = text.match(eduPattern) || [];
  matches.slice(0, 3).forEach((match, index) => {
    education.push({
      id: index,
      degree: match.substring(0, 50),
      institution: "Institution",
      year: "Year",
    });
  });

  return education;
}

// Helper: Generate suitable roles
function generateSuitableRoles(skills, text) {
  const roleMap = {
    "JavaScript,React,Node.js": "Frontend Developer",
    "Python,Machine Learning,Data": "Machine Learning Engineer",
    "SQL,Database,AWS": "Database Administrator",
    "Java,Spring,Backend": "Backend Developer",
    "DevOps,Docker,Kubernetes": "DevOps Engineer",
    "Leadership,Management,Team": "Technical Lead",
  };

  const suitableRoles = [];
  Object.entries(roleMap).forEach(([roleSkills, role]) => {
    const skillsInRole = roleSkills.split(",").filter(s =>
      skills.some(skill => skill.toLowerCase().includes(s.toLowerCase()))
    );
    if (skillsInRole.length >= 2) {
      suitableRoles.push(role);
    }
  });

  return suitableRoles.length > 0 ? suitableRoles : ["Software Developer"];
}

// Helper: Extract keywords
function extractKeywords(text) {
  const keywords = text.match(/\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/g) || [];
  return [...new Set(keywords)].slice(0, 20);
}

// Helper: Identify strengths
function identifyStrengths(skills, text) {
  const strengths = [];
  
  if (skills.length >= 8) strengths.push("Strong technical skills");
  if (text.toLowerCase().includes("lead")) strengths.push("Leadership experience");
  if (text.toLowerCase().includes("project")) strengths.push("Project experience");
  if (text.toLowerCase().includes("certification")) strengths.push("Certified professional");

  return strengths;
}

// Helper: Generate improvements
function generateImprovements(text, atsScore) {
  const improvements = [];

  if (atsScore < 70) improvements.push("Add more relevant keywords and skills");
  if (!text.toLowerCase().includes("achievement")) improvements.push("Include quantifiable achievements");
  if (!text.toLowerCase().includes("project")) improvements.push("Add project descriptions");
  if (text.length < 500) improvements.push("Expand your resume with more details");

  return improvements;
}
