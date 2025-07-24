// Couleurs de base pour le thème clair
export const lightTheme = {
  primary: {
    DEFAULT: 'hsl(24, 95%, 64%)', // Orange vif
    foreground: 'hsl(0, 0%, 98%)',
  },
  secondary: {
    DEFAULT: 'hsl(160, 84%, 39%)', // Vert menthe
    foreground: 'hsl(0, 0%, 98%)',
  },
  accent: {
    DEFAULT: 'hsl(262, 83%, 76%)', // Lavande
    foreground: 'hsl(0, 0%, 98%)',
  },
  muted: {
    DEFAULT: 'hsl(0, 0%, 96.1%)',
    foreground: 'hsl(240, 3.7%, 15.9%)',
  },
  card: {
    DEFAULT: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(240, 10%, 3.9%)',
  },
  popover: {
    DEFAULT: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(240, 10%, 3.9%)',
  },
  border: 'hsl(240, 5.9%, 90%)',
  input: 'hsl(240, 5.9%, 90%)',
  ring: 'hsl(24, 95%, 64%)',
  background: 'hsl(0, 0%, 98%)',
  foreground: 'hsl(240, 10%, 3.9%)',
}

// Couleurs pour le thème sombre
export const darkTheme = {
  primary: {
    DEFAULT: 'hsl(24, 95%, 64%)', // Orange vif
    foreground: 'hsl(0, 0%, 98%)',
  },
  secondary: {
    DEFAULT: 'hsl(160, 84%, 39%)', // Vert menthe
    foreground: 'hsl(0, 0%, 98%)',
  },
  accent: {
    DEFAULT: 'hsl(262, 83%, 76%)', // Lavande
    foreground: 'hsl(0, 0%, 98%)',
  },
  muted: {
    DEFAULT: 'hsl(240, 3.7%, 15.9%)',
    foreground: 'hsl(0, 0%, 95%)',
  },
  card: {
    DEFAULT: 'hsl(240, 10%, 5%)',
    foreground: 'hsl(0, 0%, 98%)',
  },
  popover: {
    DEFAULT: 'hsl(240, 10%, 5%)',
    foreground: 'hsl(0, 0%, 98%)',
  },
  border: 'hsl(240, 3.7%, 15.9%)',
  input: 'hsl(240, 3.7%, 15.9%)',
  ring: 'hsl(24, 95%, 64%)',
  background: 'hsl(240, 10%, 3.9%)',
  foreground: 'hsl(0, 0%, 98%)',
}

// Tailles d'écran (breakpoints)
export const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// Espacements
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
}

// Rayons de bordure
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
}

// Configuration des animations
export const animation = {
  'spin': 'spin 1s linear infinite',
  'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'bounce': 'bounce 1s infinite',
  'fade-in': 'fadeIn 0.3s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'slide-down': 'slideDown 0.3s ease-out',
  'slide-left': 'slideLeft 0.3s ease-out',
  'slide-right': 'slideRight 0.3s ease-out',
}

// Configuration des durées de transition
export const transitionDuration = {
  '75': '75ms',
  '100': '100ms',
  '150': '150ms',
  '200': '200ms',
  '300': '300ms',
  '500': '500ms',
  '700': '700ms',
  '1000': '1000ms',
}

// Configuration des courbes de transition
export const transitionTimingFunction = {
  'linear': 'linear',
  'in': 'cubic-bezier(0.4, 0, 1, 1)',
  'out': 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'ease-in-out': 'ease-in-out',
}

// Configuration des ombres
export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
}

// Configuration des z-index
export const zIndex = {
  auto: 'auto',
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50',
  '60': '60',
  '70': '70',
  '80': '80',
  '90': '90',
  '100': '100',
  '1000': '1000',
  '9999': '9999',
}
