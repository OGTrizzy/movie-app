import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'

export function usePopularMovies() {
    return useQuery({
        queryKey: ['popularMovies'],
        queryFn: async () => {
            const response = await fetch(`${tmdb.baseUrl}/movie/popular?api_key=${tmdb.apiKey}`)
            return response.json()
        },
    })
}