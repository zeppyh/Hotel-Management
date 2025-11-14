import { Link } from "react-scroll";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../../firebase-config";

import Button from "@mui/material/Button";
import "./nav-bar.css";
import { getDownloadURL } from "firebase/storage";

function Home({ user }) {


  function logOut() {
    auth.signOut();
    alert("Logged out successfully");

  }


  return (
    <>
      <div className="nav-bar-container">
        <div className="logo-container">
          <img src="./src/assets/icon.png" alt="Icon of Casa Diwa" />
          {/* EDIT FOR STORAGE*/}
          <h1>Casa Diwa</h1>
        </div>

        <div className="link">
          <ul>
            <li>
              <Link to="home" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link to="room&suites" smooth={true} duration={500}>
                Room & Suites
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} duration={500}>
                About
              </Link>
            </li>
            <li>
              <Link to="contact-us" smooth={true} duration={500}>
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="sign-up-btn">
            {!user &&
              <NavLink to="/SignUpPage">
                <Button variant="contained">Sign Up</Button>
              </NavLink>
            }

            {user &&
              <NavLink to="/LoginPage">
                <Button variant="contained" onClick={logOut} >Logout</Button>
              </NavLink>
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
