import type { Movie } from '../types/movie'
import { tmdb } from '../lib/tmdb'
import { useNavigate } from 'react-router-dom'

interface MovieCardProps {
    movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
    const navigate = useNavigate()
    
    return (
        <div
        onClick={() => navigate(`/movie/${movie.id}`)} 
        className="group relative bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="relative">
                <img
                    src={tmdb.getImageUrl(movie.poster_path || '')}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-xs px-2 py-1 rounded font-mono">
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