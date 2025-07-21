import User from "../models/userSchema.js";

export const getCurrentUser=async(req,res)=>{
    try{
        const id=req.userId;
        console.log(id);
        const user=await User.findById(req.userId).select("password")
        if(!user){
            return res.status(400).json({message:"user does not found"});

        }
        return res.status(200).json(user);

    }catch(err){
        return res.status(400).json({message:"get current user error"});

    }
}