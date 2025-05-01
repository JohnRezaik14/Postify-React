// import * as React from "react";
import Feed from "../components/posts/Feed";
// import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
// import { ToastContainer } from "react-toastify";
export interface IAppProps {}

export function Home() {
  return (
    <div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <NavBar />
      <Feed />
    </div>
  );
}
