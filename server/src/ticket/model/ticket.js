import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticket_title: {
      type: String,
      required: true,
    },
    ticket_desc: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
    },
    user_firstName: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
