import React, { useState, useContext } from 'react';
//Routes related dependency
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//JS file components
import {SignInForm, SignUpForm, NavigationBar, Home} from './components';
//CSS file
import './App.css';
import 'tachyons';
import './GlobalStyles.css';
import { myContext } from './Context';
function App() {

  const [downloadUsersData, setDownloadUsersData] = useState({
                                                              id: "",
                                                              name: "",
                                                              email: "",
                                                              entries: 0,
                                                              joined: ""
                                                            }); 
  const userObject = useContext(myContext);
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

  return (
    <div>
                  <BrowserRouter>
                    <NavigationBar />
                    <Routes>

                    <Route
                      path='/signup'
                      exact
                      element={
                        userObject && userObject.isSignedIn ? (
                          alert('signed in')
                        ) : (
                          <SignUpForm
                            loadUsersDataFromDatabase={loadUsersDataFromDatabase}
                          />
                        )
                      }
                    />
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' exact element={<SignInForm loadUsersDataFromDatabase={loadUsersDataFromDatabase}/>} />
                    </Routes>
                  </BrowserRouter>
    </div>
  );
}

export default App;