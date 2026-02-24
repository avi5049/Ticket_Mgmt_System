import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createuser, getUsers } from "../controllers/users.controllers.js";
import allowRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, allowRoles("MANAGER"),createuser);
router.get("/", authMiddleware, allowRoles("MANAGER"),getUsers);

export default router;



