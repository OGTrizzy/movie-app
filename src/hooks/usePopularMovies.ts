import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../lib/tmdb'
import type { Movie } from '../types/movie'

export function usePopularMovies() {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: async () => {
      const data = await tmdb.fetch('/movie/popular')
      return data as { results: Movie[] }
    },
  })
}