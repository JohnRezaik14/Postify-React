import axios from "axios";
import { useEffect, useState } from "react";
import { PostData } from "../components/posts/Post";
export default function useFetchposts() {
  //   let dataServerState = false;
  const [posts, setPosts] = useState<PostData[]>([]);
  //   const [categories, setCategories] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState(0);
  useEffect(() => {
    const getData = async () => {
      //   setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}posts`,
          {
            withCredentials: true,
          }
        );

        setPosts(response.data);

        // setIsLoading(false);

        // console.log(response);
      } catch (error) {
        // console.log(dataServerState);
        console.log(error);
        // console.log(navigator);
        // console.log(navigator.connection);
      }
    };
    getData();
  }, []);
  return { posts, setPosts };
}
