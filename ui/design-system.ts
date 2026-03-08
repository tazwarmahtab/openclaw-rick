/**
 * World-Class UI/UX Design System for OpenClaw Rick Interface
 * 
 * Design Philosophy: Apple-grade minimalism with Rick's edgy personality
 * Accessibility: WCAG 2.1 AA compliant
 * Responsive: Mobile-first approach
 * Performance: Optimized for real-time interactions
 */

// Design Tokens - The Foundation
export const DesignTokens = {
  // Color Palette - Monochromatic with Rick's accent
  colors: {
    // Primary Monochromatic
    primary: {
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
      950: '#0a0a0a',
    },
    
    // Rick's Portal Green (Accent)
    accent: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Primary accent
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    // Status Colors
    status: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      neutral: '#6b7280',
    },
    
    // Rick's Personality Colors
    personality: {
      portal: '#22c55e', // Portal green
      flask: '#8b5cf6', // Flask purple
      danger: '#ef4444', // Rick's danger
      cosmic: '#0ea5e9', // Space blue
    },
  },
  
  // Typography - Clean & Technical
  typography: {
    fontFamily: {
      sans: ['Inter', 'SF Pro Display', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  // Spacing - 8px Grid System
  spacing: {
    0: '0px',
    1: '0.25rem', // 4px
    2: '0.5rem',  // 8px
    3: '0.75rem', // 12px
    4: '1rem',    // 16px
    5: '1.25rem', // 20px
    6: '1.5rem',  // 24px
    8: '2rem',    // 32px
    10: '2.5rem', // 40px
    12: '3rem',   // 48px
    16: '4rem',   // 64px
    20: '5rem',   // 80px
    24: '6rem',   // 96px
  },
  
  // Border Radius - Subtle & Modern
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    base: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px
    '2xl': '1rem',  // 16px
    full: '9999px',
  },
  
  // Shadows - Layered & Subtle
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  
  // Transitions - Smooth & Responsive
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Z-Index - Layer Management
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

// Component Design Specifications
export const ComponentSpecs = {
  // Button Component
  button: {
    variants: {
      primary: {
        backgroundColor: DesignTokens.colors.accent[500],
        color: DesignTokens.colors.primary[50],
        '&:hover': {
          backgroundColor: DesignTokens.colors.accent[600],
        },
        '&:focus': {
          outline: `2px solid ${DesignTokens.colors.accent[500]}`,
          outlineOffset: '2px',
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: DesignTokens.colors.primary[700],
        border: `1px solid ${DesignTokens.colors.primary[300]}`,
        '&:hover': {
          backgroundColor: DesignTokens.colors.primary[50],
        },
      },
      danger: {
        backgroundColor: DesignTokens.colors.status.error,
        color: DesignTokens.colors.primary[50],
        '&:hover': {
          backgroundColor: '#dc2626',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: DesignTokens.colors.primary[600],
        '&:hover': {
          backgroundColor: DesignTokens.colors.primary[100],
        },
      },
    },
    sizes: {
      sm: {
        padding: `${DesignTokens.spacing[2]} ${DesignTokens.spacing[3]}`,
        fontSize: DesignTokens.typography.fontSize.sm[0],
        borderRadius: DesignTokens.borderRadius.sm,
      },
      md: {
        padding: `${DesignTokens.spacing[5]} ${DesignTokens.spacing[4]}`,
        fontSize: DesignTokens.typography.fontSize.base[0],
        borderRadius: DesignTokens.borderRadius.base,
      },
      lg: {
        padding: `${DesignTokens.spacing[3]} ${DesignTokens.spacing[6]}`,
        fontSize: DesignTokens.typography.fontSize.lg[0],
        borderRadius: DesignTokens.borderRadius.md,
      },
    },
  },
  
  // Input Component
  input: {
    base: {
      backgroundColor: DesignTokens.colors.primary[50],
      border: `1px solid ${DesignTokens.colors.primary[300]}`,
      borderRadius: DesignTokens.borderRadius.base,
      fontSize: DesignTokens.typography.fontSize.base[0],
      padding: `${DesignTokens.spacing[5]} ${DesignTokens.spacing[3]}`,
      '&:focus': {
        outline: 'none',
        borderColor: DesignTokens.colors.accent[500],
        boxShadow: `0 0 0 3px ${DesignTokens.colors.accent[100]}`,
      },
      '&:disabled': {
        backgroundColor: DesignTokens.colors.primary[100],
        color: DesignTokens.colors.primary[400],
        cursor: 'not-allowed',
      },
    },
  },
  
  // Card Component
  card: {
    base: {
      backgroundColor: DesignTokens.colors.primary[50],
      border: `1px solid ${DesignTokens.colors.primary[200]}`,
      borderRadius: DesignTokens.borderRadius.lg,
      boxShadow: DesignTokens.shadows.base,
      padding: DesignTokens.spacing[6],
    },
    elevated: {
      boxShadow: DesignTokens.shadows.lg,
    },
  },
  
  // Status Badge Component
  badge: {
    variants: {
      success: {
        backgroundColor: DesignTokens.colors.status.success,
        color: DesignTokens.colors.primary[50],
      },
      warning: {
        backgroundColor: DesignTokens.colors.status.warning,
        color: DesignTokens.colors.primary[900],
      },
      error: {
        backgroundColor: DesignTokens.colors.status.error,
        color: DesignTokens.colors.primary[50],
      },
      info: {
        backgroundColor: DesignTokens.colors.status.info,
        color: DesignTokens.colors.primary[50],
      },
    },
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${DesignTokens.spacing[1]} ${DesignTokens.spacing[2]}`,
      borderRadius: DesignTokens.borderRadius.full,
      fontSize: DesignTokens.typography.fontSize.xs[0],
      fontWeight: DesignTokens.typography.fontWeight.medium,
    },
  },
};

// Accessibility Guidelines
export const AccessibilityGuidelines = {
  // Color Contrast Requirements
  contrastRatios: {
    AA: 4.5, // Normal text
    AA_large: 3.0, // Large text (18pt+ or 14pt+ bold)
    AAA: 7.0, // Enhanced contrast
    AAA_large: 4.5, // Enhanced contrast for large text
  },
  
  // Focus Indicators
  focus: {
    outline: `2px solid ${DesignTokens.colors.accent[500]}`,
    outlineOffset: '2px',
    borderRadius: DesignTokens.borderRadius.base,
  },
  
  // Screen Reader Support
  screenReader: {
    skipLink: {
      position: 'absolute',
      top: '-40px',
      left: '6px',
      backgroundColor: DesignTokens.colors.primary[900],
      color: DesignTokens.colors.primary[50],
      padding: '8px',
      textDecoration: 'none',
      borderRadius: DesignTokens.borderRadius.base,
      '&:focus': {
        top: '6px',
      },
    },
  },
  
  // Motion Preferences
  motion: {
    reducedMotion: {
      '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
        transition: 'none',
      },
    },
  },
};

// Responsive Breakpoints
export const Breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Animation Keyframes
export const Animations = {
  // Rick's Portal Effect
  portal: {
    keyframes: `
      @keyframes portal {
        0% { transform: scale(0.8) rotate(0deg); opacity: 0; }
        50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
        100% { transform: scale(1) rotate(360deg); opacity: 1; }
      }
    `,
    animation: 'portal 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Smooth Fade In
  fadeIn: {
    keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    animation: 'fadeIn 0.3s ease-out',
  },
  
  // Pulse for Status Indicators
  pulse: {
    keyframes: `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
};

// Export Design System
export const DesignSystem = {
  tokens: DesignTokens,
  components: ComponentSpecs,
  accessibility: AccessibilityGuidelines,
  breakpoints: Breakpoints,
  animations: Animations,
  
  // Utility Functions
  utils: {
    // Generate responsive styles
    responsive: (styles: Record<string, any>) => {
      return Object.entries(styles).reduce((acc, [breakpoint, style]) => {
        if (breakpoint === 'base') {
          return { ...acc, ...style };
        }
        return {
          ...acc,
          [`@media (min-width: ${Breakpoints[breakpoint as keyof typeof Breakpoints]})`]: style,
        };
      }, {});
    },
    
    // Generate focus styles
    focusStyles: (customStyles?: Record<string, any>) => ({
      '&:focus': {
        ...AccessibilityGuidelines.focus,
        ...customStyles,
      },
    }),
    
    // Generate transition styles
    transition: (properties: string[], duration = DesignTokens.transitions.base) => ({
      transition: `${properties.join(', ')} ${duration}`,
    }),
  },
};

export default DesignSystem;
