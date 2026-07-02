import express from 'express';
import cors from 'cors';
import type { Model } from 'mongoose';
import { User } from './models/User.js';
import { Team } from './models/Team.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Workout } from './models/Workout.js';
import { connectToDatabase } from './database.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

const createCrudRoutes = <T>(resourceName: string, model: Model<T>) => {
  const basePath = `/api/${resourceName}`;

  app.get([basePath, `${basePath}/`], async (_req, res) => {
    try {
      const data = await model.find({}).lean();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch data' });
    }
  });

  app.post([basePath, `${basePath}/`], async (req, res) => {
    try {
      const created = await model.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: 'Unable to create resource' });
    }
  });
};

createCrudRoutes('users', User);
createCrudRoutes('teams', Team);
createCrudRoutes('activities', Activity);
createCrudRoutes('leaderboard', Leaderboard);
createCrudRoutes('workouts', Workout);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Octofit Tracker API is running',
    apiUrl: baseUrl,
    environment: 'codespaces-or-localhost',
  });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl: baseUrl, port: PORT });
});

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
