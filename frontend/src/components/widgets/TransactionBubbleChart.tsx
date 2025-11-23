"use client";

import { Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis, TooltipContentProps } from 'recharts';
import { ReactNode } from 'react';
import { BubbleChartTransaction } from './types';
import { WidgetTheme, WidgetDimensions, mergeTheme, mergeDimensions } from './config';

/**
 * Dimensions specific to bubble chart
 */
export interface BubbleChartDimensions extends WidgetDimensions {
  /** Row height for each day */
  rowHeight?: string | number;
  /** Bubble size range [min, max] in pixels */
  bubbleRange?: readonly [number, number];
}

/**
 * Props for TransactionBubbleChart component
 *
 * @example
 * ```tsx
 * // Basic usage with minimal data
 * <TransactionBubbleChart
 *   transactions={[
 *     { timestamp: "1704067200", hash: "0x123...", type: "swap" },
 *     { timestamp: "1704070800", hash: "0x456...", type: "deposit" }
 *   ]}
 * />
 *
 * // With custom theme
 * <TransactionBubbleChart
 *   transactions={transactions}
 *   theme={{
 *     primary: "#FF6B6B",
 *     chart: { axis: "#333333", grid: "#EEEEEE" }
 *   }}
 * />
 * ```
 */
export interface TransactionBubbleChartProps {
  /**
   * Array of transactions to visualize
   * Each transaction must have at minimum:
   * - timestamp: Unix timestamp in seconds (string or number)
   * - hash: Unique identifier
   */
  transactions: BubbleChartTransaction[];

  /**
   * Optional title to display above the chart
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
  dimensions?: Partial<BubbleChartDimensions>;

  /**
   * Number of days to show (default: 7)
   */
  dayCount?: number;

  /**
   * Custom empty state message
   */
  emptyMessage?: string;
}

interface BubbleDataPoint {
  hour: string;
  index: number;
  value: number;
}

interface DayData {
  date: string;
  data: BubbleDataPoint[];
}

const HOURS = [
  '12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
  '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'
];

const DEFAULT_DIMENSIONS: BubbleChartDimensions = {
  minWidth: '700px',
  maxWidth: '900px',
  rowHeight: '60px',
  bubbleRange: [16, 225] as const,
  fontSize: {
    base: 12,
    small: 10,
    large: 14,
  },
};

/**
 * TransactionBubbleChart - Visualizes transaction activity over time
 *
 * Displays a bubble chart showing transaction frequency by hour and day.
 * Bubble size represents the number of transactions in each time slot.
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
export default function TransactionBubbleChart({
  transactions,
  title,
  theme: customTheme,
  dimensions: customDimensions,
  dayCount = 7,
  emptyMessage = 'No transaction data available for bubble chart',
}: TransactionBubbleChartProps) {
  const theme = mergeTheme(customTheme);
  const dimensions = mergeDimensions(customDimensions, DEFAULT_DIMENSIONS);

  // Process transactions into day/hour buckets
  const processTransactions = (): DayData[] => {
    if (transactions.length === 0) return [];

    // Get the most recent transaction date
    const timestamps = transactions.map(tx =>
      typeof tx.timestamp === 'string' ? parseInt(tx.timestamp) : tx.timestamp
    );
    const maxTimestamp = Math.max(...timestamps);
    const endDate = new Date(maxTimestamp * 1000);

    // Create N days of data (ending with the most recent transaction)
    const dayData: DayData[] = [];

    for (let i = dayCount - 1; i >= 0; i--) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Initialize hour buckets for this day
      const hourBuckets: { [key: string]: number } = {};
      HOURS.forEach(hour => {
        hourBuckets[hour] = 0;
      });

      // Count transactions for each hour
      transactions.forEach(tx => {
        const txTimestamp = typeof tx.timestamp === 'string' ? parseInt(tx.timestamp) : tx.timestamp;
        const txDate = new Date(txTimestamp * 1000);

        if (txDate >= date && txDate < nextDate) {
          const hour = txDate.getHours();
          let hourKey: string;

          if (hour === 0) hourKey = '12a';
          else if (hour < 12) hourKey = `${hour}a`;
          else if (hour === 12) hourKey = '12p';
          else hourKey = `${hour - 12}p`;

          hourBuckets[hourKey]++;
        }
      });

      // Convert to data points
      const data: BubbleDataPoint[] = HOURS.map(hour => ({
        hour,
        index: 1,
        value: hourBuckets[hour]
      }));

      dayData.push({ date: dateKey, data });
    }

    return dayData;
  };

  const weekData = processTransactions();

  // Calculate domain for bubble sizing
  const parseDomain = (): [number, number] => {
    const allValues = weekData.flatMap(day => day.data.map(d => d.value));
    return [0, Math.max(...allValues, 1)];
  };

  const domain = parseDomain();
  const range = dimensions.bubbleRange || [16, 225];
  const margin = { top: 10, right: 0, bottom: 0, left: 0 };

  const renderTooltip = (props: TooltipContentProps<string | number, string>) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: theme.background.base,
            border: `1px solid ${theme.border.base}`,
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            padding: '12px',
          }}
        >
          <p style={{ fontSize: dimensions.fontSize?.base, fontWeight: 500, color: theme.text.primary, margin: 0 }}>
            {data.hour}
          </p>
          <p style={{ fontSize: dimensions.fontSize?.base, color: theme.text.secondary, margin: '4px 0 0 0' }}>
            <span style={{ fontWeight: 500 }}>Transactions: </span>
            {data.value}
          </p>
        </div>
      );
    }

    return null;
  };

  const BubbleAxes = ({ day, showXTicks = false }: { day: string; showXTicks?: boolean }) => (
    <>
      <XAxis
        type="category"
        dataKey="hour"
        name="hour"
        interval={0}
        tick={showXTicks ? { fontSize: dimensions.fontSize?.base, fill: theme.chart.axis } : { fontSize: 0 }}
        tickLine={{ transform: 'translate(0, -6)', stroke: theme.chart.grid }}
      />
      <YAxis
        type="number"
        dataKey="index"
        name="day"
        height={10}
        width={80}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{
          value: day,
          position: 'insideRight',
          style: { fontSize: dimensions.fontSize?.base, fill: theme.chart.axis }
        }}
      />
      <ZAxis type="number" dataKey="value" domain={domain} range={range} />
    </>
  );

  const MyTooltip = () => (
    <Tooltip
      cursor={{ strokeDasharray: '3 3' }}
      wrapperStyle={{ zIndex: 100 }}
      content={renderTooltip}
    />
  );

  const Bubbles = ({ data }: { data: BubbleDataPoint[] }) => (
    <Scatter data={data} fill={theme.primary} />
  );

  const DayChart = ({ children }: { children: ReactNode }) => (
    <ScatterChart
      margin={margin}
      style={{
        width: '100%',
        minWidth: dimensions.minWidth,
        maxWidth: dimensions.maxWidth,
        height: dimensions.rowHeight,
      }}
    >
      {children}
    </ScatterChart>
  );

  if (transactions.length === 0) {
    return (
      <div style={{
        width: '100%',
        textAlign: 'center',
        padding: '32px 0',
        color: theme.text.muted,
      }}>
        {emptyMessage}
      </div>
    );
  }

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
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div style={{
          minWidth: dimensions.minWidth,
          maxWidth: dimensions.maxWidth,
          margin: '0 auto',
        }}>
          {weekData.map((dayInfo, index) => (
            <DayChart key={dayInfo.date}>
              <BubbleAxes
                day={dayInfo.date}
                showXTicks={index === weekData.length - 1}
              />
              <Bubbles data={dayInfo.data} />
              <MyTooltip />
            </DayChart>
          ))}
        </div>
      </div>
    </div>
  );
}
