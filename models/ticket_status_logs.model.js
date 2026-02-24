import mongoose from "mongoose";

const ticketStatusLogsSchema = new mongoose.Schema(
  {
    ticket_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    old_status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      required: true,
      unique: true,
    },
    new_status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      required: true,
      unique: true,
    },
    changed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Ticket_status_log = mongoose.model("Ticket_status_log", ticketStatusLogsSchema);

export default Ticket_status_log;
