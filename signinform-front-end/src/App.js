import React, { useState } from 'react';
//JS file components
import {SignInForm, SignUpForm} from './components';
//CSS file
import './App.css';
import 'tachyons';

function App() {
  const [signInPageConditionChange, setSignInPageConditionChange] = useState(false); //Sign In page condition
  const [signUpPageConditionChange, setSignUpPageConditionChange] = useState(true);  //Sign Up page condition

  const [downloadUsersData, setDownloadUsersData] = useState({
                                                              id: "",
                                                              name: "",
                                                              email: "",
                                                              entries: 0,
                                                              joined: ""
                                                            }); 
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
    setSignUpPageConditionChange(prevData => !prevData);
  };

  return (
    <div>
          {
              signUpPageConditionChange === false ?
              <SignUpForm  SignUpPageConditionChangeFunction={SignUpPageConditionChangeFunction}
                           loadUsersDataFromDatabase={loadUsersDataFromDatabase} 
              />
              :
              <SignInForm  loadUsersDataFromDatabase={loadUsersDataFromDatabase} 
                           SignInPageConditionChangeFunction={SignInPageConditionChangeFunction}  
                           SignUpPageConditionChangeFunction={SignUpPageConditionChangeFunction} 
              />  
          }
    </div>
  );
}

export default App;
