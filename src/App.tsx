import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import AppRoutes from './routes'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <AppRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App