import { useEffect, useMemo, useState } from "react";
import useFetchposts from "../../hooks/useFetchPosts";
import Post, { PostData } from "./Post";
import { toast } from "react-toastify";
import axios from "axios";
import EditPostModal from "./EditPostModal";

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
    // console.log(`Posts updated (${sortedPosts.length} items):`, sortedPosts);
  }, [posts.length]);
  const handleDeletePost = async (id: number) => {
    const oldPosts = posts;
    try {
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
      await axios.delete(`${baseUrl}posts/${id}`);
      toast.success("post deleted successfully");
      setPosts(posts.filter((post: PostData) => post.id != id));
      // console.log(response);
    } catch (error) {
      setPosts(oldPosts);
      toast.error("Post can't be deleted now");
    }
  };
  const handleEditPost = async (editedPost: any) => {
    const oldPosts = [...posts];
    const newPosts = posts.map((post: PostData) =>
      post.id === editedPost.id ? editedPost : post
    );
    try {
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
      await axios.put(`${baseUrl}posts/${editedPost.id}`, editedPost);
      toast.success("post edited successfully");
      setPosts(newPosts);
      // console.log(response);
    } catch (error) {
      setPosts(oldPosts);
      toast.error("Post can't be edited now");
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const handleEditClick = (post: PostData) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  const handleSavePost = async (editedPost: PostData) => {
    await handleEditPost(editedPost);
    setOpenModal(false);
  };

  return (
    <div className="mx-auto sm:w-sm  md:w-md lg:w-lg xl:w-xl 2xl:w-3xl flex flex-col bg-[#FFFFFF]">
      {sortedPosts.map((post) => (
        <Post
          post={post}
          key={post.id}
          handleDeletePost={handleDeletePost}
          handleEditClick={handleEditClick}
        />
      ))}
      {selectedPost && (
        <EditPostModal
          open={openModal}
          post={selectedPost}
          onClose={() => setOpenModal(false)}
          onSave={handleSavePost}
          handleEditPost={handleEditPost}
        />
      )}
    </div>
  );
}
