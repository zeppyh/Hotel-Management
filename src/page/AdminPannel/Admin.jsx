import Booking from "../../components/AdminFeatures/Bookings/Booking";
import Overview from "../../components/AdminFeatures/Overview/Overview";

function Admin() {
  return (
    <>
      <div className="admin-container">
        <div className="overview-container">
          <Overview />
        </div>

        <div>
          <Booking />
        </div>
      </div>
    </>
  );  
}

export default Admin;
