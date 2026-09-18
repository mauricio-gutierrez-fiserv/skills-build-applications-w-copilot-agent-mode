import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const navigation = [
    ['Users', '/users'],
    ['Activities', '/activities'],
    ['Teams', '/teams'],
    ['Leaderboard', '/leaderboard'],
    ['Workouts', '/workouts'],
  ]
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">OctoFit Tracker</NavLink>
          <nav className="navbar-nav ms-auto flex-row flex-wrap gap-2" aria-label="Main navigation">
            {navigation.map(([label, path]) => (
              <NavLink className={({ isActive }) => `nav-link px-2 ${isActive ? 'active' : ''}`} key={path} to={path}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Dashboard() {
  const cards = [
    ['Users', 'See student profiles and weekly goals.', '/users'],
    ['Activities', 'Review the latest movement and progress.', '/activities'],
    ['Workouts', 'Find a session matched to your focus.', '/workouts'],
  ]

  return (
    <section className="dashboard-intro">
      <p className="text-uppercase text-success fw-semibold small mb-2">Mergington High School</p>
      <h1 className="display-5 fw-bold">Move together. Grow stronger.</h1>
      <p className="lead text-secondary mb-4">Track activity, celebrate consistency, and keep every team moving forward.</p>
      <div className="row g-3">
        {cards.map(([title, description, path]) => (
          <div className="col-md-4" key={path}>
            <NavLink className="dashboard-card d-block h-100 text-decoration-none" to={path}>
              <h2 className="h4 text-dark">{title}</h2>
              <p className="text-secondary mb-0">{description}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  )
}

export default App
