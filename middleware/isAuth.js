import jwt from "jsonwebtoken";

const isAuth=async(req,res,next)=>{
    try{
        let token=req.cookies
        if(!token){
            return res.status(400).json({message:"user don't have a token"})
        }
        let verifyToken= jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"user don't have a valid token"});
        }
console.log(verifyToken);

        req.userId=verifyToken.id;
        next();
    }catch(err){
        return res.status(500).json({message:"Is Auth error"});

    }
}
export default isAuth