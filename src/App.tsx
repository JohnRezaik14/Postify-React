// import { useState } from 'react'

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Error from "./pages/Error";
import { Home } from "./pages/Home";
import Auth from "./pages/Auth";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import AddPost from "./pages/AddPost";
// import NavBar from "./components/NavBar";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(isAuthenticated, loading);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <>
      <AuthProvider>
        {/* <NavBar /> */}
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="posts/add"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
