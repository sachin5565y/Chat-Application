import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

dotenv.config();
connectDb();

const app = express();
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`User service is running on port ${port}`);
})