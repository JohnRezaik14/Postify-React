import { useEffect, useMemo } from "react";
import useFetchposts from "../../hooks/useFetchPosts";
import Post, { PostData } from "./Post";
import { toast } from "react-toastify";
import axios from "axios";

// export interface IFeedProps {
// }

export default function Feed() {
  const { posts, setPosts } = useFetchposts();

  //sort them by latest post
  let sortedPosts: PostData[] = useMemo(() => {
    return posts.sort(
      (post1: PostData, post2: PostData) => post2.createdOn - post1.createdOn
    );
  }, [posts]);
  // console.log(posts);

  useEffect(() => {
    console.log(`Posts updated (${sortedPosts.length} items):`, sortedPosts);
  }, [posts.length]);
  const handleDeletePost = async (id: number) => {
    const oldPosts = posts;
    try {
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
      const response = await axios.delete(`${baseUrl}posts/${id}`);
      toast.success("post deleted successfully");
      setPosts(posts.filter((post: PostData) => post.id != id));
      console.log(response);
    } catch (error) {
      setPosts(oldPosts);
      toast.error("Post can't be deleted now");
    }
  };
  const handleEditPost = async (editedPost: PostData) => {
    const oldPosts = [...posts];
    const newPosts = posts.map((post: PostData) =>
      post.id === editedPost.id ? editedPost : post
    );
    try {
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
      const response = await axios.put(
        `${baseUrl}posts/${editedPost.id}`,
        editedPost
      );
      toast.success("post edited successfully");
      setPosts(newPosts);
      console.log(response);
    } catch (error) {
      setPosts(oldPosts);
      toast.error("Post can't be edited now");
    }
  };
  return (
    <div className="mx-auto sm:w-sm  md:w-md lg:w-lg xl:w-xl 2xl:w-3xl flex flex-col bg-[#FFFFFF]">
      {sortedPosts.map((post) => (
        <Post post={post} key={post.id} handleDeletePost={handleDeletePost} />
      ))}
    </div>
  );
}
