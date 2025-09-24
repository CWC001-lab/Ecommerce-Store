// App Color System - Uniform colors for light and dark modes
export const appColors = {
  // Primary colors - using slate for a modern, professional look
  primary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Accent colors - using emerald for a fresh, modern accent
  accent: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Status colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },
  
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
  
  // Background colors
  background: {
    light: '#ffffff',
    dark: '#0f172a',
  },
  
  // Text colors
  text: {
    light: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#64748b',
    },
    dark: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      muted: '#94a3b8',
    },
  },
  
  // Border colors
  border: {
    light: '#e2e8f0',
    dark: '#334155',
  },
} as const;

// CSS Custom Properties for dynamic theming
export const lightTheme = {
  '--color-primary': appColors.primary[600],
  '--color-primary-hover': appColors.primary[700],
  '--color-primary-light': appColors.primary[50],
  '--color-accent': appColors.accent[500],
  '--color-accent-hover': appColors.accent[600],
  '--color-accent-light': appColors.accent[50],
  '--color-background': appColors.background.light,
  '--color-background-secondary': appColors.neutral[50],
  '--color-text-primary': appColors.text.light.primary,
  '--color-text-secondary': appColors.text.light.secondary,
  '--color-text-muted': appColors.text.light.muted,
  '--color-border': appColors.border.light,
  '--color-success': appColors.success[500],
  '--color-warning': appColors.warning[500],
  '--color-error': appColors.error[500],
} as const;

export const darkTheme = {
  '--color-primary': appColors.primary[400],
  '--color-primary-hover': appColors.primary[300],
  '--color-primary-light': appColors.primary[900],
  '--color-accent': appColors.accent[400],
  '--color-accent-hover': appColors.accent[300],
  '--color-accent-light': appColors.accent[900],
  '--color-background': appColors.background.dark,
  '--color-background-secondary': appColors.primary[800],
  '--color-text-primary': appColors.text.dark.primary,
  '--color-text-secondary': appColors.text.dark.secondary,
  '--color-text-muted': appColors.text.dark.muted,
  '--color-border': appColors.border.dark,
  '--color-success': appColors.success[500],
  '--color-warning': appColors.warning[500],
  '--color-error': appColors.error[500],
} as const;

// Tailwind color classes mapping
export const colorClasses = {
  primary: 'bg-slate-600 hover:bg-slate-700 text-white',
  primaryLight: 'bg-slate-50 text-slate-600',
  accent: 'bg-emerald-500 hover:bg-emerald-600 text-white',
  accentLight: 'bg-emerald-50 text-emerald-600',
  background: 'bg-white dark:bg-slate-900',
  backgroundSecondary: 'bg-slate-50 dark:bg-slate-800',
  textPrimary: 'text-slate-900 dark:text-slate-100',
  textSecondary: 'text-slate-600 dark:text-slate-300',
  textMuted: 'text-slate-500 dark:text-slate-400',
  border: 'border-slate-200 dark:border-slate-700',
  success: 'bg-emerald-500 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-500 text-white',
} as const;
