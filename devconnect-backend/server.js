import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js"
import authRoutes from "./src/routes/AuthRoutes.js"
import protect from "./src/middlewares/authMiddleware.js";


dotenv.config();
connectDB();
const app =express();


app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

const PORT =process.env.PORT ||5000;

app.get("/api/test",protect,(req,res)=>{
    res.json({
    message: "Protected route accessed",
    user: req.user,
  });
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}` );
    
})


