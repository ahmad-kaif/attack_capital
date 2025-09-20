export default function BotsTable({ bots, loading, onRefresh, onUpdate, onDelete }) {
  console.log('BotsTable received bots:', bots);
  console.log('BotsTable received loading:', loading);
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#6b7280', fontSize: 13 }}>Use UID in OpenMic dashboard for configuration.</div>
        <button onClick={onRefresh} disabled={loading}>{loading ? 'Loading…' : 'Refresh'}</button>
      </div>
      <div style={{ marginTop: 12 }}>
        {(bots || []).length === 0 ? <div>No bots yet.</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>UID</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Voice</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(bots || []).map((b) => (
                <tr key={b.id || b.uid || b.botId} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px' }}>{b.name}</td>
                  <td style={{ padding: '8px' }}>
                    <code style={{ 
                      backgroundColor: '#f3f4f6', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      fontSize: '0.85rem'
                    }}>
                      {b.id || b.uid || b.botId}
                    </code>
                  </td>
                  <td style={{ padding: '8px', textTransform: 'capitalize' }}>
                    {b.voice || 'alloy'}
                  </td>
                  <td style={{ padding: '8px' }}>
                    <button onClick={() => onUpdate(b)} style={{ marginRight: '8px' }}>Rename</button>
                    <button onClick={() => onDelete(b)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}


