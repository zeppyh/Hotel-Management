import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./page/LandingPage/LandingPage";
import SignUpPage from "./page/SignUpPage/SignUpPage";
import LoginPage from "./page/LoginPage/LoginPage";
import LandingPageRoute from "./routes/public-routes/LandingPageRoute";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
