import BookProcess from "../../components/Book/BookProcess";

function Process() {
  const rooms = [
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
  return (
    <>
      <BookProcess values={rooms} />
    </>
  );
}

export default Process;
