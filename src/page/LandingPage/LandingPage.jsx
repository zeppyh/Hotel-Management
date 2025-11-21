import RoomSuites from "../../components/Room&Suites/RoomSuites";
import Home from "../../components/Home/Home";
import AboutUs from "../../components/AboutUs/AboutUs";
import ContactUs from "../../components/ContactUs/ContactUs";
import { useState } from "react";

function LandingPage() {
  const [values] = useState([
    {
      id: 1,
      image: "./src/assets/sustainability.jpg",
      // EDIT FOR STORAGE
      title: "Sustainability",
      paragraph:
        "We honor the earth through eco-conscious practices and locally-sourced materials",
    },
    {
      id: 2,
      image: "./src/assets/community.jpg",
      // EDIT FOR STORAGE

      title: "Community",
      paragraph:
        "Supporting local artisans and celebrating Filipino craftsmanship in every detail.",
    },
    {
      id: 3,
      image: "./src/assets/mindfulness.jpg",
      // EDIT FOR STORAGE

      title: "Mindfulness",
      paragraph:
        "Creating spaces that encourage presence, reflection, and genuine connection.",
    },
  ]);
  const [data] = useState([
    {
      id: 1,
      image: "./src/assets/standard-room.jpg",
      // EDIT FOR STORAGE

      roomName: "Standard Rooms",
      roomDescription:
        "Cozy and intimate space with Filipino-inspired minimalist design. Perfect for solo travelers or couples seeking tranquility.",
      guests: "1-2 Persons",
      sqm: "25",
      view: "Garden View",
      price: "3,500",
      amenities: {
        wifi: "Free Wifi",
        airConditon: "Air Conditioning",
        tv: "TV",
        bathroom: "Private Bathroom",
      },
    },
    {
      id: 2,
      image: "./src/assets/deluxe-suite.jpg",
      // EDIT FOR STORAGE

      roomName: "Deluxe Suite",
      roomDescription:
        "Spacious retreat with natural materials and abundant sunlight. Experience comfort elevated by thoughtful design.",
      guests: "1-3 Persons",
      sqm: "40 sqm",
      view: "Balcony",
      price: "5,800",
      amenities: {
        wifi: "Free Wifi",
        airConditon: "Air Conditioning",
        tv: "TV",
        breakfast: "Breakfast Included",
        balcony: "Balcony",
      },
    },
    {
      id: 3,
      image: "./src/assets/executive-suite.jpg",
      // EDIT FOR STORAGE

      roomName: "Executive Suite",
      roomDescription:
        "Spacious retreat with natural materials and abundant sunlight. Experience comfort elevated by thoughtful design.",
      guests: "3-4 Persons",
      sqm: "60 sqm",
      view: "Private Terrace",
      price: "8,900",
      amenities: {
        wifi: "Free Wifi",
        airConditon: "Air Conditioning",
        tv: "TV",
        breakfast: "Breakfast Included",
        livingArea: "Living Area",
        view: "Ocean View",
      },
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
          <AboutUs values={values} />
        </section>

        <section id="contact-us" name="contact-us">
          <ContactUs values={values} />
        </section>
      </div>
    </>
  );
}

export default LandingPage;
