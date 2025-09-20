export default function LogsViewer({ logs, onRefresh, loading = false }) {
  console.log('LogsViewer received logs:', logs);
  
  const clearLogs = async () => {
    if (!window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      return;
    }
    try {
      await fetch('/api/logs/clear', { method: 'POST' });
      onRefresh(); // Refresh to show empty logs
    } catch (e) {
      console.error('Error clearing logs:', e);
      alert('Error clearing logs. Please try again.');
    }
  };

  const getLogTypeIcon = (type) => {
    switch (type) {
      case 'pre-call': return '📞';
      case 'function': return '⚙️';
      case 'post-call': return '📋';
      default: return '📄';
    }
  };

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'pre-call': return '#3b82f6';
      case 'function': return '#10b981';
      case 'post-call': return '#f59e0b';
      default: return '#6b7280';
    }
  };
  
  return (
    <div className="logs-viewer">
      <div className="logs-controls">
        <div className="logs-info">
          <span className="auto-refresh-indicator">🔄 Auto-refreshes every 4 seconds</span>
          {loading && <span className="loading-indicator">Loading...</span>}
        </div>
        <div className="logs-actions">
          <button 
            onClick={onRefresh} 
            className="btn btn-secondary"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button 
            onClick={clearLogs} 
            className="btn btn-danger"
            disabled={loading || logs.length === 0}
          >
            Clear Logs
          </button>
        </div>
      </div>
      <div className="logs-content">
        {(logs || []).length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No logs yet</h3>
            <p>Make a call to your bot to see logs appear here in real-time.</p>
          </div>
        ) : (
          <div className="logs-list">
            {(logs || []).slice().reverse().map((log, idx) => (
              <div key={idx} className="log-entry">
                <div className="log-header">
                  <div className="log-type">
                    <span className="log-icon">{getLogTypeIcon(log.type)}</span>
                    <span className="log-type-text" style={{ color: getLogTypeColor(log.type) }}>
                      {log.type.toUpperCase()}
                      {log.name && ` (${log.name})`}
                    </span>
                  </div>
                  <div className="log-timestamp">
                    {new Date(log.at).toLocaleString()}
                  </div>
                </div>
                
                <div className="log-details">
                  {log.requestId && (
                    <div className="log-detail">
                      <strong>Request ID:</strong> 
                      <code>{log.requestId}</code>
                    </div>
                  )}
                  {log.callId && (
                    <div className="log-detail">
                      <strong>Call ID:</strong> 
                      <code>{log.callId}</code>
                    </div>
                  )}
                  {log.summary && (
                    <div className="log-detail">
                      <strong>Summary:</strong> 
                      <span>{log.summary}</span>
                    </div>
                  )}
                </div>

                <div className="log-expandable">
                  {log.payload && (
                    <details className="log-section">
                      <summary>📥 Request Payload</summary>
                      <pre className="log-json">{JSON.stringify(log.payload, null, 2)}</pre>
                    </details>
                  )}
                  {log.response && (
                    <details className="log-section">
                      <summary>📤 Response</summary>
                      <pre className="log-json">{JSON.stringify(log.response, null, 2)}</pre>
                    </details>
                  )}
                  {log.transcript && (
                    <details className="log-section">
                      <summary>💬 Transcript</summary>
                      <div className="transcript-content">
                        {Array.isArray(log.transcript) ? (
                          log.transcript.map((entry, i) => (
                            <div key={i} className={`transcript-entry ${entry[0]}`}>
                              <strong>{entry[0]}:</strong> {entry[1]}
                            </div>
                          ))
                        ) : (
                          <pre className="log-json">{JSON.stringify(log.transcript, null, 2)}</pre>
                        )}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


