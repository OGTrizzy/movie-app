import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['searchMovies', query],
    queryFn: async () => {
      const [movies, tv] = await Promise.all([
        tmdb.fetch(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`),
        tmdb.fetchTV(`/search/tv?query=${encodeURIComponent(query)}&language=en-US`)
      ])

      return {
        movies: movies.results || [],
        tvShows: tv.results || []
      }
    },
    enabled: query.trim().length > 2,
  })
}