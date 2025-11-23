/**
 * Shared configuration and theming system for portable widgets
 *
 * This file provides default styling and theme configuration that can be
 * overridden by consumers to match their brand identity.
 */

/**
 * Theme configuration for widget colors and styling
 */
export interface WidgetTheme {
  /** Primary color for data visualization elements (charts, bubbles, etc.) */
  primary: string;
  /** Secondary colors for multi-color visualizations (e.g., treemap sections) */
  palette: string[];
  /** Background colors for various states */
  background: {
    base: string;
    hover: string;
    selected: string;
  };
  /** Text colors for different emphasis levels */
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  /** Border and divider colors */
  border: {
    base: string;
    light: string;
  };
  /** Status colors for transaction types or data states */
  status: {
    success: {
      bg: string;
      text: string;
    };
    warning: {
      bg: string;
      text: string;
    };
    info: {
      bg: string;
      text: string;
    };
  };
  /** Grid and axis colors for charts */
  chart: {
    axis: string;
    grid: string;
  };
}

/**
 * Dimension configuration for widget sizing
 */
export interface WidgetDimensions {
  /** Minimum width (CSS value, e.g., "700px") */
  minWidth?: string;
  /** Maximum width (CSS value, e.g., "900px") */
  maxWidth?: string;
  /** Height (CSS value or number) */
  height?: string | number;
  /** Font sizes for various text elements */
  fontSize?: {
    base?: number;
    small?: number;
    large?: number;
  };
}

/**
 * Default theme based on MERIDIAN/Argentine styling
 * This can be overridden by passing a custom theme to widgets
 */
export const DEFAULT_THEME: WidgetTheme = {
  primary: '#74ACDF', // Argentine blue
  palette: ['#74ACDF', '#5A8FB8', '#A8D5F2', '#8DC77B', '#F6B40E', '#F8C12D'],
  background: {
    base: '#FFFFFF',
    hover: '#F9FAFB',
    selected: '#F3F4F6',
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    muted: '#6B7280',
  },
  border: {
    base: '#D1D5DB',
    light: '#E5E7EB',
  },
  status: {
    success: {
      bg: '#D1FAE5',
      text: '#065F46',
    },
    warning: {
      bg: '#FEE2E2',
      text: '#991B1B',
    },
    info: {
      bg: '#DBEAFE',
      text: '#1E40AF',
    },
  },
  chart: {
    axis: '#6B7280',
    grid: '#E5E7EB',
  },
};

/**
 * Merges a partial theme with the default theme
 * Allows consumers to override only specific theme values
 *
 * @param customTheme - Partial theme configuration to override defaults
 * @returns Complete theme with custom values merged over defaults
 */
export function mergeTheme(customTheme?: Partial<WidgetTheme>): WidgetTheme {
  if (!customTheme) return DEFAULT_THEME;

  return {
    primary: customTheme.primary ?? DEFAULT_THEME.primary,
    palette: customTheme.palette ?? DEFAULT_THEME.palette,
    background: {
      ...DEFAULT_THEME.background,
      ...customTheme.background,
    },
    text: {
      ...DEFAULT_THEME.text,
      ...customTheme.text,
    },
    border: {
      ...DEFAULT_THEME.border,
      ...customTheme.border,
    },
    status: {
      success: {
        ...DEFAULT_THEME.status.success,
        ...customTheme.status?.success,
      },
      warning: {
        ...DEFAULT_THEME.status.warning,
        ...customTheme.status?.warning,
      },
      info: {
        ...DEFAULT_THEME.status.info,
        ...customTheme.status?.info,
      },
    },
    chart: {
      ...DEFAULT_THEME.chart,
      ...customTheme.chart,
    },
  };
}

/**
 * Merges custom dimensions with defaults
 *
 * @param customDimensions - Partial dimension configuration
 * @param defaults - Default dimensions specific to widget type
 * @returns Complete dimension configuration
 */
export function mergeDimensions<T extends WidgetDimensions>(
  customDimensions: Partial<T> | undefined,
  defaults: T
): T {
  if (!customDimensions) return defaults;

  return {
    ...defaults,
    ...customDimensions,
    fontSize: {
      ...defaults.fontSize,
      ...customDimensions.fontSize,
    },
  } as T;
}
