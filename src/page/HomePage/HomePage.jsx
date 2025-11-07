import RoomSuites from "../../components/Room&Suites/RoomSuites";
import Home from "../../components/LandingPage/Home";
import "./home-page.css";
import { useState } from "react";

function HomePage() {
  const [data] = useState([
    {
      id: 1,
      image: "./src/assets/standard-room.jpg",
      roomName: "Standard Rooms",
      roomDescription:
        "Cozy and intimate space with Filipino-inspired minimalist design. Perfect for solo travelers or couples seeking tranquility.",
      guests: "1-2 Persons",
      sqm: "25",
      view: "Garden View",
      price: "3,500",
    },
    {
      id: 2,
      image: "./src/assets/deluxe-suite.jpg",
      roomName: "Deluxe Suite",
      roomDescription:
        "Spacious retreat with natural materials and abundant sunlight. Experience comfort elevated by thoughtful design.",
      guests: "1-3 Persons",
      sqm: "40 sqm",
      view: "Balcony",
      price: "5,800",
    },
    {
      id: 3,
      image: "./src/assets/executive-suite.jpg",
      roomName: "Executive Suite",
      roomDescription:
        "Spacious retreat with natural materials and abundant sunlight. Experience comfort elevated by thoughtful design.",
      guests: "3-4 Persons",
      sqm: "60 sqm",
      view: "Private Terrace",
      price: "8,900",
    },
  ]);
  return (
    <>
      <div className="home-container">
        <section id="home" name="home">
          <Home />
        </section>

        <section id="room&suites" name="room&suites">
          <RoomSuites data={data} />
        </section>

        <section id="about" name="about">
          <RoomSuites />
        </section>

        <section id="contact" name="contact">
          <RoomSuites />
        </section>
      </div>
    </>
  );
}

export default HomePage;
