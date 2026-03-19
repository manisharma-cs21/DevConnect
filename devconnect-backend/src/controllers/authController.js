import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


export const signup= async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        const userExist=await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"user already exixt"});
        }
        const hashedPassword=await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        const token =generateToken(user._id);
        res.status(201).json({
            message:"user Registered Successfully",
            user,
        })

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

//Login Controller

export const login=async (req,res)=>{
    try{
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
         return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch=await bcrypt.compare(password,user.password);

     if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token =generateToken(user._id);

     res.status(200).json({
      message: "Login successful",
      token,
    });
}
catch(error){
     res.status(500).json({ message: error.message });
}


}