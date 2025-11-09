import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./page/HomePage/HomePage";
import Login from "./page/LoginPage/Login";
import NavBar from "./components/Navbar/NavBar";

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
      </BrowserRouter>
    </>
  );
}

export default App;
