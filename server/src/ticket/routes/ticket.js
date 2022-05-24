import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.js";
import {
  addTicket,
  deleteTicket,
  editTicket,
  getAllTicket,
  getTicket,
} from "../controllers/ticket.js";
import { addOrUpdateTicket } from "../validator/index.js";

const ticketRouter = Router();

ticketRouter.post("/add", isAuthenticated, addOrUpdateTicket, addTicket);
ticketRouter.get("/all", isAuthenticated, getAllTicket);
ticketRouter.get("/:id", isAuthenticated, getTicket);
ticketRouter.delete("/:id", isAuthenticated, deleteTicket);
ticketRouter.put("/:id", isAuthenticated, addOrUpdateTicket, editTicket);

export default ticketRouter;
