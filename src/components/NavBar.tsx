import * as React from "react";
import { NavLink } from "react-router";

export interface IAppProps {}

export default function NavBar(props: IAppProps) {
  return (
    <>
      <div className="w-full  h-16 mb-6 bg-[#242424] shadow-[0px_0px_2rem_0.1rem_#000000] flex flex-row align-middle justify-end ">
        <ul className="flex flex-row items-center gap-1 h-full mr-8">
          <li>
            <NavLink
              to={"login"}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
                  : "text-gray-300  py-2 hover:text-white transition-colors"
              }
            >
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"signup"}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold  py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
                  : "text-gray-300 px-4 py-2 hover:text-white transition-colors"
              }
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
