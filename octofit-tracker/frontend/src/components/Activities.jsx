import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchRecords('activities').then(setActivities).catch((loadError) => setError(loadError.message)) }, [])
  return <CollectionPage title="Activities" description="Recent movement logged by the OctoFit community.">{error ? <ErrorMessage message={error} /> : <div className="table-responsive"><table className="table align-middle mb-0"><thead><tr><th>Type</th><th>Duration</th><th>Calories</th><th>Distance</th><th>Date</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || `${activity.type}-${activity.date}`}><td className="text-capitalize fw-semibold">{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.calories} kcal</td><td>{activity.distanceKm} km</td><td>{new Date(activity.date).toLocaleDateString()}</td></tr>)}</tbody></table>{!activities.length && <EmptyMessage />}</div>}</CollectionPage>
}

function CollectionPage({ title, description, children }) { return <section><div className="mb-4"><h1 className="h2 fw-bold mb-1">{title}</h1><p className="text-secondary mb-0">{description}</p></div><div className="content-panel">{children}</div></section> }
function ErrorMessage({ message }) { return <div className="alert alert-warning mb-0">{message}</div> }
function EmptyMessage() { return <p className="text-secondary p-3 mb-0">No records found.</p> }
export default Activities