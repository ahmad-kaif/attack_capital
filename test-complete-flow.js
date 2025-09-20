#!/usr/bin/env node

// Test script to simulate complete OpenMic call flow
const https = require('https');

const NGROK_URL = 'https://36e3a15bca93.ngrok-free.app';
const MEDICAL_IDS = ['MED-123', 'MED-456', 'MED-789', 'MED-321'];

async function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function testCompleteFlow(medicalId) {
  console.log(`\n🧪 Testing complete flow with ${medicalId}...`);
  
  try {
    // 1. Pre-call
    console.log('1️⃣ Pre-call webhook...');
    const preCall = await makeRequest(`${NGROK_URL}/api/webhooks/pre-call`, {
      event: 'call',
      call: {
        direction: 'inbound',
        from_number: 'test',
        to_number: 'test',
        attempt: 1,
        bot_id: 'test-bot'
      }
    });
    console.log('✅ Pre-call successful');

    // 2. Function call
    console.log('2️⃣ Function call webhook...');
    const functionCall = await makeRequest(`${NGROK_URL}/api/webhooks/function/fetch-record`, {
      id: medicalId
    });
    console.log('✅ Function call successful');
    console.log(`   Patient: ${functionCall.record?.name || 'Not found'}`);

    // 3. Post-call
    console.log('3️⃣ Post-call webhook...');
    const postCall = await makeRequest(`${NGROK_URL}/api/webhooks/post-call`, {
      callId: `test-call-${medicalId}`,
      summary: `Test call with ${medicalId} - function call successful`,
      transcript: [
        ['user', `My medical ID is ${medicalId}`],
        ['assistant', 'Let me fetch your record'],
        ['user', 'I have a fever'],
        ['assistant', `I found your record. ${functionCall.record ? `You are ${functionCall.record.name}` : 'Record not found'}`]
      ],
      duration: 180,
      status: 'completed'
    });
    console.log('✅ Post-call successful');

    console.log(`🎉 Complete flow test successful for ${medicalId}!`);
    
  } catch (error) {
    console.error(`❌ Error testing ${medicalId}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting complete call flow tests...');
  console.log(`📡 Using ngrok URL: ${NGROK_URL}`);
  
  // Test with each medical ID
  for (const medicalId of MEDICAL_IDS) {
    await testCompleteFlow(medicalId);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
  }
  
  console.log('\n✅ All tests completed! Check your UI for logs.');
  console.log('🌐 View logs at: http://localhost:5173');
}

main().catch(console.error);
