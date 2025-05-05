import { useEffect, useMemo } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import * as yup from "yup";
// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { PostData } from "./Post";
// import { useAuth } from "../../contexts/AuthContext";
// import { useSavePost } from "../../hooks/savePost";
import { uploadImage } from "../../hooks/useUploadImage";
import FormField from "../inputs/FormField";
import { editPostSchema } from "../../schemas/edit.Post.schema";
// import { EditedPost } from "../../models/EditedPost";

// import { yupResolver } from "@hookform/resolvers/yup";

export interface EditPostModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  post?: PostData;
  handleEditPost: (editedPost: any) => Promise<void>;
}
type FormInputs = {
  title: string;
  body: string;
  image?: FileList | string;
  createdOn: number;
};

export default function EditPostModal({
  open,
  onClose,
  onSave,
  post,
  handleEditPost,
}: EditPostModalProps) {
  // const { updatePost } = useSavePost();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
      image: post?.image || "",
      createdOn: Date.now(),
    },
  });

  // Reset when post changes
  useEffect(() => {
    reset({
      title: post?.title || "",
      body: post?.body || "",
      image: undefined,
      createdOn: Date.now(),
    });
  }, [post, reset]);

  // Preview when image changes
  const imageValue = useWatch<FormInputs>({ control, name: "image" });
  const previewUrl = useMemo(() => {
    if (!imageValue) return undefined;
    if (typeof imageValue === "string") {
      return imageValue; // existing URL
    }
    if (imageValue instanceof FileList && imageValue.length > 0) {
      return URL.createObjectURL(imageValue[0]); // create object URL for preview
    }
  }, [imageValue]);

  // Submit Handler
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await editPostSchema.validate(data, {
        abortEarly: false,
      });
      // console.log("Validated data:", validatedData);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        validationError.inner.reduce((acc, curr) => {
          acc[curr.path!] = curr.message;
          return acc;
        }, {} as Record<string, string>);
        // console.log("Validation errors:", fieldErrors);
      }
    }
    try {
      let imgUrl =
        typeof data.image === "string" ? data.image : post?.image || ""; //last image url or empty
      if (data.image instanceof FileList && data.image.length > 0) {
        imgUrl = await uploadImage(data.image[0]);
      }

      const editedPost = {
        // id: post?.id,
        // userId: post?.userId,
        // username: post?.username,
        // userImg: post?.userImg,
        ...post,
        title: data.title,
        body: data.body,
        image: imgUrl,
        createdOn: data.createdOn,
      };
      // console.log(editedPost);

      await handleEditPost(editedPost);
      // console.log(saveResponse);
      // toast.success("Post updated successfully");
      onSave(editedPost);
      onClose();
    } catch (error) {
      // toast.error("Error updating the post");
      // console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{post ? "Edit Post" : "Create Post"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormField
            label="Post Title"
            name="title"
            type="text"
            placeholder="Title here..."
            id="title"
            register={register}
            errors={errors}
          />
          <div className="mb-4">
            <label className="ff-label" htmlFor="body">
              Body
            </label>
            <textarea
              id="body"
              placeholder="Enter your post body"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("body")}
              aria-describedby="body-error"
            />
            <p id="body-error" className="form-err-msg sm:h-4 md:h-6 h-8">
              {errors.body?.message || " "}
            </p>
          </div>

          <FormField
            label="Post Image"
            name="image"
            type="file"
            placeholder="Image URL..."
            id="image"
            register={register}
            errors={errors}
            accept="image/jpeg,image/png,image/gif"
          />

          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Current Post Image"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
