import * as yup from "yup";

// Define the Yup schema
export const AddPostSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  body: yup.string().trim().required("Post Body is required"),
  image: yup
    .mixed<FileList>()
    .test("fileSize", "File too large, 5 MB max", (value) => {
      if (!value || value.length === 0) return true; // Allow empty
      const file = value[0];
      return file.size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return ["image/jpeg", "image/png", "image/gif"].includes(file.type);
    }),
  createdOn: yup.number().default(() => new Date().getTime()),
});
