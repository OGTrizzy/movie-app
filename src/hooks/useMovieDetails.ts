import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => tmdb.fetch(`/movie/${movieId}?language=en-US&append_to_response=credits`),
    enabled: !!movieId,
  })
}