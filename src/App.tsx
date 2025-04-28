// import { useState } from 'react'
import { Auth } from "./components/forms/Auth";
import { Routes, Route } from "react-router";
import "./App.css";
import axios from "axios";
import Error from "./pages/Error";
import { Home } from "./pages/Home";
// import NavBar from "./components/NavBar";
function App() {
  // should handle routing if user is authenticated or not
  // or popup modal to ask him if he want to LoginSignup first
  //add navbar component
  return (
    <>
      <Routes>
        {/* header , static components */}

        <Route path="" element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
