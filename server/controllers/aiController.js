import { GoogleGenerativeAI } from "@google/generative-ai";

export const getBudgetEstimate = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // ✅ CORRECT MODEL (WORKING)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
Give a realistic estimated budget in INR for the following event:
"${title}"

IMPORTANT:
- Return ONLY a number
- No text
- No currency symbol
Example: 25000
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();

    console.log("AI RAW:", text);

    // Clean number
    const cleaned = text.replace(/[^0-9]/g, "");
    const budget = cleaned ? parseInt(cleaned, 10) : 10000;

    res.json({ budget });
  } catch (error) {
    console.error("🔥 GEMINI ERROR:", error);

    res.status(500).json({
      error: error.message || "AI failed",
    });
  }
};