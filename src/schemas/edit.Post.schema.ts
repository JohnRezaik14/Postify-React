import * as yup from "yup";

export const editPostSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  body: yup.string().trim().required("Post Body is required"),
  image: yup
    .mixed<FileList | string>()
    .optional()
    .test("isFileOrUrl", "Must be a valid image format", (value) => {
      if (!value) return true;
      if (typeof value === "string") {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(value);
      }
      if (value instanceof FileList) {
        if (value.length === 0) return true;
        const file = value[0];
        return (
          file.size <= 5 * 1024 * 1024 &&
          ["image/jpeg", "image/png", "image/gif"].includes(file.type)
        );
      }
      return false;
    }),
  createdOn: yup.number().default(() => Date.now()),
});
