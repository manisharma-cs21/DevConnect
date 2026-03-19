import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModels.js"

const protect=async (req,res,next)=>{
    let token;
    const authHeader = req.headers?.authorization;
  
    
    if(
        authHeader && authHeader.startsWith("Bearer")
    ){
        try{
               token= authHeader.split(" ")[1];
               
               
               const decoded = jwt.verify(token, process.env.JWT_SECRET);
              
               

               const user =await User.findById(decoded.id).select("-password");
               
               if(!user){
                return res.status(401).json({ message: "User not found" });
                 
               }
              req.user=user;
               next();

        }
        catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

    }
     if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
}
export default protect;