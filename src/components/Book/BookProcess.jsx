import "./book-process.css";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
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

              {/* Adults + Children Row */}
              <div className="row">
                {/* Adults */}
                <div className="half">
                  <label className="dropdown-label">Adults</label>
                  <FormControl fullWidth>
                    <Select
                      defaultValue=""
                      displayEmpty
                      sx={{
                        borderRadius: "25px",
                        height: "50px",
                        textAlign: "left",
                        "& .MuiSelect-select": {
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d8a788",
                          borderRadius: "25px",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <span
                          style={{
                            color: "#555",
                          }}
                        >
                          Pax
                        </span>
                      </MenuItem>
                      <MenuItem value={1}>1 Adult</MenuItem>
                      <MenuItem value={2}>2 Adult</MenuItem>
                      <MenuItem value={3}>3 Adult</MenuItem>
                      <MenuItem value={4}>4 Adult</MenuItem>
                      <MenuItem value={5}>5 Adult</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Children */}
                <div className="half">
                  <label className="dropdown-label">Children</label>
                  <FormControl fullWidth>
                    <Select
                      defaultValue=""
                      displayEmpty
                      sx={{
                        borderRadius: "25px",
                        height: "50px",
                        textAlign: "left",
                        "& .MuiSelect-select": {
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d8a788",
                          borderRadius: "25px",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <span
                          style={{
                            color: "#555",
                            display: "flex",
                            alignItems: "baseline",
                          }}
                        >
                          Pax
                        </span>
                      </MenuItem>
                      <MenuItem value={1}>1 Children</MenuItem>
                      <MenuItem value={2}>2 Children</MenuItem>
                      <MenuItem value={3}>3 Children</MenuItem>
                      <MenuItem value={4}>4 Children</MenuItem>
                      <MenuItem value={5}>5 Children</MenuItem>
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
          <div className="room-selection-wrapper">
            <div className="room-selection-content">
              <h2>Select a Room</h2>
              <p>Room options will appear here.</p>
            </div>
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
