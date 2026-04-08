import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js"
import authRoutes from "./src/routes/AuthRoutes.js"
import protect from "./src/middlewares/authMiddleware.js";
import authorizeRoles from "./src/middlewares/roleMiddleware.js";
import jobRoutes from "./src/routes/jobRoutes.js"
import applicationRoutes from "./src/routes/applicationRoutes.js"
import userRoutes from "./src/routes/userRoutes.js";


dotenv.config();
connectDB();
const app =express();


app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/users", userRoutes);

const PORT =process.env.PORT ||5000;

app.get("/api/test",protect,(req,res)=>{
    res.json({
    message: "Protected route accessed",
    user: req.user,
  });
})
app.get("/api/admin",protect,authorizeRoles("admin"),(req,res)=>{
     res.json({ message: "Welcome Admin 🔥" });
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}` );
    
})


