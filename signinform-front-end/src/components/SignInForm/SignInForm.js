import React from 'react';

const SignInForm = () => {
    return(
        <div>
            <main className="pa4 black-80">
                <form className="measure center">

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
                                for="email-address"
                            >
                                Email   
                            </label>
                            {/* Email Input */}
                            <input      
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                            />      
                        </div>

                        <div className="mv3">
                                {/* Password lable */}
                            <label
                                className="db fw6 lh-copy f6"
                                for="password"
                            >
                            Password
                            </label>
                                {/* Password Input */}
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>
                            {/* Remember me checkbox */}
                        <label className="pa0 ma0 lh-copy f6 pointer">
                            <input type="checkbox" />
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
                    </div>
                </form>
            </main>
        </div>
    )
};

export default SignInForm;
