import path from 'path';
import uploadRoutes
from './routes/uploadRoutes';
import express, {
  Request,
  Response
} from 'express';

import campaignRoutes
from './routes/campaignRoutes';

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

app.use(
  '/api/campaign',
  campaignRoutes
);

app.use(
  '/uploads',
  express.static(
    path.join(__dirname, 'uploads')
  )
);

app.use(
  '/api/upload',
  uploadRoutes
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

