import { NavLink } from "react-router";
import {
    LayoutDashboard,
    Calendar,
    DoorOpen,
    Users,
    LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { auth, storage } from "../../../firebase-config"; 

import "./sidebar.css";

// Define the storage path for the icon
const ICON_IMAGE_PATH = "images/icon.png";

function Sidebar({ children }) {
    const [iconUrl, setIconUrl] = useState('');

    // Fetch the image URL from Firebase Storage on mount
    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const imageReference = storageRef(storage, ICON_IMAGE_PATH);
                const url = await getDownloadURL(imageReference);
                setIconUrl(url);
            } catch (error) {
                console.error("Error fetching icon image URL for sidebar:", error);
                setIconUrl("");
            }
        };
        fetchUrl();
    }, []);

    function logOut() {
        auth.signOut();
        console.log("Logged out successfully");
    }

    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <div className="header">
                            {/* Use the dynamically fetched URL */}
                            <img src={iconUrl} alt="Icon of Casa Diwa" />
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
                        {/* <div className="nav">
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
                        </div> */}
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