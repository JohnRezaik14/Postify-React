// import React from "react";
import "./post.css";
interface PostProps {
  post: {
    usrImg: string;
    usrName: string;
    postTime: string;
    postPara: string;
    postImg: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <article className="bg-white border-[0.05rem] border-[#eee] mb-2 post-shadow">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="profile-image">
            <img
              src={post.usrImg}
              alt={`${post.usrName}'s profile`}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="post-metadata">
            <h2 className="font-medium">{post.usrName}</h2>
            <time className="text-sm text-gray-500">{post.postTime}</time>
          </div>
        </div>
        <div className="post-actions">
          <button aria-label="Post options" className="p-2 three-dots-options">
            <img className="w-5 h-5 " src="/dots.svg" alt="options" />
          </button>
        </div>
      </header>
      <main className="p-4">
        <p className="mb-4">{post.postPara}</p>
        <div className="post-media">
          <img src={post.postImg} alt="Post content" className="w-full" />
        </div>
      </main>
    </article>
  );
}
