import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./NavigationBar.module.css";
import { myContext } from "../../Context";
const NavigationBar = () => {
  const { fetchCsrf, csrfToken, setCsrfToken } = useContext(myContext);

  const onPressLogOut = async () => {
    try {
      const response = await fetch(
        `https://signinform-back-end.onrender.com/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          body: JSON.stringify({}),
          credentials: "include",
          mode: "cors",
        }
      );
      if (response.ok) {
        if (response.ok) {
          const data = await response.json();
          setCsrfToken(data.csrfToken); // Update the CSRF token
          sessionStorage.removeItem("authenticated"); //remove authneticatio nfrom session storage
          fetchCsrf(); // create new csrfToken after logging out
          Cookies.remove("session_cookie");
          console.log("Logged out successfully");
        } else {
          console.log("failed to delete cookie");
        }
        setTimeout(() => {
          window.location.href = "/signin";
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ul className={styles.navigationBar}>
        <li>
          <Link to="/">Home </Link>
        </li>
        <li>
          <Link to="/signin">SignIn</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/userAccount">Account</Link>
        </li>
        <li>
          <button onClick={onPressLogOut}>Log Out</button>
        </li>
      </ul>
    </div>
  );
};
export default NavigationBar;
