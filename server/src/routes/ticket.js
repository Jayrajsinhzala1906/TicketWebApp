import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import Ticket from "../models/ticket.js";

const ticketRouter = Router();

ticketRouter.post("/add", isAuthenticated, async (req, res) => {
  var ticketData = {
    ticket_title: req.body.title,
    ticket_desc: req.body.description,
    user_id: req.user._id,
    user_firstName: req.user.firstName,
  };
  const ticket = await Ticket.create(ticketData);
  res.status(201).json(ticket);
  console.log(ticketData);
});

ticketRouter.get("/all", (req, res) => {
  try {
    Ticket.find({ isDeleted: false }, (err, tickets) => {
      if (err) {
        return err;
      }
      return res.status(200).json({ tickets });
    });
  } catch (error) {
    return error;
  }
});

ticketRouter.get("/:id", (req, res) => {
  try {
    Ticket.find({ _id: req.params.id }, (err, tickets) => {
      if (err) {
        return err;
      }
      return res.status(200).json({ tickets });
    });
  } catch (error) {
    return error;
  }
});

ticketRouter.delete("/:id", (req, res) => {
  try {
    Ticket.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      (err, tickets) => {
        if (err) {
          return err;
        }
        return res.status(200).json({ tickets });
      }
    );
  } catch (error) {
    return error;
  }
});

ticketRouter.put("/:id", (req, res) => {
  var ticketData = {
    ticket_title: req.body.title,
    ticket_desc: req.body.description,
  };
  try {
    Ticket.findByIdAndUpdate(req.params.id, ticketData, (err, tickets) => {
      if (err) {
        return err;
      }
      return res.status(200).json({ tickets });
    });
  } catch (error) {
    return error;
  }
});

export default ticketRouter;
