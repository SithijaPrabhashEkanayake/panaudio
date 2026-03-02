/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: '#E8471C',
                    hover: '#D43E18',
                },
                bg: {
                    base: '#F7F7F5',
                    pure: '#FFFFFF',
                },
                border: {
                    soft: '#EBEBEB',
                },
                dark: {
                    base: '#131110',
                    surface: '#1E1A19',
                },
                text: {
                    primary: '#1C1A18',
                    secondary: '#6E6961',
                    muted: '#A8A09A',
                    'on-dark': '#F5F2F0',
                },
                success: '#2DB363',
            },
            fontFamily: {
                sora: ['Sora', 'sans-serif'],
                sans: ['DM Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                'xs': '8px',
                'sm': '12px',
                'md': '16px',
                'lg': '20px',
                'xl': '24px',
                '2xl': '28px',
                '3xl': '32px',
                'pill': '9999px',
            },
            boxShadow: {
                '1': '0 1px 4px rgba(0,0,0,0.04)',
                '2': '0 2px 12px rgba(0,0,0,0.06)',
                '3': '0 8px 32px rgba(0,0,0,0.08)',
                '4': '0 16px 48px rgba(0,0,0,0.12)',
                '5': '0 24px 80px rgba(0,0,0,0.18)',
                'accent': '0 0 24px rgba(232,71,28,0.25), 0 4px 16px rgba(232,71,28,0.15)',
                'accent-lg': '0 0 48px rgba(232,71,28,0.30)',
            }
        },
    },
    plugins: [],
}
