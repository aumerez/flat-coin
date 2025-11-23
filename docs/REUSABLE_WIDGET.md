# Portable Transaction & Collateral Widgets

A collection of reusable React widgets for visualizing blockchain transaction data and collateral composition. These components are framework-agnostic and can be easily integrated into any React or Next.js application with customizable theming.

## 📦 Widgets Included

1. **TransactionBubbleChart** - Visualize transaction activity patterns by date and hour
2. **TransactionsTable** - Display transactions in a paginated table
3. **CollateralTreemap** - Show hierarchical data (e.g., collateral composition) as a treemap

---

## 🚀 Quick Start

### Installation

These widgets require `recharts` and `react` as peer dependencies:

```bash
npm install recharts react
# or
yarn add recharts react
# or
pnpm add recharts react
```

### Basic Usage

```tsx
import TransactionBubbleChart from './widgets/TransactionBubbleChart';
import TransactionsTable from './widgets/TransactionsTable';
import CollateralTreemap from './widgets/CollateralTreemap';

function MyDashboard() {
  const transactions = [
    {
      hash: "0xabc123...",
      timestamp: "1704067200",
      type: "deposit",
      chain: "Ethereum",
      explorerUrl: "https://etherscan.io/tx/0xabc123..."
    },
    // ... more transactions
  ];

  const collateralData = [
    { name: "Ethereum", value: 150000, size: 150000 },
    { name: "Bitcoin", value: 80000, size: 80000 },
    { name: "Polygon", value: 30000, size: 30000 }
  ];

  return (
    <div>
      <h2>Transaction Activity</h2>
      <TransactionBubbleChart transactions={transactions} />

      <h2>Collateral Composition</h2>
      <CollateralTreemap data={collateralData} />

      <h2>Recent Transactions</h2>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
```

---

## 🎨 Theming & Customization

All widgets support customizable theming through a shared configuration system.

### Default Theme

By default, widgets use the MERIDIAN/Argentine color palette:

```typescript
{
  primary: '#74ACDF',        // Argentine blue
  palette: ['#74ACDF', '#5A8FB8', '#A8D5F2', '#8DC77B', '#F6B40E', '#F8C12D'],
  background: {
    base: '#FFFFFF',
    hover: '#F9FAFB',
    selected: '#F3F4F6'
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    muted: '#6B7280'
  },
  // ... more theme properties
}
```

### Custom Theme Example

```tsx
import TransactionBubbleChart from './widgets/TransactionBubbleChart';

function MyDashboard() {
  const customTheme = {
    primary: '#FF6B6B',
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DFE6E9'],
    status: {
      success: { bg: '#E8F5E9', text: '#2E7D32' },
      warning: { bg: '#FFEBEE', text: '#C62828' },
      info: { bg: '#E3F2FD', text: '#1565C0' }
    }
  };

  return (
    <TransactionBubbleChart
      transactions={transactions}
      theme={customTheme}
    />
  );
}
```

---

## 📖 Widget API Reference

### TransactionBubbleChart

Displays transaction activity as bubbles on a day/hour grid. Bubble size represents transaction count.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `transactions` | `BubbleChartTransaction[]` | **required** | Array of transactions with `timestamp`, `hash` |
| `theme` | `Partial<WidgetTheme>` | Default theme | Custom color/styling configuration |
| `dimensions` | `Partial<BubbleChartDimensions>` | See below | Chart dimensions and sizing |
| `dayCount` | `number` | `7` | Number of days to display |
| `emptyMessage` | `string` | Default message | Text shown when no data |

#### Transaction Data Shape

```typescript
interface BubbleChartTransaction {
  timestamp: string | number;  // Unix timestamp in seconds
  hash: string;                // Unique transaction identifier
  type?: string;               // Optional transaction type
}
```

#### Example

```tsx
<TransactionBubbleChart
  transactions={[
    { timestamp: "1704067200", hash: "0x123...", type: "swap" },
    { timestamp: "1704070800", hash: "0x456...", type: "deposit" }
  ]}
  theme={{ primary: "#4ECDC4" }}
  dayCount={14}
  dimensions={{
    minWidth: "800px",
    maxWidth: "1000px",
    bubbleRange: [20, 250]
  }}
/>
```

---

### TransactionsTable

Paginated table displaying transaction details with sortable columns.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `transactions` | `TableTransaction[]` | **required** | Array of transactions to display |
| `theme` | `Partial<WidgetTheme>` | Default theme | Custom color/styling configuration |
| `itemsPerPage` | `number` | `10` | Number of rows per page |
| `renderChainIcon` | `function` | Auto-detect | Custom chain icon renderer |
| `emptyMessage` | `string` | Default message | Text shown when no data |

#### Transaction Data Shape

```typescript
interface TableTransaction {
  hash: string;                          // Transaction identifier
  timestamp: string;                     // Unix timestamp in seconds
  type?: string;                         // Transaction type (deposit, withdraw, etc.)
  chain: string | ChainInfo;             // Chain name or object with icon
  explorerUrl?: string;                  // Link to block explorer
}

interface ChainInfo {
  name: string;
  imgSmall?: string;  // URL to chain icon
}
```

#### Example

```tsx
<TransactionsTable
  transactions={[
    {
      hash: "0xabc123...",
      timestamp: "1704067200",
      type: "deposit",
      chain: { name: "Ethereum", imgSmall: "/icons/eth.png" },
      explorerUrl: "https://etherscan.io/tx/0xabc123..."
    }
  ]}
  itemsPerPage={20}
  theme={{
    status: {
      success: { bg: "#E8F5E9", text: "#2E7D32" }
    }
  }}
  renderChainIcon={(chainInfo) => (
    <img src={chainInfo.imgSmall} alt={chainInfo.name} width={20} height={20} />
  )}
/>
```

#### Next.js Compatibility

The table automatically detects Next.js and uses `next/image` for chain icons. In non-Next.js environments, it falls back to standard `<img>` tags. You can also provide a custom `renderChainIcon` function.

---

### CollateralTreemap

Treemap visualization for hierarchical data (e.g., asset allocation, collateral composition).

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TreemapData[]` | **required** | Array of data items to visualize |
| `theme` | `Partial<WidgetTheme>` | Default theme | Custom color/styling configuration |
| `dimensions` | `Partial<TreemapDimensions>` | See below | Chart dimensions |
| `formatValue` | `function` | USD formatter | Custom value formatter |

#### Data Shape

```typescript
interface TreemapData {
  name: string;         // Label to display
  size?: number;        // Numeric value for sizing
  value?: number;       // Alternative to size
  children?: TreemapData[];  // For nested treemaps
}
```

#### Example

```tsx
<CollateralTreemap
  data={[
    { name: "Ethereum", value: 150000, size: 150000 },
    { name: "Bitcoin", value: 80000, size: 80000 },
    { name: "Polygon", value: 30000, size: 30000 }
  ]}
  theme={{
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
  }}
  dimensions={{ height: 500 }}
  formatValue={(val) => `€${val?.toLocaleString()}`}
/>
```

---

## 🎯 Complete Theme Interface

```typescript
interface WidgetTheme {
  primary: string;              // Main brand color
  palette: string[];            // Multi-color palette (for treemap, etc.)

  background: {
    base: string;              // Base background
    hover: string;             // Hover state background
    selected: string;          // Selected/active background
  };

  text: {
    primary: string;           // Primary text color
    secondary: string;         // Secondary text color
    muted: string;             // Muted/disabled text color
  };

  border: {
    base: string;              // Default border color
    light: string;             // Light border/divider color
  };

  status: {
    success: { bg: string; text: string };  // Success badge colors
    warning: { bg: string; text: string };  // Warning badge colors
    info: { bg: string; text: string };     // Info badge colors
  };

  chart: {
    axis: string;              // Chart axis color
    grid: string;              // Chart grid line color
  };
}
```

---

## 📁 File Structure

When copying widgets to your project, include these files:

```
your-project/
└── components/
    └── widgets/
        ├── config.ts                      # Shared theme configuration
        ├── types.ts                       # TypeScript interfaces
        ├── TransactionBubbleChart.tsx     # Bubble chart widget
        ├── TransactionsTable.tsx          # Table widget
        ├── CollateralTreemap.tsx          # Treemap widget
        └── README.md                      # This documentation
```

---

## 🔧 Advanced Customization

### Custom Dimensions

```tsx
<TransactionBubbleChart
  transactions={transactions}
  dimensions={{
    minWidth: "900px",
    maxWidth: "1200px",
    rowHeight: "70px",
    bubbleRange: [20, 300],
    fontSize: {
      base: 14,
      small: 11,
      large: 18
    }
  }}
/>
```

### Custom Value Formatting

```tsx
<CollateralTreemap
  data={collateralData}
  formatValue={(value) => {
    if (!value) return '';
    return `€${(value / 1000).toFixed(1)}K`;
  }}
/>
```

### Combining with Your App's Theme

```tsx
import { useTheme } from 'your-theme-provider';

function Dashboard() {
  const appTheme = useTheme();

  const widgetTheme = {
    primary: appTheme.colors.primary,
    background: {
      base: appTheme.colors.background,
      hover: appTheme.colors.hover,
      selected: appTheme.colors.selected
    },
    text: {
      primary: appTheme.colors.text,
      secondary: appTheme.colors.textMuted,
      muted: appTheme.colors.textDisabled
    }
  };

  return <TransactionBubbleChart transactions={txs} theme={widgetTheme} />;
}
```

---

## 🌐 Standalone Usage (Outside Next.js)

These widgets work in any React application. Just ensure you have the dependencies:

```bash
npm install react recharts
```

Then import and use directly:

```tsx
import TransactionBubbleChart from './widgets/TransactionBubbleChart';

// Works in Create React App, Vite, or any React setup
function App() {
  return <TransactionBubbleChart transactions={data} />;
}
```

---

## 💡 Tips for Octav Integration

If you're integrating these widgets into the Octav platform:

1. **Data Mapping**: Transform Octav API responses to match widget interfaces
2. **Theming**: Use Octav's brand colors by passing custom theme
3. **Chain Icons**: Provide `renderChainIcon` with Octav's icon assets
4. **Value Formatting**: Customize `formatValue` to match Octav's currency display

### Example Integration

```tsx
import { useOctavData } from 'octav-sdk';
import TransactionsTable from './widgets/TransactionsTable';

function OctavDashboard() {
  const { transactions } = useOctavData();

  // Map Octav data to widget format
  const widgetData = transactions.map(tx => ({
    hash: tx.txHash,
    timestamp: tx.blockTimestamp,
    type: tx.txType,
    chain: {
      name: tx.chainName,
      imgSmall: getChainIcon(tx.chainId)
    },
    explorerUrl: getExplorerUrl(tx.chainId, tx.txHash)
  }));

  const octavTheme = {
    primary: '#YOUR_BRAND_COLOR',
    // ... other Octav brand colors
  };

  return (
    <TransactionsTable
      transactions={widgetData}
      theme={octavTheme}
    />
  );
}
```

---

## 📄 License

These widgets are part of the MERIDIAN Foundation flat coin project. Check the project root for license information.

---

## 🤝 Contributing

For questions or issues with these widgets, please contact the development team or open an issue in the project repository.
