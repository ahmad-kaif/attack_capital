export default function BotForm({ newBotName, setNewBotName, newVoice, setNewVoice, onCreate }) {
  const voiceOptions = [
    { value: 'alloy', label: 'Alloy (Neutral)' },
    { value: 'echo', label: 'Echo (Male)' },
    { value: 'fable', label: 'Fable (Male)' },
    { value: 'onyx', label: 'Onyx (Male)' },
    { value: 'nova', label: 'Nova (Female)' },
    { value: 'shimmer', label: 'Shimmer (Female)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          value={newBotName} 
          onChange={(e) => setNewBotName(e.target.value)} 
          placeholder="Bot name" 
          style={{ flex: 1, minWidth: '200px' }}
        />
        <select 
          value={newVoice} 
          onChange={(e) => setNewVoice(e.target.value)}
          style={{ minWidth: '150px' }}
        >
          {voiceOptions.map(voice => (
            <option key={voice.value} value={voice.value}>
              {voice.label}
            </option>
          ))}
        </select>
        <button onClick={onCreate} style={{ minWidth: '100px' }}>
          Create Bot
        </button>
      </div>
      <div style={{ fontSize: '0.85rem', color: '#666' }}>
        💡 The bot will be configured with pre-call, function call, and post-call webhooks automatically.
      </div>
    </div>
  )
}


