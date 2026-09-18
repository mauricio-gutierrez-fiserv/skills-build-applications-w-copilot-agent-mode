import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'
  useEffect(() => { fetchRecords('users', usersEndpoint).then(setUsers).catch((loadError) => setError(loadError.message)) }, [usersEndpoint])
  return <section><div className="mb-4"><h1 className="h2 fw-bold mb-1">Users</h1><p className="text-secondary mb-0">Profiles, goals, and fitness levels across the school.</p></div><div className="content-panel">{error ? <div className="alert alert-warning mb-0">{error}</div> : <div className="table-responsive"><table className="table align-middle mb-0"><thead><tr><th>Name</th><th>Level</th><th>Age</th><th>City</th><th>Weekly goal</th></tr></thead><tbody>{users.map((user) => <tr key={user._id || user.email}><td><strong>{user.name}</strong><div className="small text-secondary">{user.email}</div></td><td><span className="badge rounded-pill text-bg-light text-capitalize">{user.fitnessLevel}</span></td><td>{user.age}</td><td>{user.city}</td><td>{user.weeklyGoal}</td></tr>)}</tbody></table>{!users.length && <p className="text-secondary p-3 mb-0">No users found.</p>}</div>}</div></section>
}
export default Users