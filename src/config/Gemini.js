import { GoogleGenAI } from "@google/genai";
import { convertFileToBase64 } from "./FileUpload";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const Message = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
};

export const FileUpload = async (prompt, selectedFile) => {
  try {
    const { type, base64, imageUrl } = await convertFileToBase64(selectedFile);

    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: type,
          data: base64,
        },
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
    });

    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary available.";

    return text;
  } catch (error) {
    console.error("Error processing file:", error);
  }
  return text;
};

export default {
  Message,
  FileUpload,
};
