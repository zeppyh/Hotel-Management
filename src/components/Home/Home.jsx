import "./home.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";

const HOME_BG_IMAGE_PATH = "images/home-page-bg.png";

function Home({ user }) {
  
  const [bgImageUrl, setBgImageUrl] = useState(''); 

  
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const imageReference = storageRef(storage, HOME_BG_IMAGE_PATH);
        const url = await getDownloadURL(imageReference);
        setBgImageUrl(url);
      } catch (error) {
        console.error("Error fetching home background image URL:", error);
        
        setBgImageUrl("");
      }
    };
    fetchUrl();
  }, []); 

  return (
    <>
      <div className="bg-image">
        
        <img 
          src={bgImageUrl} 
          alt="Minimalist Filipino retreat background" 
        />
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
          to={user ? "/Process" : "/LoginPage"} 
          style={{ textDecoration: 'none' }}
        >
          <Button variant="contained">Book Your Stay</Button>
        </NavLink>
      </div>
    </>
  );
}

export default Home;