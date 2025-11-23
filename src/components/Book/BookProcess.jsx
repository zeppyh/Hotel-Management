import "./book-process.css";
import { CreditCard, WalletMinimal, Hotel } from "lucide-react";
import { ref, set } from "firebase/database";

import { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";
import { db } from "../../firebase-config";

// --- Dropdown popup styling ---
const menuProps = {
  PaperProps: {
    sx: {
      borderRadius: "16px",
      boxShadow: "0 4px 18px rgba(0, 0, 0, 0.15)",
      mt: 1,
      backgroundColor: "white",
    },
  },
  MenuListProps: {
    sx: {
      padding: "6px 0",
      "& .MuiMenuItem-root": {
        padding: "10px 18px",
        fontSize: "14px",
      },
      "& .Mui-selected": {
        backgroundColor: "#8A38F5",
        color: "white",
        borderRadius: "8px",
        margin: "4px 8px",
      },
    },
  },
};

// --- Select input styling ---
const selectStyles = {
  "& .MuiOutlinedInput-root": {
    height: "45px",
    backgroundColor: "white",
    border: "1px solid #d8a788",
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  "& svg": {
    right: 12,
  },
};

function BookProcess({ values = [], user }) {
  useEffect(() => {
    if (user && user.phoneNumber) {
      setGuestContact(user.phoneNumber);
    }
  }, [user]);

  const steps = ["Registration", "Room Selection", "Payment"];

  const [activeStep, setActiveStep] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [adultCount, setAdultCount] = useState("");
  const [childCount, setChildCount] = useState("");
  const [extraChargeMessage, setExtraChargeMessage] = useState("");

  const [guestContact, setGuestContact] = useState("");
  const [guestRequest, setGuestRequest] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 365);
    return date.toISOString().split("T")[0];
  };

  const handleCheckInChange = (e) => {
    const newDate = e.target.value;
    setCheckInDate(newDate);

    if (checkOutDate && newDate > checkOutDate) {
      setCheckOutDate("");
    }
  };

  const handleChildCountChange = (e) => {
    const newCountString = e.target.value;
    setChildCount(newCountString);
    const newCount = parsePax(newCountString);

    if (newCount > 3) {
      setExtraChargeMessage(
        "A charge of ₱500 will be added to your booking total for more than 3 children."
      );
    } else if (newCount > 1) {
      setExtraChargeMessage(
        "A charge of ₱300 will be added to your booking total for more than 1 child."
      );
    } else {
      setExtraChargeMessage("");
    }
  };

  const parsePax = (str) => {
    if (!str) return 0;
    return parseInt(str.split(" ")[0]) || 0;
  };

  const getNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const saveBookingData = async (user, bookingDetails) => {
    if (!user || !user.uid) {
      throw new Error("Authentication error: User ID is missing.");
    }

    const reference = Date.now();
    const bookingRef = ref(db, `reservations/${reference}`);

    const dataToSave = {
      reference: String(reference),

      amount: bookingDetails.financials.total,
      checkIn: bookingDetails.checkInDate,
      checkOut: bookingDetails.checkOutDate,
      guestEmail: user?.email || "N/A",
      guestName: user?.fullName || user?.displayName || "N/A",
      roomType: bookingDetails.selectedRoom.roomName,
      status: "Pending",

      specialRequest: bookingDetails.guestRequest,

      userId: user.uid,
      contactNumber: bookingDetails.guestContact,
      paymentMethod: bookingDetails.paymentMethod,
      timestamp: new Date().toISOString(),
    };

    await set(bookingRef, dataToSave);
    return true;
  };
  const calculateTotal = () => {
    if (!selectedRoom) return { subtotal: 0, total: 0, extra: 0 };

    const nights = getNights();
    // Parse price
    const priceString = String(selectedRoom.price).replace(/,/g, "");
    const pricePerNight = parseFloat(priceString) || 0;

    let roomCost = pricePerNight * nights;

    const children = parsePax(childCount);
    let extraCharge = 0;

    if (children > 3) {
      extraCharge = 500;
    } else if (children > 1) {
      extraCharge = 300;
    }

    const subtotal = roomCost + extraCharge;
    const total = subtotal;

    return {
      subtotal: subtotal.toLocaleString(),
      total: total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      extra: extraCharge,
    };
  };

  const financials = calculateTotal();
  const nights = getNights();

  const handleNext = () => {
    // Validation for Step 0 (Dates & Guests)
    if (activeStep === 0) {
      const today = getTodayDate();
      const maxDate = getMaxDate();

      if (!checkInDate || !checkOutDate) {
        alert("Please select both Check-in and Check-out dates.");
        return;
      }

      // Explicitly check if Check-in is in the past
      if (checkInDate < today) {
        alert("Check-in date cannot be in the past.");
        return;
      }

      // Check max date
      if (checkInDate > maxDate || checkOutDate > maxDate) {
        alert("Booking dates cannot be more than 1 year in advance.");
        return;
      }

      if (checkOutDate <= checkInDate) {
        alert("Check-out date must be after the Check-in date.");
        return;
      }

      if (!adultCount) {
        alert("Please select at least 1 Adult.");
        return;
      }
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFinish = async () => {
    const loggedInEmail = user?.email || "";

    if (!selectedRoom) return alert("Error: No room selected.");

    // 1. Validation (Requires Email, Contact state, and Payment state)
    if (!loggedInEmail || !guestContact || !paymentMethod) {
      return alert(
        "Please ensure your Email, Contact Number, and Payment Method are selected."
      );
    }
    if (!/^\+?[0-9\s-]{10,}$/.test(guestContact)) {
      return alert("Please enter a valid contact number.");
    }

    if (paymentMethod === "Card") {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        return alert("Please complete all required card payment details.");
      }
    }

    //Data Collection for Database Save
    const bookingDetails = {
      selectedRoom,
      checkInDate,
      checkOutDate,
      nights,
      adultCount,
      childCount,
      guestContact,
      guestRequest,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
      financials: financials,
    };

    try {
      await saveBookingData(user, bookingDetails);

      alert(
        `Booking confirmed for ${selectedRoom.roomName}! Total paid: ₱${financials.total}. Confirmation will be sent to ${loggedInEmail}.`
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Database Save Error:", error);
      alert(`Booking Failed: ${error.message}`);
    }
  };

  const renderStepContent = (step) => {
    const loggedInName =
      user?.fullName || user?.displayName || "User Name Not Found";
    const loggedInEmail = user?.email || "N/A";
    const initialContact = user?.phoneNumber || ""; // Get initial contact number
    switch (step) {
      case 0:
        return (
          <div className="date-guest-wrapper">
            <h3 className="title">Select Your Dates and Guests</h3>

            <div className="date-guest-card">
              {/* Check-in */}
              <div className="form-group">
                <label>Check-in Date</label>
                <div className="input-box">
                  <span className="icon">📅</span>
                  <input
                    type="date"
                    min={getTodayDate()}
                    max={getMaxDate()}
                    value={checkInDate}
                    onChange={handleCheckInChange}
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="form-group">
                <label>Check-out Date</label>
                <div className="input-box">
                  <span className="icon">📅</span>
                  <input
                    type="date"
                    min={checkInDate || getTodayDate()}
                    max={getMaxDate()}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="row">
                {/* Adults */}
                <div className="half">
                  <label className="dropdown-label">Adults</label>
                  <FormControl sx={{ width: 320 }} size="small">
                    <Select
                      value={adultCount}
                      onChange={(e) => setAdultCount(e.target.value)}
                      displayEmpty
                      MenuProps={menuProps}
                      renderValue={(value) =>
                        value === "" ? <span>Pax</span> : value
                      }
                      sx={selectStyles}
                    >
                      <MenuItem value="">Pax</MenuItem>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={`${num} Adult`}>
                          {num} Adult
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {/* Children */}
                <div className="half">
                  <label className="dropdown-label">Children</label>
                  <FormControl sx={{ width: 320 }} size="small">
                    <Select
                      value={childCount}
                      onChange={handleChildCountChange}
                      displayEmpty
                      MenuProps={menuProps}
                      renderValue={(value) =>
                        value === "" ? <span>Pax</span> : value
                      }
                      sx={selectStyles}
                    >
                      <MenuItem value="">Pax</MenuItem>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={`${num} Child`}>
                          {num} Child
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {extraChargeMessage && (
                    <p
                      style={{
                        color: "#b91c1c",
                        fontSize: "13px",
                        marginTop: "10px",
                        textAlign: "left",
                      }}
                    >
                      {extraChargeMessage}
                    </p>
                  )}
                </div>
              </div>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6C7A51",
                  color: "#fff",
                  marginLeft: 3,
                  padding: "10px 30px",
                  borderRadius: "25px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                  width: "98%",
                  "&:hover": {
                    backgroundColor: "#404D28",
                  },
                  mt: 3,
                }}
              >
                Check Availability
              </Button>
            </div>
          </div>
        );

      case 1:
        return (
          <>
            {!selectedRoom && (
              <p
                style={{
                  color: "#b91c1c",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Please select a room before clicking Next.
              </p>
            )}
            <div className="rooms-wrapper">
              {values.map((room) => (
                <div
                  key={room.id}
                  className={`room-card ${
                    selectedRoom?.id === room.id ? "selected-room" : ""
                  }`}
                >
                  <img src={room.image} className="room-image" />

                  <div className="room-info">
                    <h2>{room.roomName}</h2>
                    <p className="room-desc">{room.roomDescription}</p>

                    <h3 className="room-price">
                      ₱ {room.price.toLocaleString()}
                    </h3>

                    {/* Amenities */}
                    <ul className="amenities-list">
                      {Object.values(room.amenities).map((a, index) => (
                        <li key={index}>✔ {a}</li>
                      ))}
                    </ul>

                    {/* Select Button */}
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        background: "#5E6B47",
                        borderRadius: 20,
                        padding: 1,
                      }}
                      onClick={() => setSelectedRoom(room)}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 2:
        return (
          <div className="payment-container">
            <div className="left-section">
              <div className="payment-content">
                <div className="payment-header">
                  <h4>Guest Information (From Account)</h4>
                </div>

                <div className="input-information">
                  <label htmlFor="firstName">Full Name*</label>
                  <input
                    type="text"
                    className="information"
                    value={loggedInName}
                    readOnly
                    style={{ backgroundColor: "#f7f4ec" }}
                  />
                </div>
                <div className="input-information">
                  <label htmlFor="email">Email Address*</label>
                  <input
                    type="email"
                    className="information"
                    value={loggedInEmail}
                    readOnly
                    style={{ backgroundColor: "#f7f4ec" }}
                  />
                </div>
                <div className="input-information">
                  <label htmlFor="number">Contact Number*</label>
                  <input
                    type="tel"
                    className="information"
                    placeholder={guestContact}
                    value={guestContact}
                    readOnly
                    style={{ backgroundColor: "#f7f4ec" }}
                    onChange={(e) => setGuestContact(e.target.value)}
                  />
                </div>
                <div className="input-information">
                  <label>Special Requests (Optional)</label>
                  <input
                    type="text"
                    className="text-field"
                    placeholder="Any special request..."
                    value={guestRequest}
                    onChange={(e) => setGuestRequest(e.target.value)}
                  />
                </div>
              </div>

              {/* --- Payment Method --- */}
              <div className="payment-method-container">
                <div className="payment-method-content">
                  <div className="payment-method-header">
                    <h4>Payment Method</h4>
                  </div>

                  {/* Payment Options (Clickable) */}
                  <div
                    className={`payment-method ${
                      paymentMethod === "Card" ? "selected-payment" : ""
                    }`}
                    onClick={() => setPaymentMethod("Card")}
                  >
                    <CreditCard strokeWidth={1.5} size={30} />
                    <span>Credit / Debit Card</span>
                  </div>
                  <div
                    className={`payment-method ${
                      paymentMethod === "E-Wallet" ? "selected-payment" : ""
                    }`}
                    onClick={() => setPaymentMethod("E-Wallet")}
                  >
                    <WalletMinimal strokeWidth={1.5} size={30} />
                    <span>E - Wallet</span>
                  </div>
                  <div
                    className={`payment-method ${
                      paymentMethod === "Hotel" ? "selected-payment" : ""
                    }`}
                    onClick={() => setPaymentMethod("Hotel")}
                  >
                    <Hotel strokeWidth={1.5} size={30} />
                    <span>Pay at Hotel</span>
                  </div>
                </div>

                {/* Conditional Card Details Input */}
                {paymentMethod === "Card" && (
                  <>
                    <div className="divider"></div>
                    <div className="input-information">
                      <label>Card Number*</label>
                      <input
                        type="tel"
                        className="information"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber} // <-- BINDING
                        onChange={(e) => setCardNumber(e.target.value)} // <-- BINDING
                      />
                    </div>

                    <div className="card-info">
                      <div className="input-information">
                        <label>Expiry Date*</label>
                        <input
                          type="month"
                          className="information"
                          value={expiryDate} // <-- BINDING
                          onChange={(e) => setExpiryDate(e.target.value)} // <-- BINDING
                        />
                      </div>
                      <div className="input-information">
                        <label>CVV*</label>
                        <input
                          type="number"
                          className="information"
                          value={cvv} // <-- BINDING
                          onChange={(e) => setCvv(e.target.value)} // <-- BINDING
                        />
                      </div>
                    </div>

                    <div className="input-information">
                      <label>Cardholder Name*</label>
                      <input
                        type="text"
                        className="information"
                        placeholder="Name on card"
                        value={cardholderName} // <-- BINDING
                        onChange={(e) => setCardholderName(e.target.value)} // <-- BINDING
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="booking-summary">
              <h4>Booking Summary</h4>

              <img src={selectedRoom?.image} className="summary-image" />

              <h3>{selectedRoom?.roomName}</h3>

              <div className="summary-details">
                <div>
                  <span>Check-in</span>
                  <span>
                    {checkInDate
                      ? new Date(checkInDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Not selected"}
                  </span>
                </div>
                <div>
                  <span>Check-out</span>
                  <span>
                    {checkOutDate
                      ? new Date(checkOutDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Not selected"}
                  </span>
                </div>
                <div>
                  <span>Nights</span>
                  <span>{nights}</span>
                </div>
                <div>
                  <span>Guests</span>
                  <span>
                    {adultCount || "0 Adult"}, {childCount || "0 Child"}
                  </span>
                </div>
                {financials.extra > 0 && (
                  <div style={{ color: "#6C7A51", fontSize: "12px" }}>
                    <span>Extra Pax Charge</span>
                    <span>+ ₱{financials.extra}</span>
                  </div>
                )}
              </div>

              <div className="summary-price">
                <div className="divider"></div>
                <div>
                  <span>Subtotal</span>
                  <span>₱{financials.subtotal}</span>
                </div>
                <div className="divider"></div>
                <div className="total">
                  <span>Total Amount</span>
                  <span>₱{financials.total}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <div className="book-process-container">
      <Box sx={{ width: 830, padding: 10 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="book-step-card">
          {renderStepContent(activeStep)}

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            <Button
              sx={{
                backgroundColor: "#b3b3b3ff",
                color: "#fff",
                padding: "10px 30px",
                border: "none",
                borderRadius: "25px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
                boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                width: "250px",
                "&:hover": {
                  backgroundColor: "#c4c3c3ff",
                },
                mt: 3,
              }}
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>

            {!isLastStep ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === 1 && !selectedRoom}
                sx={{
                  backgroundColor: "#6C7A51",
                  color: "#fff",
                  padding: "10px 30px",
                  borderRadius: "25px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                  width: "250px",
                  "&:hover": {
                    backgroundColor: "#404D28",
                  },
                  mt: 3,
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleFinish}
                disabled={activeStep === 1 && !selectedRoom}
                sx={{
                  backgroundColor: "#6C7A51",
                  color: "#fff",
                  padding: "10px 30px",
                  borderRadius: "25px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                  width: "250px",
                  "&:hover": {
                    backgroundColor: "#404D28",
                  },
                  mt: 3,
                }}
              >
                Finish
              </Button>
            )}
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default BookProcess;
