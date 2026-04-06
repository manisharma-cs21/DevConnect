import jwt from "jsonwebtoken"

const generateToken=(userId)=>{
    return jwt.sign(
        {id:userId._id,
         role:userId.role,
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"})
}

export default generateToken;