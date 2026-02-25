import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { createClient } from 'redis';
import userRoutes from './routes/user.js';

dotenv.config();
connectDb();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not defined in .env");
}

export const redisClient = createClient({
  url: redisUrl,
});

redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Failed to connect to Redis', err));

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;



app.use("api/v1",userRoutes);

app.listen(port, () => {
  console.log(`User service is running on port ${port}`);
});