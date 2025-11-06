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
          <NavLink to="#Home">Home</NavLink>
          <NavLink to="/">Rooms & Suites</NavLink>
          <NavLink to="/">About</NavLink>
          <NavLink to="/">Contact Us</NavLink>

          <div className="sign-up-btn">
            <NavLink to="/">
              <Button variant="contained">Sign Up</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
