import { publishToQueue } from "../config/rabbitmq.js";
import TryCatch from "../config/TryCatch.js";
import { redisClient } from "../index.js";


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
    

})