import { useParams, useNavigate } from 'react-router-dom'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { tmdb } from '../lib/tmdb'
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react'

export default function MovieDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const movieId = Number(id)

    const { data: movie, isLoading, error } = useMovieDetails(movieId)

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto py-10">
                <div className="flex items-center gap-2 mb-8 text-zinc-400">
                    <div className="w-5 h-5 bg-zinc-800 rounded animate-pulse" />
                    Back
                </div>

                <div className="grid md:grid-cols-12 gap-10">
                    <div className="md:col-span-5">
                        <div className="w-full aspect-[2/3] bg-zinc-800 rounded-2x1 animate-pulse" /> 
                    </div>
                    <div className="md:col-span-7 space-y-6">
                        <div className="h-12 bg-zinc-800 rounded w-3/4 animate-pulse" />
                        <div className="flex gap-4">
                            <div className="h-6 bg-zinc-800 rounded w-24 animate-pulse" />
                            <div className="h-6 bg-zinc-800 rounded w-32 animate-pulse" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-5 bg-zinc-800 rounded animate-pulse" />
                            <div className="h-5 bg-zinc-800 rounded animate-pulse" />
                            <div className="h-5 bg-zinc-800 rounded w-5/6 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !movie) {
        return <div className="text-center text-red-500 py-20">Something went wrong!</div>
    }

    const cast = movie.credits?.cast?.slice(0, 8) || [] //top 8 actors

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

                    {movie.tagline && (
                        <p className="text-xl text-zinc-400 italic mb-6">{movie.tagline}</p>
                    )}

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400 mb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            {new Date(movie.release_date).getFullYear()}
                        </div>
                        {movie.runtime && (
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                {movie.runtime} min
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Star size={18} className="text-yellow-400"/>
                            {movie.vote_average.toFixed(1)} ({movie.vote_count?.toLocaleString()} Votes)
                        </div>
                    </div>

                    {/*genres */}
                    {movie.genres && movie.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {movie.genres.map((genre: {id: number, name: string}) => (
                                <span
                                    key={genre.id}
                                    className="bg-zinc-800 hover:bg-zinc-700 px-4 py-1.5 rounded-full text-sm transition-colors"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/*overview */}
                    <p className="text-lg leading-relaxed text-zinc-300 mb-8">
                        {movie.overview || "no description available"}
                    </p>

                    {/*cast */}
                    {cast.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Cast</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {cast.map((actor: {id: number; name: string; character: string; profile_path: string | null}) => (
                                    <div key={actor.id} className="text-center">
                                        <div className="mx-auto mb-3 w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-700">
                                            <img
                                                src={tmdb.getImageUrl(actor.profile_path || '', 'w500')}
                                                alt={actor.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1604151364473-02e3e26124a6?q=80&w=1529&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                                }}
                                            />
                                        </div>
                                        <p className="font-medium text-sm">{actor.name}</p>
                                        <p className="text-xs text-zinc-500 line-clamp-2">{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}