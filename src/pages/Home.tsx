import { usePopularMovies } from '../hooks/usePopularMovies'
import { useSearch } from '../hooks/useSearch'
import MovieCard from '../components/MovieCard'
import type { Movie } from '../types/movie'
import { useSearchParams } from 'react-router-dom'
import MovieCardSkeleton from '../components/MovieCardSkeleton'

export default function Home() {
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''

    const popularQuery = usePopularMovies()
    const searchResult = useSearch(searchQuery)

    const isSearching = searchQuery.length > 2

    const isLoading = isSearching ? searchResult.isLoading : popularQuery.isLoading
    const error = isSearching ? searchResult.error : popularQuery.error


    const title  = isSearching ? `search result for "${searchQuery}"` : "Popular Movies"
    

    if (isLoading) {
        return (
            <div>
                <div className="mb-10">
                    <h2 className="text-4xl font-bold mb-2">{title}</h2>
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
                <p>Something went wrong</p>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2">{title}</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {isSearching
                ? (
                    <>
                        {/**movies search */}
                        {searchResult.data?.movies?.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} mediaType="movie" />
                        ))}
                        {/**shows search */}
                        {searchResult.data?.tvShows?.map((show: {
                            id: number;
                            name: string;
                            poster_path: string | null;
                            overview?: string;
                            first_air_date?: string;
                            vote_average: number
                        }) => (
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
                    </>
                ) : ( 
                    /**popular movies */
                    popularQuery.data?.results?.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} mediaType="movie" />
            ))
        )}
            </div>

            {isSearching && 
            searchResult.data && 
            searchResult.data.movies.length === 0 && 
            searchResult.data.tvShows.length === 0 && (
                <p className="text-center text-zinc-400 text-xl mt-20">
                    No results found for "{searchQuery}"
                </p>
            )}
        </div>
    )
}