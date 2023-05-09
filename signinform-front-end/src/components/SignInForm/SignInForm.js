import React, {useState} from 'react';
//Logos
import GoogleLogo from './assets/GoogleLogo.jpg';
import TwitterLogo from './assets/TwitterLogo.png';
import GitHubLogo from './assets/GitHubLogo.jpg';
//CSS
import styles from './SignInForm.module.css';

const SignInForm = (props) => {
    
    const [signInEmailInput, setSignInEmailInput]       = useState("");
    const [signInPasswordInput, setSignInPasswordInput] = useState("");
    const [getUserName, setGetUserName] = useState(false);
    //destructuring props
    const { loadUsersDataFromDatabase } = props;
    //get email input
    const onEmailChange = (event) => {setSignInEmailInput(event.target.value)};
    //get password input
    const onPasswordChange = (event) => {setSignInPasswordInput(event.target.value)};
    //Google OAuth2.0 button
    const googleLogin = () => {window.open('http://localhost:3050/auth/google', '_self')};
    //GitHub OAuth 2.0 button
    const gitHubLogin = () => {window.open('http://localhost:3050/auth/github/callback', "_self")};
    //Twitter OAuth 2.0 button
    const twitterLogin = () => {};
    //Sign In button press function
    const onSignInButtonPress = (event) => {
        //to prevent refresh of the webpage
        event.preventDefault();
        //connecting to back-end server to fetch data from database
        fetch("http://localhost:3050/signin", {
            method  : 'post',
            headers : {'Content-Type' : 'application/json'},
            body    : JSON.stringify({
                    email      : signInEmailInput.trim(),
                    password   : signInPasswordInput.trim()
            })
        })
        .then((response) => {
            if(response.ok) { return response.json() }
            else { throw new Error ('Network response was not ok') }
        })
        .then((data) => {
            console.log(data)
             setGetUserName(data.user.name);
            
            if(data && data.user) {
                loadUsersDataFromDatabase(data);
                 console.log('Success')
            };
        })
        .catch((error) => {
            console.log("error message is: ", error);
            if(error.response) error.response.text().then((text)=> console.log("catch block: ",text))
        })
    }; 
    return(
        <div>
            <main className="pa4 black-80">
                <form className="measure center" onSubmit={onSignInButtonPress} >

                    <fieldset
                        id="sign_up"
                        className="ba b--transparent ph0 mh0"
                        >
                            {/* Sign In title */}
                        <legend className="f4 fw6 ph0 mh0">
                            Sign In     
                        </legend>

                        <div className="mt3">
                            {/* Email lable */}
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="email-address"
                            >
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
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="password"
                            >
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
                            {/* Remember me checkbox */}
                        <label className="pa0 ma0 lh-copy f6 pointer">
                            <input type="checkbox" name='remember' />
                            Remember me
                        </label>

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
                        <a
                            href="/signup"
                            className="f6 link dim black db"
                           
                        >
                            Sign up
                        </a>
                            {/* Forgot Password link */}
                        <a
                            href="#0"
                            className="f6 link dim black db"
                        >
                        Forgot your password?
                        </a>
                        <div className='flex flex-row items-center'>
                            {/* Log in With Google */}
                            <div className='flex flex-row items-center pr3'>
                                <div className={styles.googleContainer} onClick={googleLogin} > 
                                    <img alt='' src={GoogleLogo} width={30} />
                                    <p> Login with Google </p>
                                </div>
                            </div>
                            {/* Log in With Github */}
                            <div className='flex flex-row items-center pr3'>
                                <div className={`${styles.googleContainer} ${styles.githubContainer}`} onClick={gitHubLogin} > 
                                    <img alt='' src={GitHubLogo} width={30} />
                                    <p> Login with GitHub </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Log in With Twitter */}
                            <div className='flex flex-row items-center pr3'>
                                <div className={styles.twitterContainer} onClick={twitterLogin} >
                                    <img alt='' src={TwitterLogo} width={30} />
                                    <p> Login with Twitter </p>
                                </div>
                            </div>
                        </div>
                        {
                            getUserName  ? 
                            <h1> Welcome Back {getUserName}</h1>
                            :
                            null
                        }
                    </div>
                </form>
            </main>
        </div>
    )
};

export default SignInForm;
