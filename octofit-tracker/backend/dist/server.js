"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const User_js_1 = require("./models/User.js");
const Team_js_1 = require("./models/Team.js");
const Activity_js_1 = require("./models/Activity.js");
const Leaderboard_js_1 = require("./models/Leaderboard.js");
const Workout_js_1 = require("./models/Workout.js");
const database_js_1 = require("./database.js");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const createCrudRoutes = (resourceName, model) => {
    const basePath = `/api/${resourceName}`;
    app.get([basePath, `${basePath}/`], async (_req, res) => {
        try {
            const data = await model.find({}).lean();
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ error: 'Unable to fetch data' });
        }
    });
    app.post([basePath, `${basePath}/`], async (req, res) => {
        try {
            const created = await model.create(req.body);
            res.status(201).json(created);
        }
        catch (error) {
            res.status(400).json({ error: 'Unable to create resource' });
        }
    });
};
createCrudRoutes('users', User_js_1.User);
createCrudRoutes('teams', Team_js_1.Team);
createCrudRoutes('activities', Activity_js_1.Activity);
createCrudRoutes('leaderboard', Leaderboard_js_1.Leaderboard);
createCrudRoutes('workouts', Workout_js_1.Workout);
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
(0, database_js_1.connectToDatabase)()
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
