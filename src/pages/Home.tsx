import * as React from "react";
import Feed from "../components/posts/Feed";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
export interface IAppProps {}

export function Home(props: IAppProps) {
  return (
    <div>
      <NavBar />
      <Feed />
    </div>
  );
}
