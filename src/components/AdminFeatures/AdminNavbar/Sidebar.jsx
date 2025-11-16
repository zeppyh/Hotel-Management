import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Calendar,
  DoorOpen,
  Users,
  LogOut,
} from "lucide-react";
import "./sidebar.css";
import { auth } from "../../../firebase-config";

function Sidebar({ children }) {

  function logOut() {
    auth.signOut();
    alert("Logged out successfully");

  }


  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="header">
              <img src="../../src/assets/icon.png" alt="Icon of Casa Diwa" />
              <h1>Casa Diwa</h1>
            </div>
            <p>Admin Portal</p>
            <div className="header-divider"></div>
          </div>

          <div className="links">
            <div className="nav">
              <NavLink to="/AdminPannel/Overview" className="links">
                <LayoutDashboard strokeWidth={1.75} className="icons" />
                <span> Overview</span>
              </NavLink>
            </div>

            <div className="nav">
              <NavLink to="/AdminPannel/Booking" className="links">
                <Calendar strokeWidth={1.75} className="icons" />
                <span> Bookings </span>
              </NavLink>
            </div>

            <div className="nav">
              <NavLink to="/AdminPannel/Room" className="links">
                <DoorOpen strokeWidth={1.75} className="icons" />
                <span> Rooms</span>
              </NavLink>
            </div>

            <div className="nav">
              <NavLink to="/AdminPannel/Guest" className="links">
                <Users strokeWidth={1.75} className="icons" />
                <span> Guests</span>
              </NavLink>
            </div>
          </div>
          <div className="log-out-btn">
            <div className="bottom-divider"></div>
            <NavLink onClick={logOut} to="/" className="logout-btn">
              <LogOut strokeWidth={1.75} className="logout-icon" />
              <span >Logout</span>
            </NavLink>
          </div>
        </div>
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}

export default Sidebar;
