import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ['searchMovies', query],
    queryFn: () => tmdb.fetch(
      `/search/movie?query=${encodeURIComponent(query)}`
    ),
    enabled: query.trim().length > 2,
  })
}