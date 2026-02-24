

// // UPDATE
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE
// export const deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);

//     res.json({ msg: "Product deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import Ticket from "../models/tickets.model.js";
import User from "../models/users.model.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description, priority  } = req.body;

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
      createdBy: user.id,
      assignedTo: null,       
    });

    return res.status(201).json({ msg: "Created",ticket });
  } catch (error) {
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

    return res.status(200).json({ msg: "OK",tickets });
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
        msg: "Unauhorized",
      });
    }

    if (!req.params.id) {
      return res.status(400).json({
        msg: "Bad Request",
      });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({msg: "OK",updatedTicket});


  } catch (error) {
    console.error(error);
    return res.status(403).json({
      msg: "Forbidden",
    });
  }
};

export const updateStatusTickets = async (req, res) => {};
