const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdb = {
    baseUrl: BASE_URL,
    apiKey: API_KEY,

    //HELPER FUNCTION
    getImageUrl: (path: string, size: 'w500' | 'original' = 'w500') => {
        if (!path) return '';
        return `https://image.tmdb.org/t/p/${size}${path}`;
    },
};