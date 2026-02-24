import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/auth.routes.js";
import ticketRoutes from "./routes/tickets.routes.js";
import userRoutes from "./routes/users.routes.js";



dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/tickets",ticketRoutes);
app.use("/users",userRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is working at port: ${PORT}`)
});