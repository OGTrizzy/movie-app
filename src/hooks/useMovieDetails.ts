import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'
import type { Movie } from '../types/movie'

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: async (): Promise<Movie> => {
      const response = await fetch(
        `${tmdb.baseUrl}/movie/${movieId}?api_key=${tmdb.apiKey}`
      )
      if (!response.ok) throw new Error('Failed to fetch movie')
      return response.json()
    },
    enabled: !!movieId,
  })
}