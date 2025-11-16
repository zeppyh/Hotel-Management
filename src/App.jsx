import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./page/LandingPage/LandingPage";
import SignUpPage from "./page/SignUpPage/SignUpPage";
import LoginPage from "./page/LoginPage/LoginPage";
import LandingPageRoute from "./routes/public-routes/LandingPageRoute";
import Admin from "./page/AdminPannel/Admin";
import UserPanel from "./routes/private-routes/UserPanel";
import Overview from "./components/AdminFeatures/Overview/Overview";
import Booking from "./components/AdminFeatures/Bookings/Booking";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "./firebase-config";


function App() {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        onValue(ref(db, `users/${user.uid}`), (snapshot) => {
          setHasData(snapshot.exists());
          setLoading(false);
        })
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);
  if (loading) { return <></> }

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<LandingPageRoute user={user} />}>

            <Route path="/" element={<LandingPage />} />
            <Route path="/*" element={<LandingPage />} />
          </Route>

          <Route path="/SignUpPage" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
