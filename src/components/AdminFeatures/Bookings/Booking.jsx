import "./booking.css";
import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Eye, Trash2 } from "lucide-react";

function Booking() {
  const [status, setStatus] = React.useState("All Status");

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
    createData(
      "CDW-A1B2C3",
      "Maria Santos",
      "Deluxe Suite",
      "2025-12-03",
      "Confirmed"
    ),
    createData(
      "CDW-F1B5C3",
      "Maria Delos Santos",
      "Deluxe Suite",
      "2025-12-10",
      "Confirmed"
    ),
  ];

  return (
    <>
      <div className="booking-container">
        <div className="booking-content">
          <div className="booking-header">
            <h1>Booking Management</h1>
            <p>View and manage all hotel bookings</p>
          </div>

          <div className="search-container">
            <div className="search-content">
              <div className="search-bar">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by booking ID, guest name, or email..."
                />
              </div>
              <div className="filter">
                <FormControl>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    IconComponent={ExpandMoreIcon}
                    displayEmpty
                    renderValue={() => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <FilterAltOutlinedIcon
                          style={{ fontSize: 20, color: "#a38662" }}
                        />
                        {status}
                      </div>
                    )}
                    sx={{
                      width: 200,
                      height: 50,
                      borderRadius: "13px",
                      background: "#fff",
                      paddingLeft: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#c2b199",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#a38662",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#8d8d8d",
                        fontSize: "22px",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: { borderRadius: "14px", paddingY: 1 },
                      },
                    }}
                  >
                    {[
                      "All Status",
                      "Confirmed",
                      "Pending",
                      "Cancelled",
                      "Completed",
                    ].map((item) => (
                      <MenuItem
                        key={item}
                        value={item}
                        sx={{
                          paddingY: 1.3,
                          paddingX: 2,
                          borderRadius: "8px",
                          fontFamily: "Inter",
                        }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="booking-table-container">
            <div className="booking-table-content">
              <TableContainer
                sx={{
                  height: "100%",
                  borderRadius: "14px",
                  border: "1px solid #E5D8C5",
                  "& .MuiTableCell-root": {
                    borderBottom: "none",
                  },
                }}
              >
                <Table
                  sx={{
                    maxHeight: 750,
                    maxwidth: 650,
                    fontFamily: "Inter, sans-serif",
                    borderBottom: "none",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      {[
                        "Booking Ref",
                        "Guests",
                        "Room",
                        "Check-in",
                        "Check-out",
                        "Amount",
                        "Status",
                        "Action",
                      ].map((head) => (
                        <TableCell
                          key={head}
                          sx={{
                            fontWeight: 600,
                            color: "#8B7355",
                            paddingY: 2,
                          }}
                          align={head === "Booking Ref" ? "left" : "center"}
                        >
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.bookId}
                        sx={{
                          borderRadius: "14px",
                          boxShadow: "0 0 3px rgba(0,0,0,0.05)",
                        }}
                      >
                        <TableCell sx={{ color: "#4A5A47", fontWeight: 500 }}>
                          {row.bookId}
                        </TableCell>

                        <TableCell align="center">
                          <div style={{ fontWeight: 300, border: "none" }}>
                            {row.guestName}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              color: "#8B8B8B",
                              border: "none",
                            }}
                          >
                            {row.guestName.toLowerCase().split(" ").join(".")}
                            @email.com
                          </div>
                        </TableCell>

                        {/* Room */}
                        <TableCell
                          align="center"
                          sx={{ color: "#8B7355", border: "none" }}
                        >
                          {row.roomType}
                        </TableCell>

                        {/* Check-in */}
                        <TableCell align="center">{row.checkIn}</TableCell>

                        {/* Check-out (computed for demo) */}
                        <TableCell align="center">
                          {row.status === "Cancelled" ? "---" : "2025-12-06"}
                        </TableCell>

                        {/* Amount */}
                        <TableCell align="center" sx={{ fontWeight: 300 }}>
                          ₱{(Math.random() * 9000 + 5000).toFixed(0)}
                        </TableCell>

                        {/* Status badge */}
                        <TableCell align="center">
                          <span
                            style={{
                              fontWeight: 300,
                              color:
                                row.status === "Confirmed"
                                  ? "green"
                                  : row.status === "Pending"
                                  ? "blue"
                                  : row.status === "Cancelled"
                                  ? "red"
                                  : "#444",
                            }}
                          >
                            {row.status}
                          </span>
                        </TableCell>

                        {/* Action buttons */}
                        <TableCell align="center">
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <button
                              style={{
                                background: "#EFE9E1",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                cursor: "pointer",
                              }}
                            >
                              <Eye strokeWidth={1.75} size={15} /> View
                            </button>
                            <button
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: 18,
                              }}
                            >
                              <Trash2 strokeWidth={1.75} size={20} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default Booking;
