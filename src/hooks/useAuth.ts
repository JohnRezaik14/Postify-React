//use effect to set (isLoading,errors from backend) first render in the page
//and send data
//which states i have?
//is loading will be true while post method calling
//will be false after response
//login data will be empty first , filled after submit
//set errors after response too
import axios from "axios";
import { useState } from "react";

//hook for login in the first render
//will return login function
//the returned function login will be called after submitting
//errors
//loading state
export function useAuth(type: "signin" | "signup" = "signin") {
  const baseUrl = "http://localhost:3001/";

  //intial states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authUser = async (data: {
    username?: string;
    email: string;
    password: string;
    type?: "signin" | "signup";
  }) => {
    setLoading(true);
    const { username, email, password } = data;
    try {
      const url = `${baseUrl}${type}`;
      const body =
        type === "signup" ? { username, email, password } : { email, password };
      const response = await axios.post(url, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          timeout: 20000,
          responseType: "json",
        },
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Authentication failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { authUser, loading, error };
}
