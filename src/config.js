/**
 * API Configuration
 * Automatically uses the correct API URL based on environment
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Log API URL in development for debugging
if (import.meta.env.MODE === 'development') {
    console.log('🔗 API URL:', API_URL);
}
