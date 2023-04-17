import React, {useState} from 'react';

const SignInForm = (props) => {
    
    const [signInEmailInput, setSignInEmailInput]       = useState("");
    const [signInPasswordInput, setSignInPasswordInput] = useState("");
    const [getUserName, setGetUserName] = useState(null);
    //get email input
    const onEmailChange = (event) => {setSignInEmailInput(event.target.value)};
    //get password input
    const onPasswordChange = (event) => {setSignInPasswordInput(event.target.value)};
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
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error ('Network response was not ok');
            }
        })
        .then((data) => {
             setGetUserName(data.user.name);
            if(data && data.user) {
                props.loadUsersDataFromDatabase(data);
                props.SignInPageConditionChangeFunction();
            };
        })
        .catch((error) => {
            console.log("error message is: ", error);
            if(error.response) error.response.text().then((text)=> console.log(text))
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
                            <input type="checkbox"  />
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
                            href="#0"
                            className="f6 link dim black db"
                            onClick={props.SignUpPageConditionChangeFunction}
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