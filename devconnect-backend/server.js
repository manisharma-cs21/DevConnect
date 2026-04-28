import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/AuthRoutes.js";
import protect from "./src/middlewares/authMiddleware.js";
import authorizeRoles from "./src/middlewares/roleMiddleware.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import applicationRoutes from "./src/routes/applicationRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import referralRoutes from "./src/routes/referralRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";

dotenv.config();

connectDB();

const app = express();


const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://devconnect-khaki-rho.vercel.app/",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export { io };

io.on("connection", (socket) => {
  //console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    
  });

  socket.on("disconnect", () => {
    
  });
});

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

// test routes
app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/api/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin 🔥" });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});