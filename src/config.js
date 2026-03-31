/**
 * API Configuration
 * Automatically uses the correct API URL based on environment
 */
const getApiUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    if (import.meta.env.DEV) {
        return 'http://localhost:5000';
    }
    return '';
};

export const API_URL = getApiUrl();

// Log API URL in development for debugging
if (import.meta.env.DEV) {
    console.log('🔗 API URL:', API_URL);
}
