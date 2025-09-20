import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { listBots, createBot, updateBot, deleteBot, getLogs } from './api';
import DomainPrompt from './components/DomainPrompt';
import BotForm from './components/BotForm';
import BotsTable from './components/BotsTable';
import LogsViewer from './components/LogsViewer';

// Enhanced modern Card component with status indicators
const Card = ({ title, subtitle, children, status, className = "" }) => (
  <div className={`card ${className}`}>
    <div className="card-header">
      <div className="card-title-section">
        <h2>{title}</h2>
        {status && <span className={`status-indicator ${status}`}></span>}
      </div>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
    <div className="card-content">
      {children}
    </div>
  </div>
);

// Status Badge Component
const StatusBadge = ({ type, count }) => (
  <div className={`status-badge ${type}`}>
    <span className="badge-icon">
      {type === 'success' && '✅'}
      {type === 'warning' && '⚠️'}
      {type === 'error' && '❌'}
      {type === 'info' && 'ℹ️'}
    </span>
    <span className="badge-text">{count}</span>
  </div>
);

function App() {
  const [bots, setBots] = useState([]);
  const [loadingBots, setLoadingBots] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [prompt, setPrompt] = useState('You are a professional medical intake agent. Greet the caller warmly, ask for their Medical ID, and use the fetch_record function to retrieve their patient information. Confirm their allergies, current conditions, and the purpose of their call. Be empathetic and professional. Keep responses concise.');
  const [newBotName, setNewBotName] = useState('Medical Intake Agent');
  const [newVoice, setNewVoice] = useState('Helena');
  const [systemStatus, setSystemStatus] = useState('online');

  const domainHint = 'Pre-call returns patient context, in-call fetches MED-123, MED-456, MED-789, or MED-321.';

  const refreshBots = async () => {
    setLoadingBots(true);
    try {
      console.log('Fetching bots...');
      const data = await listBots();
      console.log('Bots data received:', data);
      const botsArray = data?.bots || data || [];
      console.log('Setting bots to:', botsArray);
      setBots(botsArray);
    } catch (e) {
      console.error('Error fetching bots:', e);
    } finally {
      setLoadingBots(false);
    }
  };

  const refreshLogs = async () => {
    setLoadingLogs(true);
    try {
      console.log('Fetching logs...');
      const data = await getLogs();
      console.log('Logs data received:', data);
      const logsArray = data.logs || [];
      console.log('Setting logs to:', logsArray);
      setLogs(logsArray);
      setSystemStatus('online');
    } catch (e) {
      console.error('Error fetching logs:', e);
      setSystemStatus('error');
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    refreshBots();
    refreshLogs();
    const id = setInterval(refreshLogs, 4000);
    return () => clearInterval(id);
  }, []);

  const onCreate = async () => {
    if (!newBotName.trim() || !prompt.trim()) {
      alert("Please provide both a bot name and a prompt");
      return;
    }
    try {
      // console.log('Creating bot with:', { name: newBotName, prompt: prompt, voice: newVoice });
      const result = await createBot({ 
        name: newBotName, 
        prompt: prompt, 
        voice: newVoice 
      });
      // console.log('Bot created successfully:', result);
      await refreshBots();
    } catch (e) {
      console.error("Error creating bot:", e.response?.data || e.message);
    }
  };

  const onUpdate = async (bot) => {
    const newName = window.prompt(`Rename bot '${bot.name}'`, bot.name);
    if (!newName) return;
    try {
      await updateBot(bot.id || bot.uid || bot.botId, { name: newName });
      await refreshBots();
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async (bot) => {
    if (!window.confirm(`Delete bot '${bot.name}'?`)) return;
    try {
      await deleteBot(bot.id || bot.uid || bot.botId);
      await refreshBots();
    } catch (e) {
      console.error(e);
    }
  };

  // Debug logging
  // console.log('Current bots state:', bots);
  // console.log('Current logs state:', logs);
  // console.log('Loading bots:', loadingBots);

  // Calculate log statistics
  const logStats = useMemo(() => {
    const preCallLogs = logs.filter(log => log.type === 'pre-call').length;
    const functionLogs = logs.filter(log => log.type === 'function').length;
    const postCallLogs = logs.filter(log => log.type === 'post-call').length;
    return { preCallLogs, functionLogs, postCallLogs, total: logs.length };
  }, [logs]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🏥 Medical Intake Agent</h1>
            <p className="header-subtitle">OpenMic API Integration Dashboard</p>
          </div>
          <div className="header-status">
            <div className={`system-status ${systemStatus}`}>
              <span className="status-dot"></span>
              <span className="status-text">
                {systemStatus === 'online' ? 'System Online' : 
                 systemStatus === 'error' ? 'Connection Error' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* Status Dashboard */}
        <div className="status-dashboard">
          <div className="status-cards">
            <div className="status-card">
              <h3>Active Bots</h3>
              <div className="status-value">{bots.length}</div>
            </div>
            <div className="status-card">
              <h3>Total Calls</h3>
              <div className="status-value">{logStats.total}</div>
            </div>
            <div className="status-card">
              <h3>Function Calls</h3>
              <div className="status-value">{logStats.functionLogs}</div>
            </div>
            <div className="status-card">
              <h3>Success Rate</h3>
              <div className="status-value">
                {logStats.total > 0 ? Math.round((logStats.functionLogs / logStats.total) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        <div className="app-layout">
          {/* Sidebar for configuration and actions */}
          <aside className="app-sidebar">
            <Card title="1. Configure Medical Agent" subtitle={domainHint} status="info">
              <DomainPrompt prompt={prompt} setPrompt={setPrompt} />
            </Card>
            <Card title="2. Create Medical Bot" status={bots.length > 0 ? "success" : "warning"}>
              <BotForm newBotName={newBotName} setNewBotName={setNewBotName} newVoice={newVoice} setNewVoice={setNewVoice} onCreate={onCreate} />
            </Card>
          </aside>

          {/* Main content area for displaying data */}
          <div className="app-content">
            <Card title="Available Bots" status={bots.length > 0 ? "success" : "warning"}>
              <BotsTable bots={bots} loading={loadingBots} onRefresh={refreshBots} onUpdate={onUpdate} onDelete={onDelete} />
              <div className="help-section">
                <p className="help-text">
                  <strong>Next Steps:</strong> Use the Bot UID in the OpenMic dashboard. The bot is pre-configured with medical webhooks: pre-call, function call (fetch-record), and post-call webhooks via your ngrok URL.
                </p>
              </div>
            </Card>
            <Card title="Real-time Call Logs" status={logs.length > 0 ? "success" : "info"}>
              <div className="logs-header">
                <div className="log-stats">
                  <StatusBadge type="info" count={logStats.preCallLogs} />
                  <StatusBadge type="success" count={logStats.functionLogs} />
                  <StatusBadge type="warning" count={logStats.postCallLogs} />
                </div>
              </div>
              <LogsViewer logs={logs} onRefresh={refreshLogs} loading={loadingLogs} />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;