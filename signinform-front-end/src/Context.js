import React, { createContext, useEffect, useState } from "react";
export const myContext = createContext();

const Context = (props) => {
  // ---------- State relaetd variables ------------------ //
  const [signInEmailInput, setSignInEmailInput] = useState("");
  const [signInPasswordInput, setSignInPasswordInput] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
  // ---------- END OF State relaetd variables ------------------ //

  //-------- INPUT related functions ------------//
  //get email input
  const onEmailChange = (event) => {
    setSignInEmailInput(event.target.value);
  };
  //get password input
  const onPasswordChange = (event) => {
    setSignInPasswordInput(event.target.value);
  };
  //-------- END OF INPUT related functions ------------//

  const fetchCsrf = async () => {
    try {
      const response = await fetch("http://localhost:3050/csrf-token", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } else {
        throw new Error("Failed to fetch CSRF token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCsrf();
  }, []);

  const contextValues = {
    fetchCsrf,
    csrfToken,
    setCsrfToken,
    isAuthenticated,
    signInEmailInput,
    setSignInEmailInput,
    onEmailChange,
    signInPasswordInput,
    setSignInPasswordInput,
    onPasswordChange,
  };

  return (
    <div>
      <myContext.Provider value={contextValues}>
        {props.children}
      </myContext.Provider>
    </div>
  );
};

export default Context;
