import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'
import { MovieCard } from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton'

interface TVShow {
    id: number
    name: string
    first_air_date: string
    poster_path: string | null
    vote_average: number
    overview: string
}

export default function PopularTV() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['popularTV'],
        queryFn: () => tmdb.fetch('/tv/popular'),
    })

    if (isLoading) {
        return (
            <div>
                <div className="mb-10">
                    <h2 className="text-4xl font-bold mb-2">Popular TV Shows</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {[...Array(12)].map((_, i) => <MovieCardSkeleton key={i} />)}
                </div>
            </div>
        )
    }

    if (error) {
        return <div className="text-center text-red-500 py-20">Failed to load popular TV shows</div>
    }

    return (
        <div>
            <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2">Popular TV Shows</h2>
                <p className="text-zinc-400">Discover the most popular TV shows right now.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {data?.results?.map((show: TVShow) => (
                    <MovieCard
                        key={show.id}
                        movie={{
                            id: show.id,
                            title: show.name,
                            poster_path: show.poster_path,
                            overview: show.overview,
                            release_date: show.first_air_date,
                            vote_average: show.vote_average,
                            vote_count: 0 //dummy value since TV shows don't have vote_count in this context
                        }}
                    />

                ))}
            </div>
        </div>
    )
}