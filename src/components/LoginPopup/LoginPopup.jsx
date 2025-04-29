import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin, setLoggedInUser }) => {
    const [currState, setCurrState] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleAction = () => {
        if (currState === "Sign Up") {
            const existingUser = JSON.parse(localStorage.getItem(email));
            if (existingUser) {
                setMessage("User already exists. Please login.");
            } else {
                localStorage.setItem(
                    email,
                    JSON.stringify({ name, email, password })
                );
                setMessage("Account created successfully! You can now log in.");
                setCurrState("Login");
            }
        } else if (currState === "Login") {
            const existingUser = JSON.parse(localStorage.getItem(email));
            if (existingUser && existingUser.password === password) {
                setMessage(`Welcome back, ${existingUser.name}!`);
                setLoggedInUser(existingUser.name); // Set the logged-in user's name
                setTimeout(() => setShowLogin(false), 1500); // Close popup after success
            } else {
                setMessage("Invalid email or password.");
            }
        }
    };

    return (
        <div className="login-popup">
            <div className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleAction}>
                    {currState === "Login" ? "Login" : "Create account"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" />
                    <p>
                        By continuing, I agree to the terms of use & privacy
                        policy.
                    </p>
                </div>
                <p className="login-popup-message">{message}</p>
                {currState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span onClick={() => setCurrState("Sign Up")}>
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrState("Login")}>
                            Login here
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginPopup;
