import { NavLink } from "react-router";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";

import "./sign-up.css";

function SignUp() {
  return (
    <>
      <div className="signup-page">
        <div className="signup-bg-image">
          <img
            src="./src/assets/signup-bg.png"
            alt="SignUp back round picture
          "
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
                <input type="text" placeholder="Juan Dela Cruz" id="fullName" />
              </div>

              <div className="signup-form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" placeholder="your@gmail.com" id="email" />
              </div>

              <div className="signup-form-group">
                <label htmlFor="phoneNumber">Password</label>
                <input
                  type="tel"
                  placeholder="+63 912 345 6789"
                  id="phoneNumber"
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  id="password"
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  id="password"
                />
              </div>

              <div className="terms-conditions">
                <div className="remember-me">
                  <input type="checkbox" name="checkBox" id="checkBox" />
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
                <Button variant="contained">Sign Up</Button>
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
              <p>Don't have an Account?</p>
              <NavLink to="/SignUpPage" className="signup-btn">
                Sign Up
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
2;
