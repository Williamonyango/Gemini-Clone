// ../../config/FileUpload.js
import { Buffer } from "buffer";

export const convertFileToBase64 = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  return {
    type: file.type,
    base64: Buffer.from(arrayBuffer).toString("base64"),
    imageUrl: URL.createObjectURL(file),
  };
};

export default convertFileToBase64;
