import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./page/LandingPage/LandingPage";
import SignUpPage from "./page/SignUpPage/SignUpPage";
import LoginPage from "./page/LoginPage/LoginPage";
import LandingPageRoute from "./routes/public-routes/LandingPageRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "./firebase-config";

import Admin from "./page/AdminPannel/Admin";
import UserPanel from "./routes/private-routes/UserPanel";
import Overview from "./components/AdminFeatures/Overview/Overview";
import Booking from "./components/AdminFeatures/Bookings/Booking";
import Process from "./page/Process/Process";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // FETCH DATABASE DATA
        onValue(ref(db, `users/${user.uid}`), (snapshot) => {
          const dbData = snapshot.val();

          const mergedUser = {
            ...user,
            ...dbData,
            displayName: dbData.fullName || user.displayName
          };

          setUser(mergedUser);
          setHasData(snapshot.exists());
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <></>;
  }

  return (
    <>
      {/* BrowserRouter is the top-level router context */}
      <BrowserRouter>
        <Routes>
          {/* AUTHENTICATION ROUTES (Available ONLY if NOT logged in) */}
          {!user && (
            <>
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/SignUpPage" element={<SignUpPage />} />
            </>
          )}

          {/* 1. PUBLIC LAYOUT: Wraps pages that need NavBar/Footer */}
          <Route element={<LandingPageRoute user={user} />}>

            <Route path="/" element={<LandingPage user={user} />} />



            {/* PROTECTED CUSTOMER ROUTE (Available only if LOGGED IN) */}
            {user && (
              <Route path="/Process" element={<Process user={user} />} />
            )}

            <Route path="*" element={<LandingPage user={user} />} />

          </Route>


          {/* ADMIN PROTECTED LAYOUT*/}
          {user && user.role === "admin" && (
            <Route element={<UserPanel user={user} />}>
              <Route path="/AdminPannel" element={<Admin />} />
              <Route path="/AdminPannel/Overview" element={<Overview />} />
              <Route path="/AdminPannel/Booking" element={<Booking />} />
            </Route>
          )}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
