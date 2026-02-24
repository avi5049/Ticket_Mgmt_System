import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createTicket, getTickets, updateAssignTickets, updateStatusTickets } from "../controllers/tickets.controllers.js";
import allowRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, allowRoles("USER","MANAGER"), createTicket);
router.get("/", authMiddleware, allowRoles("USER","MANAGER","SUPPORT"),getTickets);
router.patch("/:id/assign", authMiddleware,allowRoles("SUPPORT","MANAGER"), updateAssignTickets);
router.patch("/:id/status", authMiddleware, allowRoles("SUPPORT","MANAGER"),updateStatusTickets);


export default router;



