import mongoose from "mongoose";
const connectDb=async()=>{
    const url=process.env.MONGO_URI;
    if(!url){
        throw new Error("MONGO_URI is not defined in environment variables");
    }try {
        await mongoose.connect(url,{
            dbName:"chatappmicroserviceapp",
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error); 
        process.exit(1);
    }     
};

export default connectDb;