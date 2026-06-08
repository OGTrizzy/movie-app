import { useParams, useNavigate } from 'react-router-dom'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { tmdb } from '../lib/tmdb'
import { ArrowLeft } from 'lucide-react'

export default function MovieDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const movieId = Number(id)

    const { data: movie, isLoading, error } = useMovieDetails(movieId)

    if (isLoading) {
        return <div className="text-center py-20">Loading...</div>
    }

    if (error || !movie) {
        return <div className="text-center text-red-500 py-20">Something went wrong!</div>
    }

    return (
        <div className="max-w-5xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-8 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back
            </button>

            <div className="grid md:grid-cols-12 gap-10">
                {/* Movie Poster */}
                <div className="md:col-span-5">
                    <img
                        src={tmdb.getImageUrl(movie.poster_path || '', 'original')}
                        alt={movie.title}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Movie Details */}
                <div className="md:col-span-7">
                    <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

                    <div className="flex items-center gap-4 text-zinc-400 mb-6">
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                        <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                            {movie.vote_average.toFixed(1)} ⭐
                        </span>
                    </div>

                    <p className="text-lg leading-relaxed text-zinc-300 mb-8">
                        {movie.overview}
                    </p>
                </div>
            </div>
        </div>
    )
}