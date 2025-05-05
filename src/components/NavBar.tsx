// import * as React from "react";

import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
// import SearchInput from "./inputs/Search.Input";

export interface INavBarProps {}

export default function NavBar() {
  const { user } = useAuth();
  // console.log(user);
  return (
    <>
      <nav className="w-full h-16 mb-4 bg-[#242424] shadow-[0px_0px_2rem_0.1rem_#000000]">
        <div className="h-full ">
          <ul className="flex flex-row justify-between  items-center  gap-1 h-full mr-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex-3/4  text-white font-semibold px-4 py-2 rounded-md  transition-all duration-300 hover:text-blue-800 "
                    : "flex-3/4  text-gray-300 px-4 py-2 hover:text-blue-600 transition-colors"
                }
              >
                Home
              </NavLink>
            </li>
            {/* <li>
              <SearchInput />
            </li> */}
            {user?.username && (
              <li>
                <NavLink
                  // to={`profile/:${user.username}`}
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold px-4 py-2 rounded-md  "
                      : "text-gray-300  py-2 hover:text-white transition-colors"
                  }
                >
                  {user.username}
                </NavLink>
              </li>
            )}
            {!user && (
              <>
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
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
