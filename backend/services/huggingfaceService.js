import dotenv from "dotenv";
import axios from "axios";

// ✅ Load .env first
dotenv.config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODEL = "facebook/bart-large-cnn"; // summarization model

// ✅ Debug environment loading
console.log(
  "DEBUG HuggingFace Token:",
  HF_API_KEY ? HF_API_KEY.slice(0, 10) + "..." : "❌ Not Found"
);

// ✅ Test Hugging Face API connection
async function testHFToken() {
  try {
    console.log(
      "🔑 Using token:",
      HF_API_KEY ? HF_API_KEY.slice(0, 10) + "..." : "❌ Missing"
    );

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: "Health check: testing Hugging Face API connectivity." },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    console.log("✅ Hugging Face API test successful");
    return true;
  } catch (err) {
    console.error(
      "❌ Hugging Face API test failed:",
      err.response?.data || err.message
    );
    return false;
  }
}

// ✅ Main function to analyze resume
export async function analyzeResume(text) {
  const tokenOk = await testHFToken();
  if (!tokenOk) {
    throw new Error("❌ Invalid Hugging Face token or model not accessible.");
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "❌ Hugging Face API request failed:",
      error.response?.data || error.message
    );
    throw new Error("❌ Hugging Face API request failed");
  }
}
