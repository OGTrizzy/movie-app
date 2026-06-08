import { usePopularMovies } from '../hooks/usePopularMovies'
import { useSearchMovies } from '../hooks/useSearchMovies'
import { MovieCard } from '../components/MovieCard'
import type { Movie } from '../types/movie'
import { useSearchParams } from 'react-router-dom'
import MovieCardSkeleton from '../components/MovieCardSkeleton'

export default function Home() {
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''

    const popularQuery = usePopularMovies()
    const searchQueryResult = useSearchMovies(searchQuery)

    const isSearching = searchQuery.length > 2
    const { data, isLoading, error } = isSearching ? searchQueryResult : popularQuery

    const title = isSearching ? `Search results for "${searchQuery}"` : 'Popular Movies'

    if (isLoading) {
        return (
            <div>
                <div className="flex justify-center items-center h-96">
                    <p className="text-xl">Loading...</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
                    {[...Array(12)].map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-20">
                <p>Something went wrong with loading movies</p>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2">{title}</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {data?.results?.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {isSearching && data?.results?.length === 0 && (
                <p className="text-center text-zinc-400 text-xl mt-20">
                    No results found for "{searchQuery}"
                </p>
            )}
        </div>
    )
}