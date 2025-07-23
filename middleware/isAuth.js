import jwt from "jsonwebtoken";

const isAuth=async(req,res,next)=>{
    console.log("isAuth middleware called");
    try{
        
        let token =req.cookies.token 

        
        if(!token){
            return res.status(400).json({message:"user don't have a token"})
        }
        let verifyToken= jwt.verify(token,process.env.JWT_SECRET||"JNkjbvhcs34nkds")
        
        if(!verifyToken){
            return res.status(400).json({message:"user don't have a valid token"});
        }
console.log(verifyToken);

        req.userId=verifyToken.id;
        console.log("req.userId set to:", req.userId);
        next();
    }catch(err){
        console.error(err.message);
        return res.status(500).json({message:"Is Auth error"});

    }
}
export default isAuth;