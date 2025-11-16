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

function Overview() {
  function createData(bookId, guestName, roomType, checkIn, status) {
    return { bookId, guestName, roomType, checkIn, status };
  }

  const rows = [
    createData(
      "CDW-A1B2C3",
      "Maria Santos",
      "Deluxe Suite",
      "2025-12-03",
      "Confirmed"
    ),
    createData(
      "CDW-D4E5F6",
      "Juan Dela Cruz",
      "Executive Suite",
      "2025-12-14",
      "Confirmed"
    ),
    createData(
      "CDW-G7H8I9",
      "Sofia Reyes",
      "Executive Suite",
      "2025-12-26",
      "Pending"
    ),
    createData(
      "CDW-J1K2L3",
      "Miguel Torres",
      "Deluxe Suite",
      "2025-01-02",
      "Confirmed"
    ),
    createData(
      "CDW-M4N5O6",
      "Ana Garcia",
      "Standard Room",
      "2025-01-06",
      "Cancelled"
    ),
  ];

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
                <p>156</p>
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
                <p>₱847,500</p>
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
                <p>89</p>
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
              series={[{ data: [50, 45, 70, 60, 70, 90], color: "#404D3C" }]}
              width={500}
              height={420}
              // Design
              sx={{
                "& .MuiBarElement-root": {
                  rx: 8,
                },
              }}
              yAxis={[{ min: 0, max: 80 }]}
              margin={{ top: 20, bottom: 40, left: 40, right: 10 }}
              slotProps={{
                legend: { hidden: true }, // hide legend as in the sample
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
                    // Gridline color
                    "& .MuiChartsGrid-root line": {
                      stroke: "#EAD9C8", // soft light brown gridlines
                    },
                    // Line styling (optional enhancement)
                    "& .MuiLineElement-root": {
                      strokeWidth: 3,
                    },
                    // Dot styling
                    "& .MuiMarkElement-root": {
                      stroke: "#B46F46",
                      strokeWidth: 3,
                      fill: "#B46F46",
                    },
                  }}
                  slotProps={{
                    legend: { hidden: true }, // hide legend as in the sample
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
                    {rows.map((row) => (
                      <TableRow
                        key={row.bookId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ color: "#4A5A47" }}
                          component="th"
                          scope="row"
                        >
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
                        <TableCell align="center">{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          <div className="booking-status-container">
            <div className="booking-status-content">
              <div className="booking-status-header">
                <p>Booking Status</p>
              </div>
              <div>
                <PieChart
                  width={250}
                  height={240}
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: 89,
                          label: "Confirmed: 89",
                          color: "#404D3C",
                        },
                        {
                          id: 1,
                          value: 34,
                          label: "Pending: 34",
                          color: "#B46F46",
                        },
                        {
                          id: 2,
                          value: 12,
                          label: "Cancelled: 12",
                          color: "#C46A4A",
                        },
                      ],

                      outerRadius: 100,

                      labelPosition: "outside",

                      labelStyle: {
                        fill: "#8B7355",
                        fontFamily: "Inter",
                        fontSize: 14,
                        fontWeight: 500,
                      },

                      stroke: "#ffffff",
                      strokeWidth: 1,
                    },
                  ]}
                  sx={{
                    "& .MuiPieArc-root": {
                      stroke: "#ffffff",
                      strokeWidth: 1,
                    },
                  }}
                />
              </div>
              <div className="status">
                <div className="status-content">
                  <div className="dot">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#B46F46",
                      }}
                    />
                    <p>Pending</p>
                  </div>
                  <div className="content">
                    <p>34</p>
                  </div>
                </div>
                <div className="status-content">
                  <div className="dot">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#4A5A47",
                      }}
                    />

                    <p>Confirmed</p>
                  </div>
                  <div className="content">
                    <p>89</p>
                  </div>
                </div>
                <div className="status-content">
                  <div className="dot">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#B85C38",
                      }}
                    />
                    <p>Cancelled</p>
                  </div>
                  <div className="content">
                    <p>12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
