import { useState } from "react";
import { Login } from "../components/forms/Login";
import { Register } from "../components/forms/Register";
import "./auth.css";
export interface IAuthProps {}

export default function Auth() {
  //switch between login and register
  // true ==> login
  //false ==> register
  const [authMode, setAuthMode] = useState<boolean>(true);
  return (
    <>
      <div className="login">
        {authMode ? (
          <Login setAuthMode={setAuthMode} />
        ) : (
          <Register setAuthMode={setAuthMode} />
        )}
      </div>
    </>
  );
}
