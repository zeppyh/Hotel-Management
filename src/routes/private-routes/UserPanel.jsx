import { Outlet } from "react-router";
import Sidebar from "../../components/AdminFeatures/AdminNavbar/Sidebar";

function UserPanel({ user }) {

  const isAdmin = user && user.role === 'admin';
  const isLoading = !user && !isAdmin;

  if (!user) {
    return <Navigate to="/LoginPage"  />;
  }

  if (!isAdmin) {
    return <Navigate to="/"  />;
  }
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
}

export default UserPanel;
