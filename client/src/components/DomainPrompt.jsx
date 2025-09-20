export default function DomainPrompt({ prompt, setPrompt }) {
  const defaultPrompt = 'You are a professional medical intake agent. Greet the caller warmly, ask for their Medical ID, and use the fetch_record function to retrieve their patient information. Confirm their allergies, current conditions, and the purpose of their call. Be empathetic and professional. Keep responses concise.';

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ 
          backgroundColor: '#dbeafe', 
          color: '#1e40af',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: '500'
        }}>
          🏥 Medical Intake Agent
        </div>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>
          Pre-call returns patient context; try IDs MED-123, MED-456, MED-789, or MED-321 in-call.
        </span>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: '500' }}>
          Agent Prompt:
        </label>
        <textarea 
          value={prompt || defaultPrompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          rows={6} 
          style={{ width: '100%' }}
          placeholder="Enter the agent's instructions and behavior..."
        />
        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 4 }}>
          💡 The agent will automatically fetch patient records using the fetch_record function when a Medical ID is provided.
        </div>
      </div>
    </div>
  )
}


