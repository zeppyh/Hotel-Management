import { Link } from "react-scroll";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db, storage } from "../../firebase-config"; // Ensure 'storage' is imported

import Button from "@mui/material/Button";
import "./nav-bar.css";
import { getDownloadURL, ref as storageRef } from "firebase/storage"; // Import storageRef

// Define the storage path for the icon
const ICON_IMAGE_PATH = "images/icon.png";

function Home({ user }) {
  // Use state to hold the dynamic icon URL
  const [iconUrl, setIconUrl] = useState(''); 
  
  // Fetch the image URL from Firebase Storage on mount
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const imageReference = storageRef(storage, ICON_IMAGE_PATH);
        const url = await getDownloadURL(imageReference);
        setIconUrl(url);
      } catch (error) {
        console.error("Error fetching icon image URL:", error);
        setIconUrl("");
      }
    };
    fetchUrl();
  }, []); 

  function logOut() {
    auth.signOut();
    alert("Logged out successfully");
  }

  return (
    <>
      <div className="nav-bar-container">
        <div className="logo-container">
          {/* Use the dynamically fetched URL */}
          <img src={iconUrl} alt="Icon of Casa Diwa" />
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
            {!user && (
              <Link to="/SignUpPage">
                <Button variant="contained">Sign Up</Button>
              </Link>
            )}

            {user && (
              <NavLink to="/LoginPage">
                <Button variant="contained" onClick={logOut}>
                  Logout
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;