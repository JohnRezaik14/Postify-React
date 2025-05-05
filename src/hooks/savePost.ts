import axios from "axios";
// import { EditedPost } from "../models/EditedPost";
// import { useState } from "react";
// interface IPost {
//   title: string;
//   body: string;
//   image: string;
//   userId?: string;
//   createdOn: number;
// }
export const useSavePost = () => {
  const savePost = async (data: any) => {
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
    // console.log(data);
    try {
      const response = await axios.post(`${baseUrl}posts`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data || "Failed to save post";
      return { success: false, error: errorMessage };
    }
  };
  const updatePost = async (data: any) => {
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
    // console.log(data);
    try {
      const response = await axios.put(`${baseUrl}posts/${data.id}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data || "Failed to update post";
      return { success: false, error: errorMessage };
    }
  };
  return { savePost, updatePost };
};
