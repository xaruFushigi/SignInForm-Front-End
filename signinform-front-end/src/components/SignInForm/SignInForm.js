import React, { useContext, useState } from "react";
//Logos
import GoogleLogo from "./assets/GoogleLogo.jpg";
import GitHubLogo from "./assets/GitHubLogo.jpg";
//CSS
import styles from "./SignInForm.module.css";
// Context
import { myContext } from "../../Context";
const SignInForm = (props) => {
  const {
    fetchCsrf,
    csrfToken,
    signInEmailInput,
    onEmailChange,
    signInPasswordInput,
    onPasswordChange,
  } = useContext(myContext);
  //Google OAuth2.0 button
  const googleLogin = () => {
    sessionStorage.setItem("authenticated", "true"); //set authnetication to session storage
    fetchCsrf(); // create new csrfToken after logging out
    window.open(
      "https://signinform-back-end.onrender.com/auth/google",
      //"http://localhost:3050/auth/google",
      "_self"
    );
  };
  //GitHub OAuth 2.0 button
  const gitHubLogin = () => {
    sessionStorage.setItem("authenticated", "true"); //set authnetication to session storage
    fetchCsrf(); // create new csrfToken after logging out
    window.open(
      "https://signinform-back-end.onrender.com/auth/github/callback",
      "_self"
    );
  };
  const [getUserName, setGetUserName] = useState(false);
  //Sign In button press function
  const onSignInButtonPress = async (event) => {
    //to prevent refresh of the webpage
    event.preventDefault();
    try {
      const response = await fetch(
        "https://signinform-back-end.onrender.com/signin",
        // "http://localhost:3050/signin",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          body: JSON.stringify({
            email: signInEmailInput.trim(),
            password: signInPasswordInput.trim(),
          }),
          credentials: "include",
          mode: "cors",
        }
      );
      if (response.ok) {
        const data = response.json();
        if (data && data.user) {
          setGetUserName(data.user.name);
          sessionStorage.setItem("authenticated", "true"); //set authnetication to session storage
          fetchCsrf(); // create new csrfToken after logging out
        }
      }
    } catch (error) {
      console.log("error message is: ", error);
      if (error.response)
        error.response
          .text()
          .then((text) => console.log("catch block: ", text));
    }
  };
  return (
    <div>
      <main className="pa4 black-80">
        <form className="measure center" onSubmit={onSignInButtonPress}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            {/* Sign In title */}
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>

            <div className="mt3">
              {/* Email lable */}
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              {/* Email Input */}
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>

            <div className="mv3">
              {/* Password lable */}
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              {/* Password Input */}
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>

          <div className="">
            {/* Sign In button */}
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>

          <div className="lh-copy mt3">
            {/* Sign Up link */}
            <a href="/signup" className="f6 link dim black db">
              Sign up
            </a>
            <div className="flex flex-row items-center">
              {/* Log in With Google */}
              <div className="flex flex-row items-center pr3">
                <div className={styles.googleContainer} onClick={googleLogin}>
                  <img alt="" src={GoogleLogo} width={30} />
                  <p> Login with Google </p>
                </div>
              </div>
              {/* Log in With Github */}
              <div className="flex flex-row items-center pr3">
                <div
                  className={`${styles.googleContainer} ${styles.githubContainer}`}
                  onClick={gitHubLogin}
                >
                  <img alt="" src={GitHubLogo} width={30} />
                  <p> Login with GitHub </p>
                </div>
              </div>
            </div>
            {getUserName ? <h1> Welcome Back {getUserName}</h1> : null}
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignInForm;
