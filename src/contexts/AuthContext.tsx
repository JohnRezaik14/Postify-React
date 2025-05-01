import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
interface User {
  id: string;
  username?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (username: string, email: string, password: string) => Promise<any>;
  logout: () => void;
  clearError: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const baseUrl = "http://localhost:3001/";

  // Check if user is already logged in (on app load)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("token");

        if (token) {
          // Verify token with backend
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          const response = await axios.get(`${baseUrl}users/me`, {
            withCredentials: true,
          });
          console.log(response);

          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Authentication check failed");
        Cookies.remove("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${baseUrl}signin`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user: userData } = response.data;

      // Store token
      Cookies.set("token", token);
      //   localStorage.setItem("token", token);

      // Update user state
      setUser(userData);

      // Navigate to home or dashboard
      navigate("/");

      return { success: true, data: userData };
    } catch (err: any) {
      //   console.log(err);

      const errorMessage = err.response?.data || "Failed to login";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${baseUrl}signup`,
        { username, email, password, createdOn: new Date() },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user: userData } = response.data;

      // Store token
      //   localStorage.setItem("token", token);
      Cookies.set("token", token);
      // Update user state
      setUser(userData);

      // Navigate to home or dashboard
      navigate("/");

      return { success: true, data: userData };
    } catch (err: any) {
      const errorMessage = err.response?.data || "Failed to register";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from storage
    // localStorage.removeItem("token");
    Cookies.remove("token");

    // Clear user state
    setUser(null);

    // Navigate to login page
    navigate("/auth");
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Create context value
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
