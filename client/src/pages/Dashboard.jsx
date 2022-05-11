import * as React from "react";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tickets from "./Tickets";
import AppBar from "@mui/material/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../features/user/userSlice";
import { Button } from "@mui/material";
import { http } from "../config/http";

function DashboardContent() {
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState();
  const user = useSelector((state) => state.user);
  console.log("userData", userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
    setToken(localStorage.getItem("token"));
  }, []);

  const getTickets = async () => {
    try {
      const response = await http.get("/ticket/all");
      console.log(response.data.tickets);
      return response.data.tickets;
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      {userData && token ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute">
            <Toolbar
              sx={{
                pr: "24px",
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <Typography>Welcome, {userData?.firstName}</Typography>
              &nbsp;&nbsp;&nbsp;
              <Button
                onClick={handleLogout}
                variant="contained"
                style={{ backgroundColor: "red" }}
              >
                LogOut
              </Button>
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Tickets getList={getTickets} />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
