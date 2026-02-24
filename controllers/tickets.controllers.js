import Ticket from "../models/tickets.model.js";
import User from "../models/users.model.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({
        msg: "Bad Request",
      });
    }

    const user = req.user;

    if (!["USER", "MANAGER"].includes(user.role)) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      status: "OPEN",
      createdBy: user._id,
      assignedTo: null,
    });

    return res.status(201).json({ msg: "Created", ticket });
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);

    return res.status(403).json({
      msg: "Forbidden",
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    const user = req.user;

    let filter = {};

    if (user.role === "MANAGER") {
      filter = {};
    } else if (user.role === "SUPPORT") {
      filter = { assignedTo: user.id };
    } else if (user.role === "USER") {
      filter = { createdBy: user.id };
    } else {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    const tickets = await Ticket.find(filter);

    return res.status(200).json({ msg: "OK", tickets });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
};

export const updateAssignTickets = async (req, res) => {
  try {
    const user = req.user;

    if (!["MANAGER", "SUPPORT"].includes(user.role)) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    if (!req.params.id) {
      return res.status(400).json({
        msg: "Bad Request",
      });
    }

    const { assignedTo } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      {
        new: true,
      },
    );

    return res.status(200).json({ msg: "OK", updatedTicket });
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      msg: "Forbidden",
    });
  }
};

export const updateStatusTickets = async (req, res) => {
    
  try {
    const user = req.user;

    if (!["MANAGER", "SUPPORT"].includes(user.role)) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    if (!req.params.id) {
      return res.status(400).json({
        msg: "Bad Request",
      });
    }

    const { status } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
      },
    );

    return res.status(200).json({ msg: "OK", updatedTicket });
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      msg: "Forbidden",
    });
  }
};


