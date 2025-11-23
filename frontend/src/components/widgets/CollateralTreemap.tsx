"use client";

import { Treemap, ResponsiveContainer } from "recharts";
import { TreemapData } from './types';
import { WidgetTheme, WidgetDimensions, mergeTheme, mergeDimensions } from './config';

/**
 * Dimensions specific to treemap
 */
export interface TreemapDimensions extends WidgetDimensions {
  /** Minimum cell dimensions to show labels */
  minCellWidth?: number;
  minCellHeight?: number;
}

/**
 * Props for CollateralTreemap component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CollateralTreemap
 *   data={[
 *     { name: "Ethereum", value: 150000, size: 150000 },
 *     { name: "Bitcoin", value: 80000, size: 80000 },
 *     { name: "Polygon", value: 30000, size: 30000 }
 *   ]}
 * />
 *
 * // With custom colors
 * <CollateralTreemap
 *   data={data}
 *   theme={{
 *     palette: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DFE6E9"]
 *   }}
 * />
 *
 * // With custom formatter
 * <CollateralTreemap
 *   data={data}
 *   formatValue={(val) => `€${val.toFixed(2)}`}
 * />
 * ```
 */
export interface CollateralTreemapProps {
  /**
   * Array of data to visualize
   * Each item must have:
   * - name: Label to display
   * - size or value: Numeric value for sizing
   */
  data: TreemapData[];

  /**
   * Optional title to display above the treemap
   */
  title?: string;

  /**
   * Optional theme configuration to customize colors
   * Will be merged with default theme
   */
  theme?: Partial<WidgetTheme>;

  /**
   * Optional dimensions configuration
   * Will be merged with default dimensions
   */
  dimensions?: Partial<TreemapDimensions>;

  /**
   * Custom value formatter function
   * @param value - The numeric value to format
   * @returns Formatted string to display
   */
  formatValue?: (value?: number) => string;
}

interface TreemapRoot {
  children?: TreemapData[];
}

interface CustomContentProps {
  root?: TreemapRoot;
  depth?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  name?: string;
  value?: number;
  colors: string[];
  textColor: string;
  strokeColor: string;
  fontSize: { large: number; base: number };
  minCellWidth: number;
  minCellHeight: number;
  formatValue: (val?: number) => string;
}

const DEFAULT_DIMENSIONS: TreemapDimensions = {
  height: 400,
  minCellWidth: 80,
  minCellHeight: 50,
  fontSize: {
    base: 14,
    large: 16,
  },
};

const defaultFormatValue = (val?: number): string => {
  if (!val) return '';
  return `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const CustomizedContent = (props: CustomContentProps) => {
  const {
    root,
    depth = 0,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    index = 0,
    name,
    value,
    colors,
    textColor,
    strokeColor,
    fontSize,
    minCellWidth,
    minCellHeight,
    formatValue,
  } = props;

  if (!root?.children || !Array.isArray(root.children)) return null;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth < 2
              ? colors[Math.floor((index / root.children.length) * colors.length)]
              : "#ffffff00",
          stroke: strokeColor,
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && width > minCellWidth && height > minCellHeight ? (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 5}
            textAnchor="middle"
            fill={textColor}
            fontSize={fontSize.large}
            fontWeight="600"
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 15}
            textAnchor="middle"
            fill={textColor}
            fontSize={fontSize.base}
          >
            {formatValue(value)}
          </text>
        </>
      ) : null}
    </g>
  );
};

/**
 * CollateralTreemap - Visualizes hierarchical data as nested rectangles
 *
 * Displays data in a treemap format where the size of each rectangle
 * represents the relative value of that item.
 *
 * **Dependencies:**
 * - recharts (peer dependency)
 * - react
 *
 * **Standalone Usage:**
 * This component can be used outside Next.js. Just ensure recharts is installed:
 * ```bash
 * npm install recharts
 * ```
 */
export default function CollateralTreemap({
  data,
  title,
  theme: customTheme,
  dimensions: customDimensions,
  formatValue = defaultFormatValue,
}: CollateralTreemapProps) {
  const theme = mergeTheme(customTheme);
  const dimensions = mergeDimensions(customDimensions, DEFAULT_DIMENSIONS);

  const height = typeof dimensions.height === 'number' ? dimensions.height : parseInt(dimensions.height || '400');

  return (
    <div style={{ width: '100%' }}>
      {title && (
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: theme.text.primary,
          marginBottom: '16px',
        }}>
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
      <Treemap
        data={data}
        dataKey="size"
        stroke={theme.background.base}
        fill={theme.primary}
        content={
          <CustomizedContent
            colors={theme.palette}
            textColor={theme.background.base}
            strokeColor={theme.background.base}
            fontSize={{
              large: dimensions.fontSize?.large || 16,
              base: dimensions.fontSize?.base || 14,
            }}
            minCellWidth={dimensions.minCellWidth || 80}
            minCellHeight={dimensions.minCellHeight || 50}
            formatValue={formatValue}
          />
        }
      />
    </ResponsiveContainer>
    </div>
  );
}
