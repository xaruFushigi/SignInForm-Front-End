import React, { useState, useContext } from 'react';
//Routes related dependency
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Switch from "react-switch";
//JS file components
import {SignInForm, SignUpForm, NavigationBar, Home} from './components';
//CSS file
import './App.css';
import 'tachyons';
import './GlobalStyles.css';
import { myContext } from './Context';
import { logOutContext } from './components/Logout/Logout';
function App() {
  const [signInPageConditionChange, setSignInPageConditionChange] = useState('/signin'); //Sign In page condition
  const [signUpPageConditionChange, setSignUpPageConditionChange] = useState('/signup');  //Sign Up page condition

  const [downloadUsersData, setDownloadUsersData] = useState({
                                                              id: "",
                                                              name: "",
                                                              email: "",
                                                              entries: 0,
                                                              joined: ""
                                                            }); 
  const userObject = useContext(myContext);
  const logOutObject = useContext(logOutContext);
  //loads database from 'users' table
  const loadUsersDataFromDatabase = (usersDataFromDatabase) => {
    setDownloadUsersData({
                          id      : usersDataFromDatabase.id,
                          name    : usersDataFromDatabase.name,
                          email   : usersDataFromDatabase.email,
                          entries : usersDataFromDatabase.entries,
                          joined  : usersDataFromDatabase.joined
                        })
  };
  //changes state of SignIn page from false to true and opposite
  const SignInPageConditionChangeFunction = () => {
    //changes from false to true/ true to false
    setSignInPageConditionChange(prevData => !prevData);
  };
  //change state of SignUp page from true to false and opposite
  const SignUpPageConditionChangeFunction = () => {
    setSignUpPageConditionChange(prevData =>  !prevData);
  };

  return (
    <div>
                  <BrowserRouter>
                    <NavigationBar />
                    <Routes>
                      <Route path='/signin' exact element={<SignInForm SignUpPageConditionChangeFunction={SignUpPageConditionChangeFunction} loadUsersDataFromDatabase={loadUsersDataFromDatabase} SignInPageConditionChangeFunction={SignInPageConditionChangeFunction}/>} />
                      <Route path='/signup'       element={<SignUpForm SignInPageConditionChangeFunction={SignInPageConditionChangeFunction} loadUsersDataFromDatabase={loadUsersDataFromDatabase} />} />
                      <Route path='/'       element={<Home />} />
                    </Routes>
                  </BrowserRouter>
    </div>
  );
}

export default App;
