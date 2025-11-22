import "./home.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router";
import StorageImage from "../Shared/StorageImage";

function Home({ user }) {

  return (
    <>
      <div className="bg-image">
        <StorageImage path="images/home-page-bg.png" fallbackSrc="/src/assets/home-page-bg.png" alt="Home background" />
      </div>
      <div className="image-trade-name">
        <h1>Casa Diwa</h1>
        <h2>Where Simplicity Meets Soul</h2>
        <p>
          A minimalist Filipino retreat for rest and renewal. Discover
          tranquility in <br /> every moment, where nature and heritage embrace
          modern comfort.
        </p>
      </div>
      <div className="book-btn">
        <NavLink
          to={user ? "/Process" : "/LoginPage"} // Check if user exists before routing
          style={{ textDecoration: 'none' }}
        >
          <Button variant="contained">Book Your Stay</Button>
        </NavLink>
      </div>
    </>
  );
}

export default Home;
