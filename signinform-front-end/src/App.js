import React, { useState, useContext } from "react";
//Routes related dependency
import { BrowserRouter, Routes, Route } from "react-router-dom";
//JS file components
import {
  SignInForm,
  SignUpForm,
  NavigationBar,
  Home,
  UserAccount,
} from "./components";
//CSS file
import "./App.css";
import "tachyons";
import "./GlobalStyles.css";
import { myContext } from "./Context";
function App() {
  const { isAuthenticated } = useContext(myContext);

  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" exact element={<SignInForm />} />

          <Route path="/userAccount" element={<UserAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
