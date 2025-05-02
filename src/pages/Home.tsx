// import * as React from "react";
import Feed from "../components/posts/Feed";
// import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import FloatingActionButtonSize from "../components/inputs/AddButton";
import { NavLink } from "react-router";
// import { ToastContainer } from "react-toastify";
export interface IAppProps {}

export function Home() {
  return (
    <div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <NavBar />
      <Feed />
      <NavLink to={"posts/add"}>
        <div className="fixed right-1/12 bottom-1/12">
          <FloatingActionButtonSize />
        </div>
      </NavLink>
    </div>
  );
}
