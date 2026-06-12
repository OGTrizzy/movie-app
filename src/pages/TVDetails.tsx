import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react'

export default function TVDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const tvId = Number(id)

    const { data: show, isLoading, error} = useQuery({
        queryKey: ['tv', tvId],
        queryFn: () => tmdb.fetchTV(`/tv/${tvId}?language=en-US&append_to_response=credits`),
        enabled: !!tvId,
    })

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
                </div>
            </div>
        )
    }

    if (error || !show) {
        return <div className="text-center text-red-500 py-20">Could not find the TV-show</div>
    }

    const cast = show.credits?.cast?.slice(0, 8) || []

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-8 text-zinc-400 hover:text-white transition-colors"
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div className="grid md:grid-cols-12 gap-10">
                {/*poster */}
                <div className="md:col-span-5">
                    <img
                        src={tmdb.getImageUrl(show.poster_path || '', 'original')}
                        alt={show.name}
                        className="w-full rounded-3xl shadow-2xl"
                    />
                </div>

                {/*info */}
                <div className="md:col-span-7">
                    <h1 className="text-5xl font-bold mb-3">{show.name}</h1>

                    {show.tagline && (
                        <p className="text-xl text-zinc-400 italic mb-6">{show.tagline}</p>
                    )}

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400 mb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            {new Date(show.first_air_date).getFullYear()}
                        </div>
                        {show.episode_run_time && show.episode_run_time.length > 0 && (
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                {show.episode_run_time[0]} min per episode
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Star size={18} className="text-yellow-400" />
                            {show.vote_average.toFixed(1)} ({show.vote_count?.toLocaleString()} votes)
                        </div>
                    </div>

                    {/*genres */}
                    {show.genres && show.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {show.genres.map((genre: { id: number; name: string }) => (
                                <span
                                    key={genre.id}
                                    className="bg-zinc-800 px-4 py-1.5 rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/**overview */}
                    <p className="text-lg leading-relaxed text-zinc-300 mb-10">
                        {show.overview || "no description available"}
                    </p>

                    {/**cast */}
                    {cast.length > 0 && (
                        <div>
                            <h3 className="text-2x1 font-semibold mb-6">Cast</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {cast.map((actor: {id: number; name: string; character: string; profile_path: string | null}) => (
                                    <div key={actor.id} className="text-center">
                                        <div className="mx-auto mb-3 w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-700">
                                            <img
                                                src={tmdb.getImageUrl(actor.profile_path || '', 'w500')}
                                                alt={actor.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1604151364473-02e3e26124a6?q=80&w=1529&auto=format&fit=crop'
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