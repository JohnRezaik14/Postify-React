import axios from "axios";
export const uploadImage = async (file: File): Promise<string> => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  const base64Image: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });

  const payload = new FormData();
  payload.append("image", base64Image);

  try {
    const response = await axios.post(url, payload);
    return response.data.data.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};
