import RoomSuites from "../../components/Room&Suites/RoomSuites";
import Home from "../../components/Home/Home";
import AboutUs from "../../components/AboutUs/AboutUs";
import ContactUs from "../../components/ContactUs/ContactUs";
import { useState, useEffect, useCallback } from "react";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";

// --- Constants (No Change) ---
const initialValues = [
  {
    id: 1,
    imagePath: "images/sustainability.jpg",
    title: "Sustainability",
    paragraph:
      "We honor the earth through eco-conscious practices and locally-sourced materials",
  },
  {
    id: 2,
    imagePath: "images/community.jpg",
    title: "Community",
    paragraph:
      "Supporting local artisans and celebrating Filipino craftsmanship in every detail.",
  },
  {
    id: 3,
    imagePath: "images/mindfulness.jpg",
    title: "Mindfulness",
    paragraph:
      "Creating spaces that encourage presence, reflection, and genuine connection.",
  },
];

const initialRoomData = [
  {
    id: 1,
    imagePath: "images/standard-room.jpg",
    roomName: "Standard Rooms",
    roomDescription:
      "Cozy and intimate space with Filipino-inspired minimalist design. Perfect for solo travelers or couples seeking tranquility.",
    guests: "1-2 Persons", sqm: "25", view: "Garden View", price: "3,500",
    amenities: { wifi: "Free Wifi", airConditon: "Air Conditioning", tv: "TV", bathroom: "Private Bathroom" },
  },
  {
    id: 2,
    imagePath: "images/deluxe-suite.jpg",
    roomName: "Deluxe Suite",
    roomDescription: "Spacious retreat with natural materials and abundant sunlight. Experience comfort elevated by thoughtful design.",
    guests: "1-3 Persons", sqm: "40 sqm", view: "Balcony", price: "5,800",
    amenities: { wifi: "Free Wifi", airConditon: "Air Conditioning", tv: "TV", breakfast: "Breakfast Included", balcony: "Balcony" },
  },
  {
    id: 3,
    imagePath: "images/executive-suite.jpg",
    roomName: "Executive Suite",
    roomDescription: "Spacious retreat with natural materials and abundant sunlight. Experience comfort elevated by thoughtful design.",
    guests: "3-4 Persons", sqm: "60 sqm", view: "Private Terrace", price: "8,900",
    amenities: { wifi: "Free Wifi", airConditon: "Air Conditioning", tv: "TV", breakfast: "Breakfast Included", livingArea: "Living Area", view: "Ocean View" },
  },
];

const HOME_BG_IMAGE_PATH = "images/home-page-bg.png"; // Path for the background image


function LandingPage({ user }) {
  const [values, setValues] = useState(initialValues);
  const [data, setData] = useState(initialRoomData);
  // NEW: State for the single background image URL
  const [homeBgUrl, setHomeBgUrl] = useState('');

  const useFetchFirebaseUrls = (initialDataSet, setDataSet) => {
    const fetchImageUrls = useCallback(async () => {
      const updatedData = await Promise.all(
        initialDataSet.map(async (item) => {
          if (!item.imagePath) return item;

          try {
            const imageReference = storageRef(storage, item.imagePath);
            const url = await getDownloadURL(imageReference);
            return { ...item, image: url };
          } catch (error) {
            console.error(`Error fetching image URL for ${item.imagePath}:`, error);
            return { ...item, image: "" };
          }
        })
      );
      setDataSet(updatedData);
    }, [initialDataSet, setDataSet]);

    useEffect(() => {
      fetchImageUrls();
    }, [fetchImageUrls]);
  };

  // Run the hooks for room data and values
  useFetchFirebaseUrls(initialValues, setValues);
  useFetchFirebaseUrls(initialRoomData, setData);

  // NEW: Effect to fetch the single background image URL
  useEffect(() => {
    const fetchBgUrl = async () => {
      try {
        const imageReference = storageRef(storage, HOME_BG_IMAGE_PATH);
        const url = await getDownloadURL(imageReference);
        setHomeBgUrl(url);
      } catch (error) {
        console.error("Error fetching home background URL:", error);
        setHomeBgUrl("");
      }
    };
    fetchBgUrl();
  }, []);


  return (
    <>
      <div className="home-container">
        <section id="home" name="home">
          {/* PASS the fetched URL as a prop */}
          <Home user={user} bgImageUrl={homeBgUrl} />
        </section>

        <section id="room&suites" name="room&suites">
          <RoomSuites data={data} user={user} />
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