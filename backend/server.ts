import express, {
  Request,
  Response
} from 'express';

import mongoose from 'mongoose';

import cors from 'cors';

import dotenv from 'dotenv';

import authRoutes
from './routes/authRoutes';

import profileRoutes
from './routes/profileRoutes';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI as string
  )
  .then(() => {

    console.log(
      'MongoDB Connected'
    );

  })
  .catch((err) => {

    console.log(err);

  });

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/profile',
  profileRoutes
);

app.get(
  '/',
  (
    req: Request,
    res: Response
  ) => {

    res.send(
      'Backend Running'
    );

  }
);

app.listen(
  5000,
  () => {

    console.log(
      'Server running on port 5000'
    );

  }
);