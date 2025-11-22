import { NavLink } from "react-router"; 
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { get, ref } from "firebase/database";
import { useState } from "react";
import "./log-in.css";
import StorageImage from "../Shared/StorageImage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userRef = ref(db, `users/${user.uid}`);

        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists() && snapshot.val().role === "admin") {
              window.location.href = "/AdminPannel/Overview";
            } else {
              window.location.href = "/";
            }
          })
          .catch((dbError) => {
            console.error("Error fetching user data:", dbError);
            alert(
              "Login successful, but couldn't get user role. Sending to home."
            );
            window.location.href = "/";
          });
      })
      .catch((authError) => {
        alert(authError.message);
      });
  }

  return (
    <>
      <div className="login-page">
        <div className="login-bg-image">
          <StorageImage path="images/login-bg.png" fallbackSrc="/src/assets/login-bg.png" alt="Back Ground Image" />
        </div>

        <div className="login-container">
          <div className="login-content-container">
            <div className="login-header">
              <StorageImage path="images/icon.png" fallbackSrc="/src/assets/icon.png" alt="Icon of Casa Diwa" />
              <h1>Create Your </h1>
              <h1>Casa Diwa Account</h1>
            </div>

            <div className="login-form">
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter your email"
                  id="password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
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
              <Button onClick={handleLogin} variant="contained">
                Login
              </Button>
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
              <NavLink to="/SignUpPage" className="signup-btn">
                Sign Up
              </NavLink>
            </div>

            <div className="back-btn">
              <NavLink to="/" className="btn-group">
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

export default Login;
