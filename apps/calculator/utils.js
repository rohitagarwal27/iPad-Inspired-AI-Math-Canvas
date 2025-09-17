import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../../constants.js'; // assuming you have the GEMINI_API_KEY in constants.js

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);  // Initialize the API with your key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Converts an image buffer to the required format for the generative AI model.
 * @param {Buffer} imageBuffer - The image buffer.
 * @param {string} mimeType - The MIME type of the image (e.g., "image/jpeg").
 * @returns {object} The formatted object for generative AI.
 */
function fileToGenerativePart(imageBuffer, mimeType) {
  return {
    inlineData: {
      data: imageBuffer.toString("base64"), // Convert binary buffer to base64
      mimeType, // Use the provided MIME type
    },
  };
}
/**
 * Analyzes the image and dictionary of variables, sends a request to the model, and returns the response.
 * @param {Buffer} imageBuffer - Image buffer for processing.
 * @param {string} mimeType - The MIME type of the image (e.g., "image/jpeg").
 * @param {object} dictOfVars - Dictionary of variables.
 * @returns {Promise<object[]>} - The response from the model after analysis.
 */
async function analyzeImage(imageBuffer, mimeType, dictOfVars) {
  const dict_of_vars_str = JSON.stringify(dictOfVars);

  const prompt = `You are given an image that may contain: (a) mathematical expressions/equations, or (b) hand‑drawn diagrams/word problems (geometry, trigonometry, motion, venn diagrams, charts), or (c) variable assignments.
Your tasks:
1) Understand what the drawing/text represents in simple terms.
2) If it is a solvable math expression/equation(s), compute the answer using PEMDAS and return it.
3) If it is a diagram/word problem, briefly explain what it shows (in plain English) and provide the numeric/formula result if applicable.

Rules for solving:
- Use PEMDAS (Parentheses, Exponents, Multiplication/Division left→right, Addition/Subtraction left→right).
- If variables appear and are present in this map, substitute them: ${dict_of_vars_str}.
- For systems of equations, solve the variables and mark each variable dict with "assign": true.
- For Venn diagrams: if asked for union, also provide PIE formula as one dict: [{"expr":"|A U B|","result":"|A| + |B| - |A n B|"}]. For intersection, describe and give the result if asked.
- If you cannot confidently interpret, return a single dict with a short "expr" explanation and an empty "result".

Output format (strict JSON only):
- Always return a JSON array of one or more objects.
- Each object must have keys: "expr" (string), "result" (string or number), and optional "assign" (boolean, lowercase true/false).
- Use double quotes for all keys/strings. Do NOT use markdown, backticks, or prose outside the JSON.

Examples:
- Simple expression: [{"expr":"2 + 3 * 4","result":14}]
- Assignments: [{"expr":"x","result":4,"assign":true}]
- System: [{"expr":"x","result":2,"assign":true},{"expr":"y","result":5,"assign":true}]
- Diagram/word problem: [{"expr":"Right triangle with legs 3 and 4; find hypotenuse","result":5}]
`;

  try {
    const imagePart = fileToGenerativePart(imageBuffer, mimeType);

    // Send the prompt and image to the Gemini model
    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    console.log("Response from Gemini:", responseText);

    // Clean the response text by removing Markdown formatting and normalizing quotes
    const cleanedResponse = responseText
      .replace(/```json/g, '') // Remove the opening Markdown code block
      .replace(/```/g, '')     // Remove the closing Markdown code block
      .replace(/'/g, '"')     // Replace single quotes with double quotes for valid JSON
      .replace(/True/g, 'true').replace(/False/g, 'false');

    // Try parsing the cleaned response
    let answers = [];
    try {
      answers = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      console.error("Cleaned response:", cleanedResponse); // Log the cleaned response for debugging
    }

    return answers;
  } catch (error) {
    console.error("Error generating content:", error);
    
    // Return a fallback response for network errors
    if (error.message.includes('fetch failed') || error.message.includes('network')) {
      return [{
        expr: "Network error - check internet connection and API key",
        result: "Unable to process image"
      }];
    }
    
    throw error;
  }
}




export { analyzeImage };
