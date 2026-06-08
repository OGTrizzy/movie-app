const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdb = {
  baseUrl: BASE_URL,

  getImageUrl: (path: string, size: 'w500' | 'original' = 'w500') => 
    path ? `https://image.tmdb.org/t/p/${size}${path}` : '',

  fetch: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    return response.json();
  }
};