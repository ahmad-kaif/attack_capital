#!/bin/bash

echo "🚀 Setting up Medical Intake Agent with OpenMic API"
echo "===================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi

# Install client dependencies
echo "📦 Installing client dependencies..."
cd ../client
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
cd ../server
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# OpenMic API Configuration
OPENMIC_API_KEY=your_openmic_api_key_here
OPENMIC_API_BASE=https://api.openmic.ai

# Server Configuration
PORT=4000

# Ngrok Configuration (update with your ngrok URL)
NGROK_URL=https://your-ngrok-url.ngrok.io
EOF
    echo "✅ Created .env file. Please update it with your OpenMic API key and ngrok URL."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Get your OpenMic API key from: https://chat.openmic.ai/api-key-demo-735023852"
echo "2. Update the OPENMIC_API_KEY in server/.env"
echo "3. Install ngrok: npm install -g ngrok"
echo "4. Start ngrok: ngrok http 4000"
echo "5. Update NGROK_URL in server/.env with your ngrok URL"
echo "6. Start the server: cd server && npm run dev"
echo "7. Start the client: cd client && npm run dev"
echo ""
echo "Then visit http://localhost:5173 to create and manage medical intake bots!"
