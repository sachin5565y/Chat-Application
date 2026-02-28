import { generateToken } from "../config/genrateToken.js";
import { publishToQueue } from "../config/rabbitmq.js";
import TryCatch from "../config/TryCatch.js";
import { redisClient } from "../index.js";
import { AuthenticatedRequest } from "../middleware/isAuth.js";
import { User } from "../model/User.js";


export const loginUser=TryCatch(async(req,res)=>{
    const {email}=req.body;
    const reateLimitKey=`otp:ratelimit:${email}`;
    const reateLimit=await redisClient.get(reateLimitKey);
    if(reateLimit){
        return res.status(429).json({message:"Too many login attempts. Please try again later."});

    } 
    const otp=Math.floor(100000+Math.random()*900000).toString();
    const otpKey=`otp:${email}`;
    await redisClient.set(otpKey,otp,{
        EX:300
    });
    await redisClient.set(reateLimitKey,"1",{
        EX:60
    });

    const message={
        to:email,
        subject:"Your OTP for login",
        body:`Your OTP for login is ${otp}. It is valid for 5 minutes.`
    }
    await publishToQueue("send-otp",message);
    res.status(200).json({message:"OTP sent to email"});
    

});

export const verifyUser = TryCatch(async (req, res) => {
  const { email, otp: enteredOtp } = req.body;

  if (!email || !enteredOtp) {
    res.status(400).json({
      message: "Email and OTP Required",
    });
    return;
  }

  const otpKey = `otp:${email}`;

  const storedOtp = await redisClient.get(otpKey);

  if (!storedOtp || storedOtp !== enteredOtp) {
    res.status(400).json({
      message: "Invalid or expired OTP",
    });
    return;
  }

  await redisClient.del(otpKey);

  let user = await User.findOne({ email });

  if (!user) {
    const name = email.slice(0, 8);
    user = await User.create({ name, email });
  }

  const token = generateToken(user);

  res.json({
    message: "User Verified",
    user,
    token,
  });
});



export const myprofile=TryCatch(async(req:AuthenticatedRequest,res)=>{
    const user=req.user;
    res.json({
        message:"My Profile",
        user
    })

});
