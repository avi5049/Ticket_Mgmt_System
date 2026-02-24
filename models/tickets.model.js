import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
      required: true,
      unique: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
      required: true,
      unique: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
