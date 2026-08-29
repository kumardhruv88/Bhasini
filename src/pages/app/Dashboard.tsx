export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-display">Good afternoon, Dhruv</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Calls', value: '1,234' },
          { label: 'Avg. Latency', value: '450ms' },
          { label: 'CSAT Score', value: '4.8/5' },
          { label: 'Resolution Rate', value: '92%' },
        ].map((metric) => (
          <div key={metric.label} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <p className="text-sm text-muted mb-2">{metric.label}</p>
            <p className="text-3xl font-display font-bold text-text">{metric.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-card h-64 rounded-2xl border border-border shadow-sm flex items-center justify-center text-muted">
        [Placeholder for Charts/Recent Conversations]
      </div>
    </div>
  );
}
