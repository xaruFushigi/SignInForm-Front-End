import React, {useState} from 'react';
import axios from 'axios';

const SignUpForm = (props) => {
    const [userNameSignUpPage, setUserNameSignUpPage] = useState("");
    const [emailSignUpPage, setEmailSignUpPage] = useState("");
    const [passwordSignUpPage, setPasswordSignUpPage] = useState("");
    //username input
    const userNameSignUpPageFunction = (event) => {
        setUserNameSignUpPage(event.target.value);
    };
    //email input
    const emailSignUpPageFunction = (event) => {
        setEmailSignUpPage(event.target.value);
    };
    //password input
    const passwordSignUpPageFunction = (event) => {
        setPasswordSignUpPage(event.target.value);
    };

    const onSignUpButtonPress = (event) => {
        event.preventDefault();
        // axios({
        //     method : 'post',
        //     data: {
        //         email   : emailSignUpPage,
        //         name    : userNameSignUpPage,
        //         password: passwordSignUpPage
        //         },
        //     withCredentials: true,
        //     url: "http://localhost:3050/signup"
        // })
        // .then(response => {response.json()})
        fetch("http://localhost:3050/signup", {
            method: 'post',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            body : JSON.stringify({
                email   : emailSignUpPage,
                name    : userNameSignUpPage,
                password: passwordSignUpPage
            })
        })
        .then(response => {return response.json()})
        .then(data => {console.log(data)})
        .catch(error => {console.log(error)})
    }

    return (
        <div className="h-100 center">
            <div className="pv4 mid-gray sans-serif center">
                <div className="w-50 w-80-m w-50-l center cf cover bg-top bg-center">

                    <div className="w-80 w-70-m w-60-l fr bg-white">
                        <header className="pa3 bb b--light-gray relative">
                            <h1 className="b ma0 f3">Sign Up</h1>
                        </header>
                        <form id="register-form" action="" className="ph3 pt3 pb4 f7" onSubmit={onSignUpButtonPress}>
                            <div className="mb3">
                                <label htmlFor="" className="db ttu b lh-copy">Username</label>
                                <input name="username" type="text" className="input-reset w-100 mw-100 bn br1 pa2 bg-light-gray" onChange={userNameSignUpPageFunction} />
                            </div>
                            <div className="mb3">
                                <label htmlFor="" className="db ttu b lh-copy">Email</label>
                                <input name="email" type="email" className="input-reset w-100 mw-100 bn br1 pa2 bg-light-gray" onChange={emailSignUpPageFunction} />
                            </div>
                            <div className="mb4">
                                <label htmlFor="" className="db ttu b lh-copy">Password</label>
                                <input name="password" type="password" className="input-reset w-100 mw-100 bn br1 pa2 bg-light-gray"  onChange={passwordSignUpPageFunction}/>
                            </div>
                            <div className="mb3 tc f6">
                                Do you have an account? <a href="http://localhost:3000/signin" className="blue ph1">Log In Now!</a>
                            </div>
                            <div className="tc">
                                <input type="submit" value="Sign Up" className="ttu bn pv3 ph4 f6 bg-blue white b br-pill pointer grow" onClick={onSignUpButtonPress}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="tc white mt4 f6">
                    Based on <a target="_blank" href="https://dribbble.com/shots/3150554-Sign-Up" className="lightest-blue">this shot</a>.
                </div>
            </div>
    </div>
    )
};

export default SignUpForm;