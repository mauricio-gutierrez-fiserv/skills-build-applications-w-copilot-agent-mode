import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchRecords('teams').then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="mb-4"><h1 className="h2 fw-bold mb-1">Teams</h1><p className="text-secondary mb-0">Find your crew and the goals bringing them together.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id || team.name}><article className="team-card h-100"><div className="d-flex justify-content-between gap-3"><h2 className="h5 mb-1">{team.name}</h2><span className="badge text-bg-success">{team.sport}</span></div><p className="text-secondary small mb-3">{team.goal}</p><div className="small"><strong>{team.members}</strong> members <span className="mx-2 text-secondary">|</span> Captain: {team.captain}</div></article></div>)}{!teams.length && <p className="text-secondary">No teams found.</p>}</div>}</section>
}
export default Teams