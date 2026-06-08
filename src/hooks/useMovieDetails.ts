import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => tmdb.fetch(`/movie/${movieId}`),
    enabled: !!movieId,
  })
}