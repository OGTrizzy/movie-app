import type { Movie } from '../types/movie'
import { tmdb } from '../lib/tmdb'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWatchlistStore } from '../store/useWatchlistStore'

interface MovieCardProps {
    movie: Movie
    mediaType?: 'movie' | 'tv'
}

export default function MovieCard({ movie, mediaType = 'movie' }: MovieCardProps) {
    const navigate = useNavigate()
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()

    const isFavorite = isInWatchlist(movie.id)

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isFavorite) {
        removeFromWatchlist(movie.id)
        } else {
        addToWatchlist(movie)
        }
    }

    const handleClick = () => {
        const path = mediaType === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`
        navigate(path)
    }
    return (
        <div 
            onClick={handleClick}
            className="group relative bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
            <div className="relative">
                <img 
                src={tmdb.getImageUrl(movie.poster_path || '')} 
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
                />
        
                <button
                    onClick={toggleFavorite}
                    className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-all z-10"
                >
                <Heart 
                    className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                />
                </button>

                <div className="absolute top-3 left-3 bg-black/70 text-xs px-2 py-1 rounded font-mono">
                {movie.vote_average.toFixed(1)}
                </div>
            </div>
      
            <div className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-red-500 transition-colors">
                    {movie.title}
                </h3>
                <p className="text-sm text-zinc-400">
                    {new Date(movie.release_date).getFullYear()}
                </p>
            </div>
        </div>
    )
}