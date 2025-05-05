import { createContext } from "react";

export const PostsContext = createContext({
  posts: [],
  searchForPost: "",
  setSearchForPost: () => {},
  setPosts: () => {},
});
