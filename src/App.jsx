import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./page/LandingPage/LandingPage";
import SignUpPage from "./page/SignUpPage/SignUpPage";
import LoginPage from "./page/LoginPage/LoginPage";
import LandingPageRoute from "./routes/public-routes/LandingPageRoute";
import Admin from "./page/AdminPannel/Admin";
import UserPanel from "./routes/private-routes/UserPanel";
import Overview from "./components/AdminFeatures/Overview/Overview";
import Booking from "./components/AdminFeatures/Bookings/Booking";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPageRoute />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />

          <Route element={<UserPanel />}>
            <Route path="/AdminPannel" element={<Admin />} />
            <Route path="/AdminPannel/Overview" element={<Overview />} />
            <Route path="/AdminPannel/Booking" element={<Booking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
