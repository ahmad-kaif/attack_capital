import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const router = Router();

// In-memory stores for demo ------- temporary - will shift to actual db 
const callLogs = [];
const idToRecord = new Map();

// Seed demo medical records
idToRecord.set('MED-123', { 
  id: 'MED-123', 
  name: 'John Smith', 
  allergies: ['Penicillin'], 
  lastVisit: '2025-01-15',
  age: 45,
  conditions: ['Hypertension'],
  emergencyContact: 'Jane Smith (555-0123)',
  primaryDoctor: 'Dr. Sarah Wilson',
  insuranceProvider: 'Blue Cross Blue Shield'
});
idToRecord.set('MED-456', { 
  id: 'MED-456', 
  name: 'Sarah Johnson', 
  allergies: ['Peanuts', 'Latex'], 
  lastVisit: '2025-01-10',
  age: 32,
  conditions: ['Diabetes Type 2'],
  emergencyContact: 'Mike Johnson (555-0456)',
  primaryDoctor: 'Dr. Michael Chen',
  insuranceProvider: 'Aetna'
});
idToRecord.set('MED-789', { 
  id: 'MED-789', 
  name: 'Robert Davis', 
  allergies: ['Shellfish'], 
  lastVisit: '2025-01-08',
  age: 58,
  conditions: ['High Cholesterol', 'Arthritis'],
  emergencyContact: 'Linda Davis (555-0789)',
  primaryDoctor: 'Dr. Emily Rodriguez',
  insuranceProvider: 'UnitedHealth'
});
idToRecord.set('MED-321', { 
  id: 'MED-321', 
  name: 'Maria Garcia', 
  allergies: ['Aspirin'], 
  lastVisit: '2025-01-12',
  age: 28,
  conditions: ['Asthma'],
  emergencyContact: 'Carlos Garcia (555-0321)',
  primaryDoctor: 'Dr. James Thompson',
  insuranceProvider: 'Cigna'
});

// Pre-call webhook: return medical context before call starts
router.post('/pre-call', async (req, res) => {
  const requestId = uuidv4();
  const now = new Date().toISOString();
  
  console.log('🔔 PRE-CALL webhook received:', { requestId, body: req.body, timestamp: now });

  const context = {
    requestId,
    receivedAt: now,
    domain: 'medical',
    patientContext: {
      greetingName: 'Patient',
      lastCallSummary: 'Follow-up needed on lab results.',
      preferredLanguage: 'en',
      department: 'Internal Medicine',
      doctorOnCall: 'Dr. Sarah Wilson',
      clinicHours: 'Monday-Friday 8:00 AM - 6:00 PM',
      emergencyContact: 'For emergencies, call 911 or visit the nearest ER'
    }
  };

  callLogs.push({ type: 'pre-call', requestId, at: now, payload: req.body, response: context });
  res.json(context);
});

// In-call function: fetch medical record by provided ID
router.post('/function/fetch-record', async (req, res) => {
  const requestId = uuidv4();
  const now = new Date().toISOString();
  const { id } = req.body || {};
  
  console.log('🔔 FUNCTION webhook received:', { requestId, id, body: req.body, timestamp: now });

  // Normalize ID (handle case variations)
  const normalizedId = id ? id.toUpperCase().trim() : '';
  const record = idToRecord.get(normalizedId) || null;
  
  let response = {
    found: Boolean(record),
    record,
    id: normalizedId,
    timestamp: now,
    domain: 'medical'
  };

  // Add helpful information if record not found
  if (!record) {
    response.suggestions = "Try MED-123, MED-456, MED-789, or MED-321";
    response.availableRecords = ['MED-123', 'MED-456', 'MED-789', 'MED-321'];
  }

  callLogs.push({ type: 'function', name: 'fetch-record', requestId, at: now, payload: req.body, response });
  res.json(response);
});

// Post-call webhook: receive transcript and metadata for medical calls
router.post('/post-call', async (req, res) => {
  const requestId = uuidv4();
  const now = new Date().toISOString();
  const { transcript, summary, callId, metadata, duration, status } = req.body || {};
  
  console.log('🔔 POST-CALL webhook received:', { requestId, callId, summary, timestamp: now });

  // Process the medical call data
  const processedData = {
    callId,
    duration,
    status,
    transcript: transcript || 'No transcript available',
    summary: summary || 'No summary available',
    metadata: metadata || {},
    processedAt: now,
    requestId,
    domain: 'medical',
    followUpActions: [
      'Schedule follow-up appointment if needed',
      'Update patient record with call notes',
      'Send appointment reminder if scheduled',
      'Notify primary care physician of any concerns'
    ]
  };

  callLogs.push({ type: 'post-call', requestId, at: now, ...processedData });
  res.json({ 
    ok: true, 
    processed: true,
    requestId,
    domain: 'medical',
    followUpActions: processedData.followUpActions
  });
});

// Expose logs for UI via separate router
export function getCallLogs() {
  return callLogs;
}

export function clearCallLogs() {
  callLogs.length = 0;
}


