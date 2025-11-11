import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./page/HomePage/HomePage";
import Login from "./page/LoginPage/Login";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavBar />
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="*" element={<Login />} />
        </Routes>

        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
