import { Outlet } from "react-router";
import Sidebar from "../../components/AdminFeatures/AdminNavbar/Sidebar";

function UserPanel() {
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
}

export default UserPanel;
