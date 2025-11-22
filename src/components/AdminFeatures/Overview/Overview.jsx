import "./over-view.css";
import { Calendar } from "lucide-react";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useState, useEffect } from 'react';
import { db } from "../../../firebase-config";
import { ref, onValue } from "firebase/database";

function Overview() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    monthlyBookings: [0, 0, 0, 0, 0, 0],
  });


  function createData(bookId, guestName, roomType, checkIn, status, amount) {
    return { bookId, guestName, roomType, checkIn, status, amount };
  }

  useEffect(() => {
    const reservationsRef = ref(db, 'reservations');

    const unsubscribe = onValue(reservationsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedBookings = [];
      
      let totalRevenue = 0;
      let confirmedCount = 0;
      let pendingCount = 0;
      let cancelledCount = 0;
      let monthlyCounts = [0, 0, 0, 0, 0, 0];

      if (data) {
        Object.keys(data).forEach(key => {
          const booking = data[key];
          
          const amountValue = parseFloat(String(booking.amount).replace(/,/g, '')) || 0;
          totalRevenue += amountValue;

          
          if (booking.status === "Confirmed") confirmedCount++;
          if (booking.status === "Pending") pendingCount++;
          if (booking.status === "Cancelled") cancelledCount++;
          
          
          const checkInDate = new Date(booking.checkIn);
          const month = checkInDate.getMonth();
          const year = checkInDate.getFullYear();

          if (year >= 2025 && month < 6) {
              if (monthlyCounts[month] !== undefined) {
                monthlyCounts[month]++;
              }
          }


          loadedBookings.push(createData(
            booking.reference, 
            booking.guestName,
            booking.roomType,
            booking.checkIn,
            booking.status,
            booking.amount
          ));
        });
      }

      setBookings(loadedBookings.reverse());
      setDashboardData({
          totalBookings: loadedBookings.length,
          totalRevenue: totalRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          confirmed: confirmedCount,
          pending: pendingCount,
          cancelled: cancelledCount,
          monthlyBookings: monthlyCounts,
      });
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch bookings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const displayedBookings = bookings.slice(0, 10);

  
  const StatusBadge = ({ status }) => {
    const style = {
      fontWeight: 500,
      padding: '4px 8px',
      borderRadius: '6px',
      backgroundColor: status === "Confirmed" ? "#E6F4EA" : status === "Pending" ? "#FFF5E0" : status === "Cancelled" ? "#FFEDED" : "#F0F0F0",
      color: status === "Confirmed" ? "green" : status === "Pending" ? "#B46F46" : status === "Cancelled" ? "red" : "#444",
    };
    return <span style={style}>{status}</span>;
  };
  

  return (
    <>
      <div className="overview-container">
        <div className="overview-content">
          <div className="overview-header">
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening with Casa Diwa today.</p>
          </div>

          <div className="cards-row">
            <div className="dashboard-card">
              <div className="content">
                <span>Total Bookings</span>
                <Calendar
                  strokeWidth={1.75}
                  color="white"
                  className="calendar-icon"
                />
              </div>

              <div className="value">
                <p>{loading ? '...' : dashboardData.totalBookings}</p>
              </div>
              <div className="changes">
                <p>+12% from last month</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="content">
                <span>Revenue</span>
                <Calendar
                  strokeWidth={1.75}
                  color="white"
                  className="calendar-icon"
                />
              </div>

              <div className="value">
                <p>₱{loading ? '...' : dashboardData.totalRevenue}</p>
              </div>
              <div className="changes">
                <p>+18% from last month</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="content">
                <span className="qwe">Total Guests</span>
                <Calendar
                  strokeWidth={1.75}
                  color="white"
                  className="calendar-icon"
                />
              </div>

              <div className="value">
                <p>{loading ? '...' : dashboardData.totalBookings * 1.5}</p> 
              </div>
              <div className="changes">
                <p>+8% increase</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="content">
                <span>Occupancy Rate</span>
                <Calendar
                  strokeWidth={1.75}
                  color="white"
                  className="calendar-icon"
                />
              </div>

              <div className="value">
                <p>₱120,430</p>
              </div>
              <div className="changes">
                <p>+15% from last month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-content">
            <div className="chart-header">
              <p>Monthly Bookings</p>
            </div>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  categoryGapRatio: 0.2,
                  barGapRatio: 0.1,
                },
              ]}
              series={[{ data: dashboardData.monthlyBookings, color: "#404D3C" }]} 
              width={500}
              height={420}
              sx={{
                "& .MuiBarElement-root": {
                  rx: 8,
                },
              }}
              yAxis={[{ min: 0, max: 80 }]}
              margin={{ top: 20, bottom: 40, left: 40, right: 10 }}
              slotProps={{
                legend: { hidden: true },
              }}
            />
          </div>

          <div className="line-chart-container">
            <div className="line-chart-content">
              <div className="line-chart-header">
                <p>Revenue Trend</p>
              </div>

              <div className="line-chart">
                <LineChart
                  xAxis={[
                    {
                      scaleType: "point",
                      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    },
                  ]}
                  series={[
                    {
                      
                      data: [255000, 280000, 260000, 345000, 300000, 320000],
                      color: "#B46F46",
                      curve: "smooth",
                      showMark: true,
                      markRadius: 5,
                    },
                  ]}
                  yAxis={[
                    {
                      min: 0,
                      max: 340000,
                    },
                  ]}
                  height={420}
                  width={500}
                  margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
                  grid={{ vertical: true, horizontal: true }}
                  sx={{
                    "& .MuiChartsGrid-root line": {
                      stroke: "#EAD9C8",
                    },
                    "& .MuiLineElement-root": {
                      strokeWidth: 3,
                    },
                    "& .MuiMarkElement-root": {
                      stroke: "#B46F46",
                      strokeWidth: 3,
                      fill: "#B46F46",
                    },
                  }}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="recent-bookings-container">
          <div className="recent-bookings-content">
            <div className="recent-bookings-header">
              <p>Recent Bookings</p>
            </div>

            <div className="table-content">
              <TableContainer sx={{ boxShadow: "none" }}>
                <Table
                  sx={{
                    minHeight: 400,
                    minWidth: 650,
                    borderCollapse: "collapse",
                    fontFamily: "Inter, sans-serif",
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#8B7355",
                        }}
                      >
                        Booking ID
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#8B7355",
                        }}
                        align="center"
                      >
                        Guest
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, color: "#8B7355" }}
                        align="center"
                      >
                        Room
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, color: "#8B7355" }}
                        align="center"
                      >
                        Check-in
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, color: "#8B7355" }}
                        align="center"
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          Loading recent bookings...
                        </TableCell>
                      </TableRow>
                    ) : displayedBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No recent reservations found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayedBookings.map((row) => (
                        <TableRow
                          key={row.bookId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell sx={{ color: "#4A5A47" }} component="th" scope="row">
                            {row.bookId}
                          </TableCell>
                          <TableCell sx={{ color: "#4A5A47" }} align="center">
                            {row.guestName}
                          </TableCell>
                          <TableCell sx={{ color: "#8B7355" }} align="center">
                            {row.roomType}
                          </TableCell>
                          <TableCell sx={{ color: "#8B7355" }} align="center">
                            {row.checkIn}
                          </TableCell>
                          <TableCell align="center"><StatusBadge status={row.status} /></TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;