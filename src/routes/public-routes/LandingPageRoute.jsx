import { Outlet } from "react-router";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

function LandingPageRoute({user}) {
  return (
    <>
      <NavBar user={user} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LandingPageRoute;
