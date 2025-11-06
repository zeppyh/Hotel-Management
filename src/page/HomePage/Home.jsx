import "./home.css";
import { Button } from "@mui/material";

function Home() {
  return (
    <>
      <div className="home-container">
        <section id="Home">
          <div>
            <img src="./src/assets/home-page-bg.png" alt="" />
          </div>
          <div className="image-trade-name">
            <h1>Casa Diwa</h1>
            <h2>Where Simplicity Meets Soul</h2>
            <p>
              A minimalist Filipino retreat for rest and renewal. Discover
              tranquility in <br /> every moment, where nature and heritage
              embrace modern comfort.
            </p>
          </div>
          <div className="book-btn">
            <Button variant="contained">Book Your Stay</Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
