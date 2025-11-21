import "./book-process.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function BookProcess() {
  const steps = ["Registration", "Room Selection", "Payment"];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleFinish = () => alert("Booking complete!");

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
                  <input type="date" placeholder="Pick a Date" id="date" />
                </div>
              </div>

              {/* Check-out */}
              <div className="form-group">
                <label>Check-out Date</label>
                <div className="input-box">
                  <span className="icon">📅</span>
                  <input type="date" placeholder="Pick a Date" id="date" />
                </div>
              </div>

              <div className="row">
                {/* Adults */}
                <div className="form-group half">
                  <label className="pax-header">Adults</label>
                  <select>
                    <option>Pax</option>
                    <option>1 Adult</option>
                    <option>2 Adult</option>
                    <option>3 Adult</option>
                    <option>4 Adult</option>
                    <option>5 Adult</option>
                  </select>
                </div>

                {/* Children */}
                <div className="form-group half">
                  <label>Children</label>
                  <select>
                    <option>Pax</option>
                    <option>1 Children</option>
                    <option>2 Children</option>
                    <option>3 Children</option>
                    <option>4 Children</option>
                    <option>5 Children</option>
                  </select>
                </div>
              </div>

              <button className="check-btn">Check Availability</button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <h2>Select a Room</h2>
            <p>Room options will appear here.</p>
            {/* Insert your room selection UI here */}
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Payment</h2>
            <p>Payment form goes here.</p>
            {/* Insert payment component here */}
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

        {/* Step Content Card */}
        <div className="book-step-card">
          {renderStepContent(activeStep)}

          {/* Navigation Buttons */}
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
              <Button variant="contained" onClick={handleNext}>
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
