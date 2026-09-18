import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'
  useEffect(() => { fetchRecords('leaderboard', leaderboardEndpoint).then(setEntries).catch((loadError) => setError(loadError.message)) }, [leaderboardEndpoint])
  return <section><div className="mb-4"><h1 className="h2 fw-bold mb-1">Leaderboard</h1><p className="text-secondary mb-0">Friendly competition, measured by consistency and effort.</p></div><div className="content-panel">{error ? <div className="alert alert-warning mb-0">{error}</div> : <div className="list-group list-group-flush">{entries.map((entry) => <div className="list-group-item d-flex align-items-center gap-3 px-0" key={entry._id || entry.rank}><span className="rank-badge">{entry.rank}</span><div className="flex-grow-1"><strong>{entry.name}</strong><div className="small text-secondary">{entry.streak} day streak</div></div><strong>{entry.points.toLocaleString()} pts</strong></div>)}{!entries.length && <p className="text-secondary mb-0">No leaderboard entries found.</p>}</div>}</div></section>
}
export default Leaderboard