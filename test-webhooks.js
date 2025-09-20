#!/usr/bin/env node

/**
 * Test script for webhook endpoints
 * Run this after starting the server to verify webhooks are working
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:4000/api/webhooks';

async function testWebhooks() {
  console.log('🧪 Testing Webhook Endpoints');
  console.log('============================');

  try {
    // Test pre-call webhook
    console.log('\n1. Testing Medical Pre-call Webhook...');
    const preCallResponse = await axios.post(`${BASE_URL}/pre-call`);
    console.log('✅ Medical pre-call webhook working');
    console.log('Response:', JSON.stringify(preCallResponse.data, null, 2));

    // Test function call webhook
    console.log('\n2. Testing Medical Function Call Webhook...');
    const functionResponse = await axios.post(`${BASE_URL}/function/fetch-record`, {
      id: 'MED-123'
    });
    console.log('✅ Medical function call webhook working');
    console.log('Response:', JSON.stringify(functionResponse.data, null, 2));

    // Test post-call webhook
    console.log('\n3. Testing Medical Post-call Webhook...');
    const postCallResponse = await axios.post(`${BASE_URL}/post-call`, {
      callId: 'test-call-123',
      transcript: 'Test medical conversation transcript',
      summary: 'Test medical call summary',
      duration: 120,
      status: 'completed',
      metadata: {
        domain: 'medical',
        callerId: 'MED-123'
      }
    });
    console.log('✅ Medical post-call webhook working');
    console.log('Response:', JSON.stringify(postCallResponse.data, null, 2));

    // Test logs endpoint
    console.log('\n4. Testing Logs Endpoint...');
    const logsResponse = await axios.get('http://localhost:4000/api/logs');
    console.log('✅ Logs endpoint working');
    console.log(`Found ${logsResponse.data.logs.length} log entries`);

    console.log('\n🎉 All medical webhook tests passed!');
    console.log('\nNext steps:');
    console.log('1. Set up ngrok: ngrok http 4000');
    console.log('2. Update NGROK_URL in server/.env');
    console.log('3. Create a medical bot in the web interface');
    console.log('4. Test with OpenMic dashboard using Medical IDs: MED-123, MED-456, MED-789, MED-321');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }
}

// Run tests
testWebhooks();
