import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./page/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";
import SignUpPage from "./page/SignUpPage/SignUpPage";
import ErrorPage from "./page/ErrorPage/ErrorPage";
import LoginPage from "./page/LoginPage/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <>
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />
            <Route path="*" element={<ErrorPage />} />
          </>

          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
