import genToken from "../config/token.js";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"

export const signUp=async(req,res)=>{
    try{
        let {firstName,lastName,userName,email,password}=req.body;
        let existEmail=await User.findOne({email})
        if (existEmail) {
          return res.status(400).json({ message: "Email already exists !" });
        }
         let existuserName = await User.findOne({ userName });
         if (existuserName) {
           return res.status(400).json({ message: "UserName already exists !" });
         }
         if(password.length<8){
            return res.status(400).json({message:"password must be at least 8 letters."})
         }

        let hassedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
          firstName,
          lastName,
          userName,
          email,
          password:hassedPassword,
        });

        let token = genToken(user._id);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 100,
          sameSite: "strict",
          secure: process.env.NODE_ENVIRONMENT==="production",
        });

        return res.status(201).json(user)
        

    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"signup error"})
       
    }
}

export const login=async(req,res)=>{
     try {
       const {email, password } = req.body;
       let user = await User.findOne({email});
       if (!user) {
         return res.status(400).json({ message: "User does not exists !" });
       }
      
       const isMatch=await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.status(400).json({message:"incorrect password"});
       }


       let token = genToken(user._id);
       res.cookie("token", token, {
         httpOnly: true,
         maxAge: 7 * 24 * 60 * 60 * 100,
         sameSite: "strict",
         secure: process.env.NODE_ENVIRONMENT === "production",
       });

       return res.status(201).json(user);
     } catch (err) {
       console.log(err.message);
       return res.status(500).json({ message: "login error" });
     }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"Logout successfully"});

    }catch(err){
        console.log(err.messsage);
        return res.status(500).json({message:"logout error"});
    }
}