import express from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
import { apiPort, getApiBaseUrl } from './config/api.js';
import { connectToDatabase } from './config/database.js';
const app = express();
const port = Number(process.env.PORT || apiPort);
const codespaceName = process.env.CODESPACE_NAME;
const codespaceBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : undefined;
const apiBaseUrl = codespaceBaseUrl || getApiBaseUrl(undefined, port);
app.use(express.json());
app.get('/api/health', async (_request, response) => {
    try {
        const status = await Promise.resolve((await import('mongoose')).default.connection.readyState === 1 ? 'ok' : 'error');
        response.json({ status, apiBaseUrl, database: status === 'ok' ? 'connected' : 'disconnected' });
    }
    catch (error) {
        response.status(500).json({ status: 'error', message: 'Database unavailable' });
    }
});
app.get('/api/config', (_request, response) => {
    response.json({
        apiBaseUrl,
        port,
        codespaceName: process.env.CODESPACE_NAME || null,
    });
});
const registerCollectionRoute = (path, model) => {
    app.get(path, async (_request, response) => {
        try {
            const records = await model.find({}).lean();
            response.json(records);
        }
        catch (error) {
            response.status(500).json({ message: 'Unable to fetch records', error });
        }
    });
    app.get(`${path.replace(/\/$/, '')}`, async (_request, response) => {
        try {
            const records = await model.find({}).lean();
            response.json(records);
        }
        catch (error) {
            response.status(500).json({ message: 'Unable to fetch records', error });
        }
    });
};
const startServer = async () => {
    await connectToDatabase();
    registerCollectionRoute('/api/users/', User);
    registerCollectionRoute('/api/teams/', Team);
    registerCollectionRoute('/api/activities/', Activity);
    registerCollectionRoute('/api/leaderboard/', LeaderboardEntry);
    registerCollectionRoute('/api/workouts/', Workout);
    app.listen(port, () => {
        console.log(`OctoFit API listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
export { app, apiBaseUrl };
