import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

dotenv.config();
const app = express();
const port=process.env.PORT || 5002;

connectDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});