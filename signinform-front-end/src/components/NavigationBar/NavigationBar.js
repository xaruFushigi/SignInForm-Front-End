import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavigationBar.module.css';

export default function NavigationBar() {
  const onPressLogOut = () => {
    fetch('http://localhost:3050/logout',
                {
                method: 'GET',
                credentials : 'include',
                headers : {'Content-Type': 'application/json'}
            }
          )
      .then(response => {return response.json()})
      .then(data => {if(data){}})
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
