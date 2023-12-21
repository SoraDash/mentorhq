
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        navbar: '#111827',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    nextui({
      themes: {
        dark: {
          extend: 'dark', // <- inherit default values from dark theme
          colors: {
            background: '#101010',
            foreground: '#ffffff',
            primary: {
              '50': '#fdf2f7',
              '100': '#fce7f1',
              '200': '#fccee3',
              '300': '#fba6cb',
              '400': '#f76fa8',
              '500': '#ee327b',
              '600': '#df2363',
              '700': '#c2144a',
              '800': '#a0143d',
              '900': '#851637',
              DEFAULT: '#ee327b',
              
            },

            secondary: {
              '50': '#fef4f2',
              '100': '#fee8e2',
              '200': '#ffd4c9',
              '300': '#fdb6a4',
              '400': '#fa8b6f',
              '500': '#f37657',
              '600': '#df4823',
              '700': '#bb3a1a',
              '800': '#9b3319',
              '900': '#80301c',
              DEFAULT: '#f37657',
              
            },

            success: {
              '50': '#ecfdf7',
              '100': '#d1faeb',
              '200': '#a7f3d7',
              '300': '#6ee7bb',
              '400': '#34d399',
              '500': '#10b97b',
              '600': '#059661',
              '700': '#04784e',
              '800': '#065f3f',
              '900': '#064e34',
              DEFAULT: '#34d399',
            },
            warning: {
              '50': '#fffbeb',
              '100': '#fef3c7',
              '200': '#fde58a',
              '300': '#fcd24d',
              '400': '#fbbd23',
              '500': '#f59c0b',
              '600': '#d97506',
              '700': '#b45209',
              '800': '#923f0e',
              '900': '#78340f',
              DEFAULT: '#fbbd23',
            },
            danger: {
              '50': '#fff1f3',
              '100': '#ffe4e9',
              '200': '#fecdd5',
              '300': '#fda4b3',
              '400': '#fb7189',
              '500': '#f43f5e',
              '600': '#e11d3f',
              '700': '#be122f',
              '800': '#9f122a',
              '900': '#881327',
              DEFAULT: '#f43f5e',
              
            },
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
        light: {
          extend: 'light', // <- inherit default values from dark theme
          colors: {
            background: '#fff',
            foreground: '#101010',
            primary: {
              '50': '#fdf2f5',
              '100': '#fde8ef',
              '200': '#fdcddd',
              '300': '#fca5bf',
              '400': '#f96d95',
              '500': '#f3416f',
              '600': '#e22048',
              '700': '#c51131',
              '800': '#a2122a',
              '900': '#871427',
              DEFAULT: '#fde8ef',
              foreground: '#101010',
            },
            secondary: {
              '50': '#fef4f2',
              '100': '#fee8e2',
              '200': '#ffd4c9',
              '300': '#fdb6a4',
              '400': '#fa8b6f',
              '500': '#f37657',
              '600': '#df4823',
              '700': '#bb3a1a',
              '800': '#9b3319',
              '900': '#80301c',
              DEFAULT: '#f37657',
              
            },
            success: {
              '50': '#ecfdf5',
              '100': '#d1fae5',
              '200': '#a7f3d0',
              '300': '#6ee7b6',
              '400': '#36d399',
              '500': '#10b980',
              '600': '#059668',
              '700': '#047856',
              '800': '#065f46',
              '900': '#064e3b',
              DEFAULT: '#36d399',
            },
            warning: {
              '50': '#fffbeb',
              '100': '#fef3c7',
              '200': '#fde58a',
              '300': '#fcd24d',
              '400': '#fbbd23',
              '500': '#f59c0b',
              '600': '#d97506',
              '700': '#b45209',
              '800': '#923f0e',
              '900': '#78340f',
              DEFAULT: '#fbbd23',
            },
            danger: {
              '50': '#fef2f2',
              '100': '#fee2e2',
              '200': '#fecaca',
              '300': '#fca5a5',
              '400': '#f87272',
              '500': '#ef4444',
              '600': '#dc2626',
              '700': '#b91c1c',
              '800': '#991b1b',
              '900': '#7f1d1d',
              DEFAULT: '#f87272',
              
            },
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
      },
    }),
  ],
};
