import BookProcess from "../../components/Book/BookProcess";
import { useState, useEffect } from "react";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config"; 

const initialRooms = [
  {
    id: 1,
    imagePath: "images/standard-room.jpg", 
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
    imagePath: "images/deluxe-suite.jpg", 
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
    imagePath: "images/executive-suite.jpg", 
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
];

function Process({ user }) {
  const [rooms, setRooms] = useState(initialRooms);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const updatedRooms = await Promise.all(
        initialRooms.map(async (room) => {
          if (!room.imagePath) return room;

          try {
            const imageReference = storageRef(storage, room.imagePath);
            const url = await getDownloadURL(imageReference);
            return { ...room, image: url };
          } catch (error) {
            console.error(`Error fetching image URL for ${room.imagePath}:`, error);
            return { ...room, image: "" }; 
          }
        })
      );
      setRooms(updatedRooms);
    };

    fetchImageUrls();
  }, []); 


  return (
    <>
      <BookProcess values={rooms} user={user} />
    </>
  );
}

export default Process;