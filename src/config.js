// In production (Vercel), use relative paths so API calls go to same domain
// In development, use localhost:5000 or VITE_API_URL if set
export const API_URL = import.meta.env.PROD 
  ? '' // Empty string = relative URLs in production
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000');
