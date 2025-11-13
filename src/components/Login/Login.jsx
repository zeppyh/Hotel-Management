import { NavLink, Link } from "react-router";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import "./log-in.css";

function Login() {
  return (
    <>
      <div className="login-page">
        <div className="login-bg-image">
          <img src="./src/assets/login-bg.png" alt="Back Ground Image" />
        </div>

        <div className="login-container">
          <div className="login-content-container">
            <div className="login-header">
              <img src="/src/assets/icon.png" alt="Icon of Casa Diwa" />
              <h1>Create Your </h1>
              <h1>Casa Diwa Account</h1>
            </div>

            <div className="login-form">
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  id="password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                />
              </div>
            </div>

            <div className="login-option">
              <div className="remember-me">
                <input type="checkbox" name="checkBox" id="checkBox" />
                <p>Remember me</p>
              </div>
              <NavLink to="/ForgotPassword" className="forgot-btn">
                Forgot Password?
              </NavLink>
            </div>

            <div className="login-btn">
              <Button variant="contained">Login</Button>
            </div>

            <div className="login-divider">
              <div className="line"></div>
              <div>
                <p>or</p>
              </div>
              <div className="line"></div>
            </div>

            <div className="login-sign-up-btn">
              <p>Don't have an Account?</p>
              <NavLink to="/SignUp" className="signup-btn">
                Sign Up
              </NavLink>
            </div>

            <div className="back-btn">
              <Link to="/HomePage" className="btn-group">
                <div>
                  <ArrowLeft size={24} strokeWidth={0.5} className="arrow" />
                </div>
                <p> Back to Home</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
