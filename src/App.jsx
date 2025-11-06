import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./page/HomePage/Home";
import Login from "./page/LoginPage/Login";
import NavBar from "./components/Navbar/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
