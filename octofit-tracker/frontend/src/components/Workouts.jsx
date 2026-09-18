import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchRecords('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="mb-4"><h1 className="h2 fw-bold mb-1">Workouts</h1><p className="text-secondary mb-0">Sessions to help every athlete keep building momentum.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="row g-3">{workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id || workout.title}><article className="workout-card h-100"><div className="d-flex justify-content-between gap-2 mb-3"><span className="badge text-bg-dark">{workout.type}</span><span className="small text-capitalize text-secondary">{workout.difficulty}</span></div><h2 className="h5">{workout.title}</h2><p className="text-secondary small">{workout.focusArea}</p><div className="small mt-auto">{workout.durationMinutes} min <span className="mx-2 text-secondary">|</span> Coach {workout.coach}</div></article></div>)}{!workouts.length && <p className="text-secondary">No workouts found.</p>}</div>}</section>
}
export default Workouts