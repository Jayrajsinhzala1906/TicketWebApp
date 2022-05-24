import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tickets from "./Tickets";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { http } from "../config/http";
import { getAllTicket } from "../services/ticketService";

function DashboardContent() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTickets = async () => {
    try {
      const response = await getAllTicket();
      return response.data.tickets;
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
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
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Tickets getList={getTickets} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
