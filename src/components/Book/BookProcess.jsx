import "./book-process.css";
import { CreditCard, WalletMinimal, Hotel } from "lucide-react";
import { useState } from "react";
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

function BookProcess({ values = [] }) {
  const steps = ["Registration", "Room Selection", "Payment"];

  const [activeStep, setActiveStep] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleFinish = () => alert(`You selected: ${selectedRoom.roomName}`);

  const renderStepContent = (step) => {
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
                  <input type="date" />
                </div>
              </div>

              {/* Check-out */}
              <div className="form-group">
                <label>Check-out Date</label>
                <div className="input-box">
                  <span className="icon">📅</span>
                  <input type="date" />
                </div>
              </div>

              {/* Guests */}
              <div className="row">
                {/* Adults */}
                <div className="half">
                  <label className="dropdown-label">Adults</label>
                  <FormControl sx={{ width: 320 }} size="small">
                    <Select
                      defaultValue=""
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
                      defaultValue=""
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

                  <h3 className="room-price">₱ {room.price}</h3>

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
        );

      case 2:
        return (
          <div className="payment-container">
            <div className="left-section">
              <div className="payment-content">
                <div className="payment-header">
                  <h4>Guest Information</h4>
                </div>
                <div className="input-information">
                  <label htmlFor="firstName">Full Name*</label>
                  <input
                    type="text"
                    className="information"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="input-information">
                  <label htmlFor="email">Email Address*</label>
                  <input
                    type="email"
                    className="information"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="input-information">
                  <label htmlFor="number">Contact Number*</label>
                  <input
                    type="tel"
                    className="information"
                    placeholder="+63 000 000 0000"
                  />
                </div>
                <div className="input-information">
                  <label>Special Requests (Optional)</label>
                  <input
                    type="text"
                    className="text-field"
                    placeholder="Any special request..."
                  />
                </div>
              </div>

              {/* --- Payment Method --- */}
              <div className="payment-method-container">
                <div className="payment-method-content">
                  <div className="payment-method-header">
                    <h4>Payment Method</h4>
                  </div>
                  <div className="payment-method">
                    <CreditCard strokeWidth={1.5} size={30} color="#824921" />
                    <span>Credit / Debit Card</span>
                  </div>
                  <div className="payment-method">
                    <WalletMinimal
                      strokeWidth={1.5}
                      size={30}
                      color="#824921"
                    />
                    <span>E - Wallet</span>
                  </div>
                  <div className="payment-method">
                    <Hotel strokeWidth={1.5} size={30} color="#824921" />
                    <span>Pay at Hotel</span>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="input-information">
                  <label>Card Number*</label>
                  <input
                    type="tel"
                    className="information"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="card-info">
                  <div className="input-information">
                    <label>Expiry Date*</label>
                    <input type="month" className="information" />
                  </div>
                  <div className="input-information">
                    <label>CVV*</label>
                    <input type="number" className="information" />
                  </div>
                </div>

                <div className="input-information">
                  <label>Cardholder Name*</label>
                  <input
                    type="text"
                    className="information"
                    placeholder="Name on card"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — BOOKING SUMMARY */}
            <div className="booking-summary">
              <h4>Booking Summary</h4>

              <img src={selectedRoom?.image} className="summary-image" />

              <h3>{selectedRoom?.roomName}</h3>

              <div className="summary-details">
                <div>
                  <span className="orange">Check-in</span>
                  <span className="green">Dec 14, 2025</span>
                </div>
                <div>
                  <span className="orange">Check-out</span>
                  <span className="green">Dec 23, 2025</span>
                </div>
                <div>
                  <span className="orange">Nights</span>
                  <span className="green">9</span>
                </div>
                <div>
                  <span className="orange">Guests</span>
                  <span className="green">2 Adult, 0 Children</span>
                </div>
              </div>

              <div className="summary-price">
                <div className="divider"></div>
                <div>
                  <span className="orange">Subtotal</span>
                  <span className="green">₱76,500</span>
                </div>

                <div>
                  <span className="orange">Taxes & Fees 12%</span>
                  <span className="green">₱9,180</span>
                </div>
                <div className="divider"></div>
                <div className="total">
                  <span className="green">Total Amount</span>
                  <span className="green">₱85,680</span>
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
