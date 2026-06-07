import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'
import type { Movie } from '../types/movie'

interface SearchResponse {
    results: Movie[]
}

export function useSearchMovies(query: string) {
    return useQuery({
        queryKey: ['searchMovies', query],
        queryFn: async (): Promise<SearchResponse> => {
            if (!query.trim()) throw new Error('No search query')

            const response = await fetch(
                `${tmdb.baseUrl}/search/movie?api_key=${tmdb.apiKey}&query=${encodeURIComponent(query)}`
            )
            if (!response.ok) throw new Error('Failed to search movies')
                return response.json()
        },
        enabled: query.trim().length > 2, // only search when query is minimum 2 character
    })
}