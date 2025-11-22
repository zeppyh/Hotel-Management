import { NavLink } from "react-router";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../firebase-config";
import { ref, set } from "firebase/database";
import { db } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import "./sign-up.css";

// REGEX CONSTANTS
//(10 or 11 digits, starting with 09 or +639 or just 9)
const PHONE_REGEX = /^(09|\+639|9)\d{9}$/;
// Standard Email Regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Password Regex: Minimum 8 characters, at least one uppercase letter
const PASSWORD_REGEX = /^(?=.*[A-Z]).{8,}$/;


function SignUp() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);


  function saveData(user) {
    let data = {
      phoneNumber: phoneNumber,
      fullName: fullName,
      email: email,
      role: "customer"

    }
    return set(ref(db, `users/${user.uid}`), data);
  }


  function handleSignUp() {
    // Basic Field Validation
    if (!fullName || !email || !password || !phoneNumber || !confirmPassword) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Password Match Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Terms Agreement Validation
    if (!agreeTerms) {
      alert("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }
    
    // REGEX VALIDATION
    if (!EMAIL_REGEX.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    if (!PHONE_REGEX.test(phoneNumber)) {
        alert("Please enter a valid Philippine phone number (e.g., 09xxxxxxxxx or +639xxxxxxxxx).");
        return;
    }
    
    if (!PASSWORD_REGEX.test(password)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        return saveData(user);
      })
      .then(() => {
        alert("User registered successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message);
      });

  };





  return (
    <>
      <div className="signup-page">
        <div className="signup-bg-image">
          <img
            src="./src/assets/signup-bg.png"
            alt="SignUp back round picture"
          />
        </div>

        <div className="signup-container">
          <div className="signup-content-container">
            <div className="signup-header">
              <img src="/src/assets/icon.png" alt="Icon of Casa Diwa" />
              <h1>Create Your </h1>
              <h1>Casa Diwa Account</h1>
            </div>

            <div className="signup-form">
              <div className="signup-form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  onChange={(e) => setFullName(e.target.value)} 
                  type="text" 
                  placeholder="Enter your full name" 
                  id="fullName" 
                  value={fullName}
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="email" 
                  placeholder="Enter your email address" 
                  id="email" 
                  value={email}
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="phoneNumber">Phone Number (Philippine Format)</label>
                <input
                  type="tel"
                  placeholder="e.g., 09xxxxxxxxx or +639xxxxxxxxx"
                  id="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="password">Password (Min. 8 chars, 1 Uppercase)</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm your password"
                  id="confirmPassword"
                  value={confirmPassword}
                />
              </div>

              <div className="terms-conditions">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <p>
                    I agree to the{" "}
                    <NavLink to="/" className="text-color">
                      Terms & Conditions
                    </NavLink>{" "}
                    and{" "}
                    <NavLink to="/" className="text-color">
                      Privacy Policy
                    </NavLink>
                  </p>
                </div>
              </div>
              <div className="sign-up-btn">
                <Button variant="contained"
                  onClick={handleSignUp}
                >Sign Up</Button>
              </div>

              <div className="signup-divider">
                <div className="line"></div>
                <div>
                  <p>or</p>
                </div>
                <div className="line"></div>
              </div>
            </div>

            <div className="sign-btn">
              <p>Already a Member?</p>
              <NavLink to="/LoginPage" className="signup-btn">
                Login Here
              </NavLink>
            </div>

            <div className="sign-back-btn">
              <NavLink to="/" className="sign-btn-group">
                <div>
                  <ArrowLeft size={24} strokeWidth={2} className="arrow" />
                </div>
                <p> Back to Home</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;