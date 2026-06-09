import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'
import type { Movie } from '../types/movie'
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton'

export default function TopRated() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['topRatedMovies'],
        queryFn: () => tmdb.fetch('/movie/top_rated'),
    })

    if (isLoading) {
        return (
            <div>
                <div className="mb-10">
                    <h2 className="text-4xl font-bold mb-2">Top Rated Movies</h2>
                    <p className="text-zinc-400">The most popular movies of all time</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {[...Array(12)].map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }
    if (error) return <div className="text-center text-red-500 py-20">Failed to load top rated movies</div>

    return (
        <div>
            <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2">Top Rated Movies</h2>
                <p className="text-zinc-400">The most popular movies of all time</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {data?.results?.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}