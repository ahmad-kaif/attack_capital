import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { router as botRouter } from './routes/bots.js';
import { router as webhookRouter } from './routes/webhooks.js';
import { router as logsRouter } from './routes/logs.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/bots', botRouter);
app.use('/api/webhooks', webhookRouter);
app.use('/api/logs', logsRouter);

app.use((err, _req, res, _next) => {
  console.error('Error handler:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


