import React, { useState } from "react";
import ReactDOM from "react-dom";
import UserContainer from '../user/user-container'

import "./styles.css";
import * as API_USERS from "../user/api/user-api";

import {
    BrowserRouter,
    Switch, // instead of "Switch"
    Route,
} from "react-router-dom";


function Login() {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const errors = {
        email: "invalid username",
        password: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var {emailInput, passwordInput} = document.forms[0];

        console.log("Email:" + emailInput.value);
        console.log("Pass:" + passwordInput.value);


        let loginRequest = {
            email: emailInput.value,
            password: passwordInput.value
        };

        API_USERS.login(loginRequest, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successful login! " + result);
                if (result.isAdmin === 1) {
                    window.open('/admin/manageUsers', '_self', 'noopener,noreferrer');
                }
                else {
                    window.open('/home', '_self', 'noopener,noreferrer');
                }
            } else {
                console.log("Invalid credentials!");
                alert("Invalid credentials!");
                setErrorMessages({ name: "email", message: errors.email });
            }
        });

        // // Compare user info
        // if (userData) {
        //     if (userData.password !== pass.value) {
        //         // Invalid password
        //         setErrorMessages({ name: "pass", message: errors.pass });
        //     } else {
        //         setIsSubmitted(true);
        //     }
        // } else {
        //     // Username not found
        //     setErrorMessages({ name: "email", message: errors.email });
        // }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="emailInput" required />
                    {renderErrorMessage("emailInput")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="passwordInput" required />
                    {renderErrorMessage("passwordInput")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}

export default Login;