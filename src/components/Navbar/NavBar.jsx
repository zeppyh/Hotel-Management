import { Link } from "react-scroll";
import { NavLink } from "react-router";
import Button from "@mui/material/Button";
import "./nav-bar.css";

function Home() {
  return (
    <>
      <div className="nav-bar-container">
        <div className="logo-container">
          <img src="./src/assets/icon.png" alt="Icon of Casa Diwa" />
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
            <NavLink to="/LoginPage">
              <Button variant="contained">Sign Up</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
