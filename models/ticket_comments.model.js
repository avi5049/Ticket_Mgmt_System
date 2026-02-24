import mongoose from "mongoose";

const ticketCommentsSchema = new mongoose.Schema(
  {
    ticket_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment:{
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Ticket_comment = mongoose.model("Ticket_comment", ticketCommentsSchema);

export default Ticket_comment;
