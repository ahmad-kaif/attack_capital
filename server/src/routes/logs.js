import { Router } from 'express';
import { getCallLogs } from './webhooks.js';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ logs: getCallLogs() });
});

router.post('/clear', async (_req, res) => {
  const { clearCallLogs } = await import('./webhooks.js');
  clearCallLogs();
  res.json({ message: 'Logs cleared successfully' });
});


