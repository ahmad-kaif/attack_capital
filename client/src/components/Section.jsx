export default function Section({ title, subtitle, actions, children }) {
  return (
    <section style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
          {subtitle ? <div style={{ color: '#6b7280', marginTop: 4, fontSize: 13 }}>{subtitle}</div> : null}
        </div>
        {actions ? <div>{actions}</div> : null}
      </div>
      <div style={{ marginTop: 12 }}>
        {children}
      </div>
    </section>
  )
}


