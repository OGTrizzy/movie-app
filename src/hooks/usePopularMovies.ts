import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'
import type { Movie } from '../types/movie'

interface PopularMoviesResponse {
    results: Movie[]
}

export function usePopularMovies() {
    return useQuery({
        queryKey: ['popularMovies'],
        queryFn: async (): Promise<PopularMoviesResponse> => {
            const response = await fetch(`${tmdb.baseUrl}/movie/popular?api_key=${tmdb.apiKey}`)
            if (!response.ok) throw new Error('Failed to fetch movies')
            return response.json()
        },
    })
}