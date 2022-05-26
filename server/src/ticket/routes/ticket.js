import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.js";
import {
  addTicket,
  deleteTicket,
  editTicket,
  getAllTicket,
  getSearchTicket,
  getTicket,
} from "../controllers/ticket.js";
import { addOrUpdateTicket } from "../validator/index.js";

const ticketRouter = Router();

ticketRouter.post("/add", isAuthenticated, addOrUpdateTicket, addTicket);
ticketRouter.get("/all", isAuthenticated, getAllTicket);
ticketRouter.get("/search", isAuthenticated, getSearchTicket);
ticketRouter.get("/:id", isAuthenticated, getTicket);
ticketRouter.delete("/:id", isAuthenticated, deleteTicket);
ticketRouter.put("/:id", isAuthenticated, addOrUpdateTicket, editTicket);

export default ticketRouter;
