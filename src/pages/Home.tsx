import { usePopularMovies } from '../hooks/usePopularMovies'
import { MovieCard } from '../components/MovieCard'
import type { Movie } from '../types/movie'

export default function Home() {
    const { data, isLoading, error } = usePopularMovies()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-xl">Loading...</p>
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
                <h2 className="text-4xl font-bold mb-2">Popular Movies</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {data?.results?.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}