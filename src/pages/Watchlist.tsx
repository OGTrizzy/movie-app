import MovieCard from '../components/MovieCard'
import { useWatchlistStore } from '../store/useWatchlistStore'
import { Film } from 'lucide-react'

export default function Watchlist() {
    const { watchlist } = useWatchlistStore()

    if (watchlist.length === 0) {
        return (
            <div className="text-center py-32">
                <Film className="w-20 h-20 mx-auto text-zinc-700 mb-6" />
                <h2 className="text-3xl font-bold mb-3">Your Watchlist is Empty</h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                    Movies you add with the heart icon will appear here. Start exploring and add some movies to your watchlist!
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2">My Watchlist</h2>
                <p className="text-zinc-400">{watchlist.length} movies</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {watchlist.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}