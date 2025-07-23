import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    let token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
    
    return token;
  } catch (err) {
    console.log("Token generation error:", err);
    throw err;
  }
};

export default genToken;
