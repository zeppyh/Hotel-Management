import "./room-suites.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Users, Ruler, Eye } from "lucide-react";
import { NavLink } from "react-router";

function RoomSuites({ data, user = null }) {
  return (
    <div className="room-suites-container">
      <div className="room-suites-header-wrapper">
        <div className="room-suites-header">
          <h4>ACCOMMODATIONS</h4>
        </div>

        <div className="title">
          <h2>Rooms & Suites</h2>
          <p>Each room is a sanctuary designed for your peace and comfort</p>
        </div>

        <div className="room-card">
          {data.map((room) => (
            <Card
              key={room.id}
              sx={{
                width: 400,
                height: 550,
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <CardMedia
                component="img"
                image={room.image}
                alt={room.roomName}
                sx={{
                  height: 300,
                  objectFit: "cover",
                }}
              />

              <CardContent
                sx={{ color: "#808D68", fontFamily: "Playfair Display" }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{
                    color: "#808D68",
                    fontFamily: "Playfair Display",
                    fontWeight: "bold",
                  }}
                >
                  {room.roomName}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#808D68",
                    lineHeight: 1.6,
                  }}
                >
                  {room.roomDescription}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "20px",
                    color: "#808D68",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <Users size={16} />
                    <Typography variant="body2">{room.guests}</Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <Ruler size={16} />
                    <Typography variant="body2">{room.sqm}</Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <Eye size={16} />
                    <Typography variant="body2">{room.view}</Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingX: "20px",
                  paddingBottom: "20px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#808D68",
                      fontFamily: "Playfair Display",
                    }}
                  >
                    Starting at
                  </Typography>
                  <Typography
                    sx={{
                      color: "#E36A2E",
                      fontFamily: "Ibarra Real Nova",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    ₱{room.price}
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "12px",
                        color: "#808D68",
                        marginLeft: "4px",
                      }}
                    >
                      /night
                    </Typography>
                  </Typography>
                </Box>

                <NavLink
                  to={user ? "/Process" : "/LoginPage"}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#808D68",
                      borderRadius: "20px",
                      textTransform: "none",
                      fontFamily: "Playfair Display",
                      "&:hover": {
                        backgroundColor: "#6a7b55",
                      },
                    }}
                  >
                    Book
                  </Button>
                </NavLink>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomSuites;
