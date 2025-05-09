// import React from "react";
import "./post.css";
import Avatar from "@mui/material/Avatar";
import { formatDistanceToNow } from "date-fns";
import * as colors from "@mui/material/colors";
import { useAuth } from "../../contexts/AuthContext";
import OptionsButton from "../buttons/PostOptions.Button";
export interface PostData {
  id: number;
  title: string;
  body: string;
  image: string;
  userId: number;
  username: string;
  userImg: string;
  createdOn: number;
}
export interface PostProps {
  post: PostData;
  handleDeletePost: Function;
  handleEditClick: Function;
}
const colorList = [
  colors.red[500],
  colors.pink[500],
  colors.purple[500],
  colors.deepPurple[500],
  colors.indigo[500],
  colors.blue[500],
  colors.lightBlue[500],
  colors.cyan[500],
  colors.teal[500],
  colors.green[500],
  colors.lightGreen[500],
  colors.lime[500],
  colors.yellow[500],
  colors.amber[500],
  colors.orange[500],
  colors.deepOrange[500],
];
export default function Post({
  post,
  handleDeletePost,
  handleEditClick,
}: PostProps) {
  const { user } = useAuth();

  const timeAgo = formatDistanceToNow(new Date(post.createdOn), {
    addSuffix: true,
  });
  const index = post.userId % colorList.length;
  const avatarColor = colorList[index];

  return (
    <article className="bg-white border-[0.05rem] border-[#eee] mb-2 post-shadow rounded-lg">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {post.userImg ? (
            <div className="profile-image">
              <img
                src={post.userImg}
                alt={`${post.username}'s profile`}
                className="w-10 h-10 rounded-full"
              />
            </div>
          ) : (
            post.username && (
              <Avatar sx={{ bgcolor: avatarColor }}>
                {post.username?.slice(0, 2).toUpperCase()}
              </Avatar>
            )
          )}
          <div className="post-metadata">
            <h2 className="font-medium">
              {post.username === user?.username ? "You" : post.username}
            </h2>
            <time className="text-sm text-gray-500">{timeAgo}</time>
          </div>
        </div>
        {post.username === user?.username && (
          <div className="post-actions">
            <OptionsButton
              author={post.username === user?.username}
              handleDeletePost={handleDeletePost}
              handleEditClick={handleEditClick}
              id={post.id}
              post={post}
            />
          </div>
        )}
      </header>
      <main className="p-4">
        <p className="mb-4 font-bold text-zinc-800">{post.title}</p>
        <p className="mb-4">{post.body}</p>
        <div className="post-media">
          <img
            src={post.image || undefined}
            alt="Post content"
            className="w-full"
          />
        </div>
      </main>
    </article>
  );
}
