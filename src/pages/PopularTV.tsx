import { useQuery } from '@tanstack/react-query'
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import { tmdb } from '../lib/tmdb'

interface TVShow {
    id: number
    name: string
    poster_path: string | null
    overview: string
    first_air_date: string
    vote_average: number
}

export default function PopularTV() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['popularTV'],
        queryFn: () => tmdb.fetchTV('/tv/popular'),
    })

    if (isLoading) {
        return (
        <div>
            <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2">Popular TV-Shows</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {[...Array(12)].map((_, i) => <MovieCardSkeleton key={i} />)}
            </div>
        </div>
        )
    }

    if (error) {
        return <div className="text-center text-red-500 py-20">Loading series failed</div>
    }

    return (
        <div>
            <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2">Popular Shows</h2>
                <p className="text-zinc-400">Right now</p>
            </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {data?.results?.map((show: TVShow) => (
            <MovieCard 
                key={show.id} 
                movie={{
                id: show.id,
                title: show.name,
                poster_path: show.poster_path,
                overview: show.overview || '',
                release_date: show.first_air_date || '',
                vote_average: show.vote_average,
            }} 
                mediaType="tv"
                />
            ))}
            </div>
        </div>
    )
}