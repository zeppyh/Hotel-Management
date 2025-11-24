import "./booking.css";
import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel, Button as MuiButton } from "@mui/material"; 
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Eye, Trash2, Pencil, X, ChevronLeft, ChevronRight } from "lucide-react"; 

import { db } from "../../../firebase-config";
import { ref, onValue, remove, set, update } from "firebase/database";

const STATUS_CYCLE = ["Pending", "Confirmed", "Cancelled"];
const FILTER_STATUSES = ["All Status", "Confirmed", "Pending", "Cancelled"];
const ROOM_TYPES = ["Standard Rooms", "Deluxe Suite", "Executive Suite"];
const ROOM_PRICES = {
    "Standard Rooms": 3500.00,
    "Deluxe Suite": 5800.00,
    "Executive Suite": 8900.00
};
const getTodayDate = () => new Date().toISOString().split("T")[0];
const ITEMS_PER_PAGE = 15;


function Booking() {
  const [status, setStatus] = React.useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({
    total: 0, confirmed: 0, pending: 0, cancelled: 0
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedBookingData, setEditedBookingData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getRoomPrice = (roomType) => {
    return ROOM_PRICES[roomType] || 0;
  };

  function createData(bookId, guestName, guestEmail, roomType, checkIn, checkOut, amount, status, contactNumber, guestRequest, paymentMethod) {
    return { bookId, guestName, guestEmail, roomType, checkIn, checkOut, amount, status, contactNumber, guestRequest, paymentMethod };
  }

  useEffect(() => {
    const reservationsRef = ref(db, 'reservations');

    const unsubscribe = onValue(reservationsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedBookings = [];
      
      let counts = { total: 0, confirmed: 0, pending: 0, cancelled: 0 };

      if (data) {
        Object.keys(data).forEach(key => {
          const booking = data[key];
          loadedBookings.push(createData(
            booking.reference,
            booking.guestName,
            booking.guestEmail,
            booking.roomType,
            booking.checkIn,
            booking.checkOut,
            booking.amount,
            booking.status,
            booking.contactNumber,
            booking.specialRequest,
            booking.paymentMethod
          ));
          
          counts.total++;
          if (booking.status === "Confirmed") counts.confirmed++;
          if (booking.status === "Pending") counts.pending++;
          if (booking.status === "Cancelled") counts.cancelled++;
        });
      }

      setBookings(loadedBookings.reverse());
      setStatusCounts(counts);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch bookings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // -----------------------------------------------------------
  // FILTERING AND PAGINATION LOGIC
  // -----------------------------------------------------------

  const filteredBookings = bookings.filter(booking => {
    const statusMatch = status === "All Status" || booking.status === status;
    
    const searchLower = searchTerm.toLowerCase();
    const searchMatch = 
        !searchTerm || 
        booking.bookId.toLowerCase().includes(searchLower) ||
        booking.guestName.toLowerCase().includes(searchLower) ||
        booking.guestEmail.toLowerCase().includes(searchLower);

    return statusMatch && searchMatch;
  });

  // Calculate pagination variables
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedBookings = filteredBookings.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  // FIX: Reset page when search term changes
  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
  };
  
  // FIX: Reset page when status filter changes
  const handleStatusFilterChange = (e) => {
      setStatus(e.target.value);
      setCurrentPage(1);
  };


  // -----------------------------------------------------------
  // HANDLERS FOR ACTIONS
  // -----------------------------------------------------------
  
  const handleStatusChange = async (bookId, currentStatus) => {
    const currentIndex = STATUS_CYCLE.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % STATUS_CYCLE.length; 
    const newStatus = STATUS_CYCLE[nextIndex];

    try {
        const bookingRef = ref(db, `reservations/${bookId}/status`);
        await set(bookingRef, newStatus);
        console.log(`Booking ${bookId} status updated to: ${newStatus}`);
    } catch (error) {
        console.error("Error updating status:", error);
        alert(`Failed to update status to ${newStatus}: ${error.message}`);
    }
  };

  const handleDelete = async (bookId) => {
    if (window.confirm(`Are you sure you want to delete booking ID ${bookId}?`)) {
      try {
        const bookingRef = ref(db, `reservations/${bookId}`);
        await remove(bookingRef);
        console.log(`Booking ${bookId} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert(`Failed to delete booking: ${error.message}`);
      }
    }
  };
  
  const handleEdit = (booking) => {
      setEditedBookingData({
          ...booking,
          guestRequest: booking.guestRequest
      });
      setIsEditModalOpen(true);
  };
  
  const handleEditChange = (e) => {
      const { name, value } = e.target;
      
      setEditedBookingData(prev => {
          const newState = { ...prev, [name]: value };
          
          let checkIn = newState.checkIn;
          let checkOut = newState.checkOut;
          let roomType = newState.roomType;

          if (name === 'checkIn' || name === 'checkOut' || name === 'roomType') {
              const nights = calculateNights(checkIn, checkOut);
              const pricePerNight = getRoomPrice(roomType);
              
              const newAmount = (pricePerNight * nights).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              });
              
              newState.amount = newAmount;
          }

          return newState;
      });
  };
  
  const handleSave = async () => {
    if (!editedBookingData || !editedBookingData.bookId) return;

    if (editedBookingData.checkIn >= editedBookingData.checkOut) {
        alert("Check-out date must be after Check-in date.");
        return;
    }

    const bookId = editedBookingData.bookId;
    
    const updates = {
        guestName: editedBookingData.guestName,
        guestEmail: editedBookingData.guestEmail,
        contactNumber: editedBookingData.contactNumber,
        checkIn: editedBookingData.checkIn,
        checkOut: editedBookingData.checkOut,
        roomType: editedBookingData.roomType,
        specialRequest: editedBookingData.guestRequest, 
        status: editedBookingData.status,
        amount: editedBookingData.amount 
    };

    try {
        const bookingRef = ref(db, `reservations/${bookId}`);
        await update(bookingRef, updates); 
        setIsEditModalOpen(false);
        console.log(`Booking ${bookId} updated successfully.`, updates);
    } catch (error) {
        console.error("Error updating booking:", error);
        alert(`Failed to save changes: ${error.message}`);
    }
  };

  const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
      setEditedBookingData(null);
  };
  
  const handleView = (booking) => {
      setSelectedBookingDetails(booking);
      setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedBookingDetails(null);
  };

  // -----------------------------------------------------------
  // STATUS BADGE COMPONENT
  // -----------------------------------------------------------

  const StatusBadge = ({ bookId, status }) => {
    const style = {
      fontWeight: 600,
      padding: '4px 8px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background 0.2s',
      backgroundColor: status === "Confirmed" ? "#E6F4EA" : status === "Pending" ? "#FFF5E0" : status === "Cancelled" ? "#FFEDED" : "#F0F0F0",
      color: status === "Confirmed" ? "green" : status === "Pending" ? "#B46F46" : status === "Cancelled" ? "red" : "#444",
    };
    
    return (
        <span 
            style={style}
            onClick={() => handleStatusChange(bookId, status)}
        >
            {status}
        </span>
    );
  };

  return (
    <>
      <div className="booking-container">
        <div className="booking-content">
          <div className="booking-header">
            <h1>Booking Management</h1>
            <p>View and manage all hotel bookings</p>
          </div>

          {/* STATUS SUMMARY CARDS */}
          <div className="status-summary-row">
            <div className="status-card confirmed">
              <p>Confirmed</p>
              <h3>{statusCounts.confirmed}</h3>
            </div>
            <div className="status-card pending">
              <p>Pending</p>
              <h3>{statusCounts.pending}</h3>
            </div>
            <div className="status-card cancelled">
              <p>Cancelled</p>
              <h3>{statusCounts.cancelled}</h3>
            </div>
            <div className="status-card total">
              <p>Total Bookings</p>
              <h3>{statusCounts.total}</h3>
            </div>
          </div>
          {/* END STATUS SUMMARY CARDS */}

          <div className="search-container">
            <div className="search-content">
              <div className="search-bar">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by booking ID, guest name, or email..."
                  value={searchTerm}
                  onChange={handleSearchChange} // NEW: Use centralized change handler
                />
              </div>
              <div className="filter">
                <FormControl>
                  <Select
                    value={status}
                    onChange={handleStatusFilterChange} 
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
                    {FILTER_STATUSES.map((item) => (
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
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          Loading booking data...
                        </TableCell>
                      </TableRow>
                    ) : filteredBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          {searchTerm || status !== "All Status"
                            ? `No bookings found matching criteria "${
                                searchTerm || status
                              }".`
                            : "No reservations found in the database."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayedBookings.map((row) => (
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
                              {row.guestEmail}
                            </div>
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ color: "#8B7355", border: "none" }}
                          >
                            {row.roomType}
                          </TableCell>

                          <TableCell align="center">{row.checkIn}</TableCell>

                          <TableCell align="center">{row.checkOut}</TableCell>

                          <TableCell align="center" sx={{ fontWeight: 500 }}>
                            ₱{row.amount}
                          </TableCell>

                          <TableCell align="center">
                            <StatusBadge
                              bookId={row.bookId}
                              status={row.status}
                            />
                          </TableCell>

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
                                onClick={() => handleView(row)}
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
                                onClick={() => handleEdit(row)}
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
                                <Pencil strokeWidth={1.75} size={15} /> Edit
                              </button>

                              <button
                                onClick={() => handleDelete(row.bookId)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#C46A4A",
                                }}
                              >
                                <Trash2 strokeWidth={1.75} size={20} />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          {filteredBookings.length > ITEMS_PER_PAGE && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "15px",
                paddingRight: "20px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#8B7355" }}>
                Page {currentPage} of {totalPages}
              </span>

              <MuiButton
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                sx={{
                  color: "#8B7355",
                  borderColor: "#E5D8C5",
                  borderRadius: "8px",
                  minWidth: "40px",
                  padding: "6px",
                }}
              >
                <ChevronLeft size={20} />
              </MuiButton>

              <MuiButton
                variant="outlined"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                sx={{
                  color: "#8B7355",
                  borderColor: "#E5D8C5",
                  borderRadius: "8px",
                  minWidth: "40px",
                  padding: "6px",
                }}
              >
                <ChevronRight size={20} />
              </MuiButton>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedBookingDetails && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "15px",
              maxWidth: "650px",
              width: "90%",
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              position: "relative",
            }}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4A5A47",
              }}
            >
              <X size={28} strokeWidth={2} />
            </button>

            <h2
              style={{
                color: "#8B7355",
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              Reservation Details
            </h2>

            <h1
              style={{
                color: "#4A5A47",
                fontFamily: "Inter",
                fontSize: "28px",
                fontWeight: 800,
                marginBottom: "30px",
              }}
            >
              {selectedBookingDetails.bookId}
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "25px 40px",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "#4A5A47",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "15px",
                  }}
                >
                  Guest & Contact
                </h3>

                <div
                  style={{
                    paddingRight: "15px",
                    borderRight: "1px solid #E5D8C5",
                  }}
                >
                  <p style={{ margin: "8px 0", fontSize: "15px" }}>
                    <strong
                      style={{
                        display: "inline-block",
                        width: "80px",
                        color: "#8B7355",
                      }}
                    >
                      Name:
                    </strong>
                    {selectedBookingDetails.guestName}
                  </p>
                  <p style={{ margin: "8px 0", fontSize: "15px" }}>
                    <strong
                      style={{
                        display: "inline-block",
                        width: "80px",
                        color: "#8B7355",
                      }}
                    >
                      Email:
                    </strong>
                    {selectedBookingDetails.guestEmail}
                  </p>
                  <p style={{ margin: "8px 0", fontSize: "15px" }}>
                    <strong
                      style={{
                        display: "inline-block",
                        width: "80px",
                        color: "#8B7355",
                      }}
                    >
                      Contact:
                    </strong>
                    {selectedBookingDetails.contactNumber || "N/A"}
                  </p>
                  <p style={{ margin: "15px 0 0 0", fontSize: "15px" }}>
                    <strong
                      style={{ display: "inline-block", color: "#8B7355" }}
                    >
                      Status:
                    </strong>
                    <StatusBadge
                      bookId={selectedBookingDetails.bookId}
                      status={selectedBookingDetails.status}
                    />
                  </p>
                </div>
              </div>

              <div>
                <h3
                  style={{
                    color: "#4A5A47",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "15px",
                  }}
                >
                  Booking & Payment
                </h3>

                <p style={{ margin: "8px 0", fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "inline-block",
                      width: "100px",
                      color: "#8B7355",
                    }}
                  >
                    Room Type:
                  </strong>
                  {selectedBookingDetails.roomType}
                </p>
                <p style={{ margin: "8px 0", fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "inline-block",
                      width: "100px",
                      color: "#8B7355",
                    }}
                  >
                    Check-in:
                  </strong>
                  {selectedBookingDetails.checkIn}
                </p>
                <p style={{ margin: "8px 0", fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "inline-block",
                      width: "100px",
                      color: "#8B7355",
                    }}
                  >
                    Check-out:
                  </strong>
                  {selectedBookingDetails.checkOut}
                </p>
                <p style={{ margin: "8px 0", fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "inline-block",
                      width: "100px",
                      color: "#8B7355",
                    }}
                  >
                    Payment:
                  </strong>
                  {selectedBookingDetails.paymentMethod || "N/A"}
                </p>
                <p style={{ margin: "8px 0", fontSize: "15px" }}>
                  <strong
                    style={{
                      display: "inline-block",
                      width: "100px",
                      color: "#B46F46",
                    }}
                  >
                    Amount Paid:
                  </strong>
                  <span style={{ fontWeight: "bold", color: "#B46F46" }}>
                    ₱{selectedBookingDetails.amount}
                  </span>
                </p>
              </div>
            </div>

            {selectedBookingDetails.specialRequest &&
              selectedBookingDetails.specialRequest.trim() !== "" && (
                <div
                  style={{
                    marginTop: "30px",
                    paddingTop: "20px",
                    borderTop: "1px solid #E5D8C5",
                  }}
                >
                  <h3
                    style={{
                      color: "#4A5A47",
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "10px",
                    }}
                  >
                    Special Requests
                  </h3>
                  <p
                    style={{
                      backgroundColor: "#F7F4EC",
                      padding: "15px",
                      borderRadius: "10px",
                      lineHeight: 1.5,
                      color: "#444",
                    }}
                  >
                    {selectedBookingDetails.specialRequest}
                  </p>
                </div>
              )}
          </div>
        </div>
      )}

      {isEditModalOpen && editedBookingData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1001,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "15px",
              maxWidth: "700px",
              width: "90%",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              position: "relative",
            }}
          >
            <button
              onClick={handleCloseEditModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4A5A47",
              }}
            >
              <X size={28} strokeWidth={2} />
            </button>

            <h1
              style={{
                color: "#8B7355",
                fontSize: "28px",
                fontWeight: 800,
                marginBottom: "20px",
              }}
            >
              Edit Reservation: {editedBookingData.bookId}
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <h3
                  style={{
                    color: "#4A5A47",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "15px",
                  }}
                >
                  Guest Information
                </h3>

                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "#8B7355",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="guestName"
                  value={editedBookingData.guestName || ""}
                  onChange={handleEditChange}
                  style={{
                    padding: "10px",
                    border: "1px solid #E5D8C5",
                    borderRadius: "8px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "#8B7355",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="guestEmail"
                  value={editedBookingData.guestEmail || ""}
                  onChange={handleEditChange}
                  style={{
                    padding: "10px",
                    border: "1px solid #E5D8C5",
                    borderRadius: "8px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "#8B7355",
                  }}
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={editedBookingData.contactNumber || ""}
                  onChange={handleEditChange}
                  style={{
                    padding: "10px",
                    border: "1px solid #E5D8C5",
                    borderRadius: "8px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <h3
                  style={{
                    color: "#4A5A47",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "15px",
                  }}
                >
                  Booking Details
                </h3>

                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "#8B7355",
                  }}
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={editedBookingData.checkIn || ""}
                  onChange={handleEditChange}
                  min={getTodayDate()}
                  style={{
                    padding: "10px",
                    border: "1px solid #E5D8C5",
                    borderRadius: "8px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "#8B7355",
                  }}
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={editedBookingData.checkOut || ""}
                  onChange={handleEditChange}
                  min={editedBookingData.checkIn || getTodayDate()}
                  style={{
                    padding: "10px",
                    border: "1px solid #E5D8C5",
                    borderRadius: "8px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "#8B7355",
                  }}
                >
                  Room Type
                </label>
                <select
                  name="roomType"
                  value={editedBookingData.roomType || ""}
                  onChange={handleEditChange}
                  style={{
                    padding: "10px",
                    border: "1px solid #E5D8C5",
                    borderRadius: "8px",
                  }}
                >
                  {ROOM_TYPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "#8B7355",
                  }}
                >
                  Status
                </label>
                <select
                  name="status"
                  value={editedBookingData.status || "Pending"}
                  onChange={handleEditChange}
                  style={{
                    padding: "10px",
                    border: "1px solid #E5D8C5",
                    borderRadius: "8px",
                  }}
                >
                  {STATUS_CYCLE.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <p
                  style={{
                    margin: "15px 0 0 0",
                    fontSize: "15px",
                    color: "#B46F46",
                  }}
                >
                  <strong style={{ fontWeight: "bold" }}>
                    New Total Amount:
                  </strong>
                  <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                    ₱{editedBookingData.amount}
                  </span>
                </p>
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h3
                style={{
                  color: "#4A5A47",
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                Special Request
              </h3>
              <textarea
                name="guestRequest"
                rows="4"
                value={editedBookingData.guestRequest || ""}
                onChange={handleEditChange}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: "1px solid #E5D8C5",
                  borderRadius: "10px",
                  resize: "none",
                }}
              />
            </div>

            <div style={{ marginTop: "30px", textAlign: "right" }}>
              <button
                onClick={handleSave}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6C7A51",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Booking;