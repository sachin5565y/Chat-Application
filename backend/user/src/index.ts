import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { createClient } from 'redis';
import userRoutes from './routes/user.js';
import { connectRabbitMQ } from './config/rabbitmq.js';
import cors from 'cors';


dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL as string,
});

const startServer = async () => {
  connectDb();

  await redisClient.connect();
  console.log('Connected to Redis');

  await connectRabbitMQ();   // ⭐ FIX

  const app = express();
  app.use(express.json());
  app.use(cors());



  app.use("/api/v1", userRoutes);

  app.listen(process.env.PORT || 5000, () => {
    console.log("User service running");
  });
};

startServer();