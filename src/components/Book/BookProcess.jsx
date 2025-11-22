import "./book-process.css";
import "../AboutUs/about-us.css";
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
                <div className="half">
                  <label className="dropdown-label">Adults</label>
                  <FormControl fullWidth>
                    <Select defaultValue="" displayEmpty>
                      <MenuItem value="">Pax</MenuItem>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num} Adult
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="half">
                  <label className="dropdown-label">Children</label>
                  <FormControl fullWidth>
                    <Select defaultValue="" displayEmpty>
                      <MenuItem value="">Pax</MenuItem>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num} Child
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <button className="check-btn">Check Availability</button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="rooms-wrapper">
            <div className="booking-summary">
              <div className="booking-summary-content">
                <div>
                  <h4>Booking Summary</h4>
                </div>
              </div>
            </div>
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
          <div className="step-content">
            <h2>Payment</h2>
            <p>Payment form goes here.</p>
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
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleFinish}
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
