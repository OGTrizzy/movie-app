import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import TopRated from './pages/TopRated'
import Watchlist from './pages/Watchlist'
import PopularTV from './pages/PopularTV'
import TVDetails from './pages/TVDetails'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/tv" element={<PopularTV />} />
            <Route path="/tv/:id" element={<TVDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            {/* Add more routes here as needed */}
        </Routes>
    )
}