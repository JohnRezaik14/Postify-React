import * as React from "react";
import Post from "./Post";
// export interface IFeedProps {
// }

export default function Feed() {
  const postInfo = {
    usrImg: "/sample-profile.png",
    usrName: "Carla",
    postTime: "1h",
    postPara:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde magnam libero veritatis. Eaque odit officia qui explicabo dignissimos consequuntur accusantium iste corrupti dolores quia debitis natus, consequatur ad cumque ipsa.",
    postImg: "/body.png",
  };
  return (
    <div className="mx-auto sm:w-sm  md:w-md lg:w-lg xl:w-xl 2xl:w-3xl flex flex-col bg-[#FFFFFF]">
      <Post post={postInfo} />
      <Post post={postInfo} />
      <Post post={postInfo} />
    </div>
  );
}
