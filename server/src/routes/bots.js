import { Router } from 'express';
import axios from 'axios';

export const router = Router();

const OPENMIC_API_BASE = process.env.OPENMIC_API_BASE || 'https://api.openmic.ai';

function getAuthHeaders() {
  const apiKey = process.env.OPENMIC_API_KEY || '';
  return { Authorization: `Bearer ${apiKey}` };
}

// List bots
router.get('/', async (_req, res) => {
  try {
    const r = await axios.get(`${OPENMIC_API_BASE}/v1/bots`, {
      headers: getAuthHeaders(),
    });
    res.json(r.data);
  } catch (e) {
    res.status(e.response?.status || 500).json({ error: e.message, details: e.response?.data });
  }
});

// Create medical intake bot
router.post('/', async (req, res) => {
  try {
    const { name, prompt, voice = 'alloy' } = req.body;
    
    // Get ngrok URL from environment or use localhost for development
    const baseUrl = process.env.NGROK_URL || 'http://localhost:4000';
    
    // Create medical bot configuration with webhooks and function calls
    const botConfig = {
      name,
      prompt,
      voice,
      // Pre-call webhook configuration
      pre_call_webhook: {
        url: `${baseUrl}/api/webhooks/pre-call`,
        method: 'POST'
      },
      // Post-call webhook configuration  
      post_call_webhook: {
        url: `${baseUrl}/api/webhooks/post-call`,
        method: 'POST'
      },
      // Function call configuration for medical records
      functions: [
        {
          name: 'fetch_record',
          description: 'Fetch patient medical record by Medical ID',
          parameters: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The Medical ID to fetch (e.g., MED-123, MED-456, MED-789, MED-321)'
              }
            },
            required: ['id']
          },
          url: `${baseUrl}/api/webhooks/function/fetch-record`,
          method: 'POST'
        }
      ]
    };

    const r = await axios.post(`${OPENMIC_API_BASE}/v1/bots`, botConfig, {
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    });
    
    // Add medical domain info to response
    const response = {
      ...r.data,
      domain: 'medical',
      webhookUrls: {
        preCall: botConfig.pre_call_webhook.url,
        postCall: botConfig.post_call_webhook.url,
        functionCall: botConfig.functions[0].url
      }
    };
    
    res.json(response);
  } catch (e) {
    res.status(e.response?.status || 500).json({ error: e.message, details: e.response?.data });
  }
});

// Update bot
router.put('/:botId', async (req, res) => {
  try {
    const { botId } = req.params;
    const r = await axios.put(`${OPENMIC_API_BASE}/v1/bots/${botId}`, req.body, {
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    });
    res.json(r.data);
  } catch (e) {
    res.status(e.response?.status || 500).json({ error: e.message, details: e.response?.data });
  }
});

// Delete bot
router.delete('/:botId', async (req, res) => {
  try {
    const { botId } = req.params;
    const r = await axios.delete(`${OPENMIC_API_BASE}/v1/bots/${botId}`, {
      headers: getAuthHeaders(),
    });
    res.json(r.data || { ok: true });
  } catch (e) {
    res.status(e.response?.status || 500).json({ error: e.message, details: e.response?.data });
  }
});


