import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'
import { ArrowLeft } from 'lucide-react'

export default function TVDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const tvId = Number(id)

    const { data: show, isLoading, error} = useQuery({
        queryKey: ['tv', tvId],
        queryFn: () => tmdb.fetchTV(`/tv/${tvId}`),
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

    if (error || !show) {
        return <div className="text-center text-red-500 py-20">Could not find the TV-show</div>
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
                {/*poster */}
                <div className="md:col-span-5">
                    <img
                        src={tmdb.getImageUrl(show.poster_path || '', 'original')}
                        alt={show.name}
                        className="w-full rounded-2xl shadow-2xl"
                    />
                </div>

                {/*info */}
                <div className="md:col-span-7">
                    <h1 className="text-5xl font-bold mb-4">{show.name}</h1>

                    <div className="flex items-center gap-4 text-zinc-400 mb-6">
                        <span>
                            {new Date(show.first_air_date).getFullYear()}
                        </span>
                        <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                            {show.vote_average.toFixed(1)} ⭐
                        </span>
                        <span className="text-sm">📺 TV Show</span>
                    </div>

                    <p className="text-lg leading-relaxed text-zinc-300 mb-8">
                        {show.overview || "No description available"}
                    </p>
                </div>
            </div>
        </div>
    )
}