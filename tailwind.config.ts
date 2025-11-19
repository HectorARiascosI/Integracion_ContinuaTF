import type { Config } from 'tailwindcss'

// Extendemos la paleta con colores más vivos para niños y mantenemos dark mode por clase
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF8F1',
          100: '#FFEED8',
          300: '#FFD59A',
          500: '#FFB54D',
          700: '#E6942A'
        },
        kid: {
          red: '#FF6B6B',
          orange: '#FF9F1C',
          yellow: '#FFD166',
          green: '#6BE4A5',
          blue: '#6CCFF6',
          purple: '#B892FF'
        }
      },
      borderRadius: {
        'xl-2': '1rem',
        'xxl': '1.75rem'
      }
    }
  }
} satisfies Config



