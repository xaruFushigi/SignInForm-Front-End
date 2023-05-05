import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavigationBar.module.css';

export default function NavigationBar() {
  const cacheBust = Date.now();

  const onPressLogOut = () => {
    fetch(`http://localhost:3050/logout?cacheBust=${cacheBust}`,
                { method: 'POST',
                  credentials : 'include',
                  headers : {'Content-Type': 'application/json'},
                  body: JSON.stringify({})
                })        
      .then(response => {
        console.log('Response received successfully');
        return response.json()
      })
      .then(data => {
        console.log(data);
        // If the logout was successful, redirect to the login page or execute
        // some other client-side log out logic here
        console.log('Logged out successfully');
        // add a delay of 500ms before redirecting the user
        setTimeout(() => {
          window.location.href = '/signin';
        }, 500);
      })
      .catch(error => console.log(error))
  }
  return (
    <div>
        <ul className={styles.navigationBar}>
                <li><Link to='/'      >Home  </Link></li>
                <li><Link to='/signin'>SignIn</Link></li>
                <li><Link to='/signup'>SignUp</Link></li>
                <li><button onClick={onPressLogOut}>Log Out</button></li>
        </ul>
    </div>
  )
}
