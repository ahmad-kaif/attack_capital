# 🏥 Medical Intake Agent with OpenMic API

A comprehensive medical intake system that integrates with OpenMic's conversational AI platform to provide intelligent patient intake, medical record retrieval, and real-time call monitoring.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Webhook Integration](#-webhook-integration)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🤖 Intelligent Medical Agent
- **Conversational AI**: Powered by OpenMic's advanced voice AI
- **Medical Record Integration**: Real-time patient data retrieval
- **Multi-voice Support**: Multiple voice options for different scenarios
- **Contextual Responses**: Medical domain-specific conversation handling

### 📊 Real-time Monitoring
- **Live Call Logs**: Real-time webhook event monitoring
- **Function Call Tracking**: Monitor medical record lookups
- **Call Analytics**: Success rates and performance metrics
- **Transcript Analysis**: Complete conversation transcripts

### 🔧 Developer Experience
- **Modern UI**: React-based dashboard with real-time updates
- **RESTful API**: Clean, documented API endpoints
- **Webhook System**: Comprehensive webhook integration
- **Hot Reload**: Development server with instant updates

### 🏥 Medical Features
- **Patient Records**: Pre-configured medical records (MED-123, MED-456, MED-789, MED-321)
- **Allergy Management**: Track patient allergies and conditions
- **Doctor Information**: Primary care physician and contact details
- **Insurance Integration**: Insurance provider information

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   OpenMic AI    │    │   React UI      │    │   Node.js API   │
│                 │    │                 │    │                 │
│  • Voice Agent  │◄──►│  • Dashboard    │◄──►│  • Webhooks     │
│  • Function     │    │  • Real-time    │    │  • Medical      │
│    Calls        │    │    Logs         │    │    Records      │
│  • Webhooks     │    │  • Bot Mgmt     │    │  • API Routes   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ngrok Tunnel  │    │   Vite Dev      │    │   Express       │
│                 │    │   Server        │    │   Server        │
│  • Public URL   │    │  • Hot Reload   │    │  • CORS         │
│  • SSL/TLS      │    │  • Proxy        │    │  • Middleware   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

**Frontend:**
- React 18 with Hooks
- Vite for build tooling
- Modern CSS with CSS Variables
- Real-time data updates

**Backend:**
- Node.js with Express
- RESTful API design
- Webhook handling
- In-memory data storage (demo)

**Integration:**
- OpenMic API for voice AI
- ngrok for public webhook URLs
- JSON-based data exchange

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **ngrok** (for webhook tunneling)
- **OpenMic Account** (for AI voice agent)

### System Requirements

- **OS**: macOS, Linux, or Windows
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 1GB free space
- **Network**: Internet connection for API calls

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/medical-intake-agent.git
cd medical-intake-agent
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Environment Setup

Create environment files for configuration:

```bash
# Server environment
cp server/.env.example server/.env

# Client environment (if needed)
cp client/.env.example client/.env
```

## ⚙️ Configuration

### 1. OpenMic Configuration

1. **Create OpenMic Account**: Sign up at [OpenMic.ai](https://openmic.ai)
2. **Get API Key**: Retrieve your API key from the dashboard
3. **Configure Webhooks**: Set up webhook URLs (see Webhook Integration section)

### 2. ngrok Setup

```bash
# Install ngrok
npm install -g ngrok

# Start ngrok tunnel
ngrok http 4000
```

Copy the public URL (e.g., `https://abc123.ngrok-free.app`) for webhook configuration.

### 3. Environment Variables

**Server (.env):**
```env
PORT=4000
NODE_ENV=development
OPENMIC_API_KEY=your_openmic_api_key
NGROK_URL=https://your-ngrok-url.ngrok-free.app
```

**Client (.env):**
```env
VITE_API_URL=http://localhost:4000/api
```

## 🎯 Usage

### 1. Start the Development Servers

```bash
# Terminal 1: Start the backend server
cd server
npm run dev

# Terminal 2: Start the frontend development server
cd client
npm run dev

# Terminal 3: Start ngrok tunnel
ngrok http 4000
```

### 2. Access the Application

- **Frontend Dashboard**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **ngrok Public URL**: https://your-url.ngrok-free.app

### 3. Configure Your Bot

1. **Open the Dashboard**: Navigate to http://localhost:5173
2. **Configure Agent**: Set up the medical agent prompt
3. **Create Bot**: Create a new medical intake bot
4. **Copy Bot UID**: Use the UID in OpenMic dashboard

### 4. Set Up OpenMic Webhooks

In your OpenMic dashboard, configure these webhook URLs:

```
Pre-call Webhook:
https://your-ngrok-url.ngrok-free.app/api/webhooks/pre-call

Function Call Webhook:
https://your-ngrok-url.ngrok-free.app/api/webhooks/function/fetch-record

Post-call Webhook:
https://your-ngrok-url.ngrok-free.app/api/webhooks/post-call
```

### 5. Test the System

1. **Make a Test Call**: Call your OpenMic bot
2. **Provide Medical ID**: Use one of the test IDs (MED-123, MED-456, MED-789, MED-321)
3. **Monitor Logs**: Watch real-time logs in the dashboard
4. **Verify Function Calls**: Ensure medical records are retrieved

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication
Currently, the API is open for development. In production, implement proper authentication.

### Endpoints

#### Bots Management

**GET /bots**
- **Description**: Retrieve all configured bots
- **Response**: Array of bot objects

**POST /bots**
- **Description**: Create a new bot
- **Body**:
  ```json
  {
    "name": "Medical Intake Agent",
    "prompt": "You are a professional medical intake agent...",
    "voice": "Helena"
  }
  ```

**PUT /bots/:id**
- **Description**: Update bot configuration
- **Body**: Bot update object

**DELETE /bots/:id**
- **Description**: Delete a bot
- **Response**: Success confirmation

#### Logs Management

**GET /logs**
- **Description**: Retrieve all call logs
- **Response**:
  ```json
  {
    "logs": [
      {
        "type": "pre-call|function|post-call",
        "requestId": "uuid",
        "at": "ISO timestamp",
        "payload": {},
        "response": {}
      }
    ]
  }
  ```

**POST /logs/clear**
- **Description**: Clear all logs
- **Response**: Success confirmation

#### Webhook Endpoints

**POST /webhooks/pre-call**
- **Description**: Pre-call webhook handler
- **Purpose**: Provide medical context before call starts

**POST /webhooks/function/fetch-record**
- **Description**: Function call webhook handler
- **Purpose**: Retrieve medical records by ID
- **Body**:
  ```json
  {
    "id": "MED-123"
  }
  ```

**POST /webhooks/post-call**
- **Description**: Post-call webhook handler
- **Purpose**: Process call transcripts and summaries

## 🔗 Webhook Integration

### Webhook Flow

1. **Pre-call**: OpenMic sends call context
2. **Function Call**: Agent requests medical records
3. **Post-call**: OpenMic sends call transcript

### Webhook Configuration in OpenMic

1. **Navigate to Bot Settings**
2. **Find Webhook Configuration**
3. **Add Function**: `fetch_record`
4. **Set Function URL**: Your ngrok URL + `/api/webhooks/function/fetch-record`
5. **Configure Parameters**:
   ```json
   {
     "type": "object",
     "properties": {
       "id": {
         "type": "string",
         "description": "Medical ID to fetch"
       }
     },
     "required": ["id"]
   }
   ```

### Test Medical Records

The system includes pre-configured test records:

| Medical ID | Patient Name | Allergies | Conditions |
|------------|--------------|-----------|------------|
| MED-123 | John Smith | Penicillin | Hypertension |
| MED-456 | Sarah Johnson | Peanuts, Latex | Diabetes Type 2 |
| MED-789 | Robert Davis | Shellfish | High Cholesterol, Arthritis |
| MED-321 | Maria Garcia | Aspirin | Asthma |

## 🛠️ Development

### Project Structure

```
medical-intake-agent/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.js         # API client
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   └── index.js       # Server entry point
│   └── package.json
├── README.md
└── package.json
```

### Development Commands

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev

# Start only backend
npm run dev:server

# Start only frontend
npm run dev:client

# Build for production
npm run build

# Run tests
npm test
```

### Code Style

- **ESLint**: Configured for React and Node.js
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### Adding New Features

1. **Backend**: Add routes in `server/src/routes/`
2. **Frontend**: Add components in `client/src/components/`
3. **API**: Update `client/src/api.js` for new endpoints
4. **Styling**: Use CSS variables in `client/src/App.css`

## 🧪 Testing

### Manual Testing

```bash
# Test complete webhook flow
node test-complete-flow.js

# Test individual endpoints
curl -X POST http://localhost:4000/api/webhooks/pre-call \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Automated Testing

```bash
# Run all tests
npm test

# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test
```

### Test Scenarios

1. **Bot Creation**: Create and configure bots
2. **Webhook Flow**: Test complete call flow
3. **Function Calls**: Test medical record retrieval
4. **Error Handling**: Test error scenarios
5. **UI Interactions**: Test dashboard functionality

## 🚀 Deployment

### Production Build

```bash
# Build frontend
cd client
npm run build

# Build backend
cd ../server
npm run build
```

### Environment Configuration

**Production Environment Variables:**
```env
NODE_ENV=production
PORT=4000
OPENMIC_API_KEY=your_production_api_key
NGROK_URL=https://your-production-domain.com
```

### Deployment Options

1. **Heroku**: Easy deployment with git integration
2. **Vercel**: Frontend deployment with serverless functions
3. **AWS**: Full-stack deployment with EC2/RDS
4. **Docker**: Containerized deployment

### Docker Deployment

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Changes**: Follow the coding standards
4. **Test Your Changes**: Ensure all tests pass
5. **Submit a Pull Request**: Provide a clear description

### Contribution Guidelines

- **Code Style**: Follow ESLint and Prettier configurations
- **Testing**: Add tests for new features
- **Documentation**: Update README and code comments
- **Commits**: Use conventional commit messages

### Development Workflow

1. **Issue Discussion**: Discuss features in GitHub issues
2. **Branch Naming**: Use descriptive branch names
3. **Pull Request**: Provide detailed PR descriptions
4. **Code Review**: Address review feedback
5. **Merge**: Squash and merge approved PRs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the maintainers for urgent issues

### Common Issues

**Q: Webhooks not working?**
A: Ensure ngrok is running and URLs are correctly configured in OpenMic.

**Q: Function calls not appearing?**
A: Verify the function is properly configured in OpenMic dashboard.

**Q: UI not updating?**
A: Check browser console for errors and ensure backend is running.

**Q: Medical records not found?**
A: Use the correct Medical IDs: MED-123, MED-456, MED-789, MED-321.

### Troubleshooting

1. **Check Logs**: Review server and browser console logs
2. **Verify Configuration**: Ensure all environment variables are set
3. **Test Endpoints**: Use curl or Postman to test API endpoints
4. **Network Issues**: Check firewall and network connectivity

---

**Built with ❤️ for the medical community**

*This project demonstrates modern web development practices and AI integration for healthcare applications.*