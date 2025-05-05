import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-toastify";
import FormField from "../../components/inputs/FormField";
import { uploadImage } from "../../hooks/useUploadImage";
import { useSavePost } from "../../hooks/savePost";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { AddPostSchema } from "../../schemas/add.Post.schema";

// Define Inputs type manually
type Inputs = {
  title: string;
  body: string;
  image: File[];
  createdOn: number;
};
export default function AddPost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { savePost } = useSavePost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      body: "",
      createdOn: new Date().getTime(),
    },
  });
  const handlesubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await AddPostSchema.validate(data);
      let imgUrl: string = "";
      const file = data.image[0];

      if (file) {
        imgUrl = await uploadImage(file);
      }

      const post = {
        ...data,
        image: imgUrl,
        userId: user?.id,
        username: user?.username,
      };

      // console.log(post);
      await savePost(post);
      // console.log(saveResponse);
      toast.success("Post submitted successfully");
      navigate("/");
    } catch (error) {
      // toast.error(error);
      // console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlesubmit)}
      className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6 animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Create a New Post
      </h2>
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
        label="Post Image (Optional)"
        name="image"
        type="file"
        placeholder="Image URL..."
        id="image"
        register={register}
        errors={errors}
        accept="image/jpeg,image/png,image/gif"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-800 text-white p-2 rounded hover:bg-blue-500 transition-colors duration-300 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
