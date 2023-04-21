import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavigationBar.module.css';

export default function NavigationBar() {

  return (
    <div>
        <ul className={styles.navigationBar}>
                <li><Link to='/'      >Home  </Link></li>
                <li><Link to='/signin'>SignIn</Link></li>
                <li><Link to='/signup'>SignUp</Link></li>
        </ul>
    </div>
  )
}
