const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const getTmdbImage = (path: string, size: 'small' | 'medium' | 'original' = 'medium') => {
    if (!path) return '/placeholder.png'; 
    
    const sizes = {
        small: 'w342',
        medium: 'w780',
        original: 'original'
    };
    
    return `${IMAGE_BASE}/${sizes[size]}${path}`;
};