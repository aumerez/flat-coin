please update the plan to include the changes on the frontend... 
```
# 🗺️ Peso Argentino Flat Coin - Development Plan

## 🎯 Project Overview

**Goal:** Build a dashboard for a flat coin that protects Argentinians from peso inflation by backing it with USDC + yield-generating DeFi protocols. The flat coin is omnichain via LayerZero OFT.

**Tech Stack:**
- Frontend: Next.js 15+ (App Router) + TypeScript
- Web3: wagmi + viem + RainbowKit
- Integrations: Octav (dashboard plugin), LayerZero (OFT + Composer)
- Styling: Tailwind CSS (Argentine theme)

---

## 📐 Architecture Overview

### Page Structure

**Single Page Application:**
```
/ (Home Page)
├── Hero Section (Explainer)
├── Dashboard Section (Octav Plugin Embedded)
├── Rebalance Logs Section (if time permits)
└── Header (Wallet Connect + Purchase Button)
```

**Modal:**
- Purchase Modal (triggered from header button)
  - Input: Token selector (USDC, ETH, etc.)
  - Network selector (LayerZero supported chains)
  - Output: Flat coin amount preview
  - Action: Initiate cross-chain mint via LayerZero Composer

---

## 🏗️ Development Phases

### Phase 1: Project Setup & Core UI (Day 1 Morning)

**Tasks:**
1. Initialize Next.js project with TypeScript
2. Install dependencies:
```bash
   npm install wagmi viem @rainbow-me/rainbowkit
   npm install -D tailwindcss postcss autoprefixer
```
3. Configure Tailwind with Argentine color palette
4. Set up project structure (`components/`, `types/`, `styles/`, `lib/`)
5. Create basic layout with header + main content area

**Deliverable:** Clean project skeleton with Argentine-themed styling

---

### Phase 2: Wallet Connection & Web3 Setup (Day 1 Afternoon)

**Tasks:**
1. Configure wagmi with multiple chains (Ethereum, Arbitrum, Optimism, Base)
2. Implement RainbowKit for wallet connection
3. Create `ConnectWallet` button component in header
4. Set up contract ABIs and addresses in `lib/contracts/`
5. Create type-safe contract hooks using wagmi

**Deliverable:** Working wallet connection with multi-chain support

---

### Phase 3: Home Page Content (Day 1 Evening)

**Tasks:**
1. Write explainer content (what is the flat coin, how it works)
2. Create hero section component with Argentine branding
3. Add value proposition sections:
   - "Protect Against Inflation"
   - "Backed by Real Assets"
   - "Available on Any Chain"
4. Responsive design for mobile/desktop

**Deliverable:** Complete home page with explainer content

---

### Phase 4: Octav Dashboard Integration (Day 2 Morning)

**Tasks:**
1. Read Octav plugin documentation
2. Create CustomContentTreeMap component
3. Use this request: curl -X GET "https://api.octav.fi/v1/portfolio?addresses=0x6426af179aabebe47666f345d69fd9079673f6cd&includeImages=true" \
  -H "Authorization: Bearer YOUR_API_KEY"
4. add OCTAV_API_KEY on .env variable
5. Use recharts npm library for teh graph:
```
import { Treemap } from 'recharts';
import { TreemapNode } from 'recharts/types/chart/Treemap';

// #region Sample data
const data = [
  {
    name: 'axis',
    children: [
      { name: 'Axes', size: 1302 },
      { name: 'Axis', size: 24593 },
      { name: 'AxisGridLine', size: 652 },
      { name: 'AxisLabel', size: 636 },
      { name: 'CartesianAxes', size: 6703 },
    ],
  },
  {
    name: 'controls',
    children: [
      { name: 'AnchorControl', size: 2138 },
      { name: 'ClickControl', size: 3824 },
      { name: 'Control', size: 1353 },
      { name: 'ControlList', size: 4665 },
      { name: 'DragControl', size: 2649 },
      { name: 'ExpandControl', size: 2832 },
      { name: 'HoverControl', size: 4896 },
      { name: 'IControl', size: 763 },
      { name: 'PanZoomControl', size: 5222 },
      { name: 'SelectionControl', size: 7862 },
      { name: 'TooltipControl', size: 8435 },
    ],
  },
  {
    name: 'data',
    children: [
      { name: 'Data', size: 20544 },
      { name: 'DataList', size: 19788 },
      { name: 'DataSprite', size: 10349 },
      { name: 'EdgeSprite', size: 3301 },
      { name: 'NodeSprite', size: 19382 },
      {
        name: 'render',
        children: [
          { name: 'ArrowType', size: 698 },
          { name: 'EdgeRenderer', size: 5569 },
          { name: 'IRenderer', size: 353 },
          { name: 'ShapeRenderer', size: 2247 },
        ],
      },
      { name: 'ScaleBinding', size: 11275 },
      { name: 'Tree', size: 7147 },
      { name: 'TreeBuilder', size: 9930 },
    ],
  },
  {
    name: 'events',
    children: [
      { name: 'DataEvent', size: 7313 },
      { name: 'SelectionEvent', size: 6880 },
      { name: 'TooltipEvent', size: 3701 },
      { name: 'VisualizationEvent', size: 2117 },
    ],
  },
  {
    name: 'legend',
    children: [
      { name: 'Legend', size: 20859 },
      { name: 'LegendItem', size: 4614 },
      { name: 'LegendRange', size: 10530 },
    ],
  },
  {
    name: 'operator',
    children: [
      {
        name: 'distortion',
        children: [
          { name: 'BifocalDistortion', size: 4461 },
          { name: 'Distortion', size: 6314 },
          { name: 'FisheyeDistortion', size: 3444 },
        ],
      },
      {
        name: 'encoder',
        children: [
          { name: 'ColorEncoder', size: 3179 },
          { name: 'Encoder', size: 4060 },
          { name: 'PropertyEncoder', size: 4138 },
          { name: 'ShapeEncoder', size: 1690 },
          { name: 'SizeEncoder', size: 1830 },
        ],
      },
      {
        name: 'filter',
        children: [
          { name: 'FisheyeTreeFilter', size: 5219 },
          { name: 'GraphDistanceFilter', size: 3165 },
          { name: 'VisibilityFilter', size: 3509 },
        ],
      },
      { name: 'IOperator', size: 1286 },
      {
        name: 'label',
        children: [
          { name: 'Labeler', size: 9956 },
          { name: 'RadialLabeler', size: 3899 },
          { name: 'StackedAreaLabeler', size: 3202 },
        ],
      },
      {
        name: 'layout',
        children: [
          { name: 'AxisLayout', size: 6725 },
          { name: 'BundledEdgeRouter', size: 3727 },
          { name: 'CircleLayout', size: 9317 },
          { name: 'CirclePackingLayout', size: 12003 },
          { name: 'DendrogramLayout', size: 4853 },
          { name: 'ForceDirectedLayout', size: 8411 },
          { name: 'IcicleTreeLayout', size: 4864 },
          { name: 'IndentedTreeLayout', size: 3174 },
          { name: 'Layout', size: 7881 },
          { name: 'NodeLinkTreeLayout', size: 12870 },
          { name: 'PieLayout', size: 2728 },
          { name: 'RadialTreeLayout', size: 12348 },
          { name: 'RandomLayout', size: 870 },
          { name: 'StackedAreaLayout', size: 9121 },
          { name: 'TreeMapLayout', size: 9191 },
        ],
      },
      { name: 'Operator', size: 2490 },
      { name: 'OperatorList', size: 5248 },
      { name: 'OperatorSequence', size: 4190 },
      { name: 'OperatorSwitch', size: 2581 },
      { name: 'SortOperator', size: 2023 },
    ],
  },
];

// #endregion
const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

const CustomizedContent = (props: TreemapNode) => {
  const { root, depth, x, y, width, height, index, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? COLORS[Math.floor((index / root.children.length) * 6)] : '#ffffff00',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
          {name}
        </text>
      ) : null}
      {depth === 1 ? (
        <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
          {index + 1}
        </text>
      ) : null}
    </g>
  );
};

const CustomContentTreemap = () => {
  return (
    <Treemap
      style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 4 / 3 }}
      data={data}
      dataKey="size"
      stroke="#fff"
      fill="#8884d8"
      content={CustomizedContent}
    />
  );
};

export default CustomContentTreemap;
```
5. Use new nextjs app/actions? (does the call needs to be handled on library module and the data hadling on the actions? or everything can be handle with actions)
6. How this data is consumed, as a hook? do  
7. Data output:
```
{
  "address": "0x6426af179aabebe47666f345d69fd9079673f6cd",
  "cashBalance": "0",
  "dailyIncome": "0",
  "dailyExpense": "0",
  "fees": "0.125",
  "feesFiat": "420.50",
  "lastUpdated": "1715173392020",
  "networth": "45231.89",
  "assetByProtocols": {
    "wallet": {
      "key": "wallet",
      "name": "Wallet",
      "value": "25123.45",
      "assets": [
        {
          "balance": "5.5",
          "symbol": "ETH",
          "price": "3200.50",
          "value": "17602.75",
          "contractAddress": "0x0000000000000000000000000000000000000000",
          "chain": "ethereum"
        },
        {
          "balance": "2.3",
          "symbol": "WETH",
          "price": "3200.50",
          "value": "7361.15",
          "contractAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "chain": "ethereum"
        }
      ]
    },
    "aave_v3": {
      "key": "aave_v3",
      "name": "Aave V3",
      "value": "12500.00",
      "assets": [
        {
          "balance": "10000",
          "symbol": "USDC",
          "price": "1.00",
          "value": "10000.00",
          "contractAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "chain": "ethereum"
        },
        {
          "balance": "2500",
          "symbol": "DAI",
          "price": "1.00",
          "value": "2500.00",
          "contractAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
          "chain": "ethereum"
        }
      ]
    },
    "uniswap_v3": {
      "key": "uniswap_v3",
      "name": "Uniswap V3",
      "value": "7608.44",
      "assets": [
        {
          "balance": "1.2",
          "symbol": "ETH",
          "price": "3200.50",
          "value": "3840.60",
          "chain": "ethereum"
        },
        {
          "balance": "3767.84",
          "symbol": "USDC",
          "price": "1.00",
          "value": "3767.84",
          "chain": "ethereum"
        }
      ]
    }
  },
  "chains": {
    "ethereum": {
      "key": "ethereum",
      "name": "Ethereum",
      "value": "38523.45",
      "protocols": ["wallet", "aave_v3", "uniswap_v3"]
    },
    "arbitrum": {
      "key": "arbitrum",
      "name": "Arbitrum",
      "value": "6708.44",
      "protocols": ["wallet", "gmx"]
    }
  }
}
```
5. Add loading states and error handling

**Deliverable:** Working Octav dashboard showing collateral breakdown

---

### Phase 5: Purchase Modal & LayerZero Integration (Day 2 Afternoon)

**Tasks:**
1. Create `PurchaseModal` component with:
   - Token input selector (USDC, ETH, DAI, etc.)
   - Network selector (show LayerZero logo + supported chains)
   - Amount input with balance display
   - Preview of flat coin output
2. Implement LayerZero Composer contract interaction:
   - Create contract interface for Composer messages
   - Show "Cross-Chain Message" flow in UI
   - Display estimated gas + fees
3. Add transaction flow:
   - Approve token (if needed)
   - Send LayerZero Composer message
   - Show pending state with chain animations
   - Success confirmation with transaction hash

**Deliverable:** Functional purchase flow with LayerZero Composer proof

---

### Phase 6: Rebalance Logs (Day 2 Evening - Optional)

**Tasks:**
1. Create `RebalanceLogs` component
2. Fetch rebalance events from contract (or mock data)
3. Display table with:
   - Timestamp
   - Assets rebalanced (from → to)
   - Amounts
   - Reason (inflation adjustment, yield optimization)
4. Add filtering/pagination if many events

**Deliverable:** Visual log of rebalancing activity

---

### Phase 7: Polish & Demo Prep (Day 3)

**Tasks:**
1. Add animations and transitions (Framer Motion)
2. Implement toast notifications for transactions
3. Add FAQ section or tooltips for key concepts
4. Mobile responsiveness check
5. Performance optimization
6. Prepare demo script:
   - Show multi-chain support
   - Demonstrate Composer message flow
   - Show Octav dashboard updating
7. Record demo video (backup if live demo fails)

**Deliverable:** Polished, demo-ready application

---

## 🎨 UI Components Breakdown

### Header
- Logo (Argentine flag colors + "Peso Stable")
- Network indicator (current connected chain)
- Wallet connect button
- **Purchase** button (primary CTA)

### Hero Section
- Bold headline: "Protect Your Savings from Inflation"
- Subheadline: "A stable coin backed by real yields, available on any blockchain"
- Key metrics cards:
  - Current backing ratio
  - TVL
  - APY (inflation protection rate)

### Octav Dashboard Section
- Section title: "Collateral Composition"
- Embedded Octav plugin (responsive container)
- Legend explaining asset types

### Purchase Modal
- Close button (X)
- Title: "Purchase Peso Stablecoin"
- Form:
  - Network selector (dropdown with chain logos)
  - Input token selector (dropdown)
  - Amount input (with max button)
  - Output preview (calculated flat coin amount)
- LayerZero badge: "Powered by LayerZero Composer"
- Action buttons: Cancel / Confirm Purchase

### Rebalance Logs (Optional)
- Table with columns: Date, Action, Assets, Amount, Status
- Pagination controls

---

## 🔗 Smart Contract Interfaces Needed (Frontend Only)

**Types to define in `frontend/src/types/contracts.ts`:**
```typescript
// Flat Coin OFT Contract
interface FlatCoinContract {
  balanceOf(address: string): Promise<bigint>;
  totalSupply(): Promise<bigint>;
  collateralRatio(): Promise<number>;
}

// LayerZero Composer Contract
interface ComposerContract {
  sendComposerMessage(
    dstChainId: number,
    tokenIn: string,
    amountIn: bigint,
    recipient: string
  ): Promise<TransactionResponse>;
}

// Collateral Vault (for Octav data)
interface CollateralVault {
  getAssets(): Promise<Asset[]>;
  getTVL(): Promise<bigint>;
}
```

---

## 📊 Data Requirements

### Static Data (Hardcoded for Hackathon)
- Supported networks (chain IDs, names, logos)
- Supported input tokens per chain
- Explainer text content
- FAQ items

### Dynamic Data (From Contracts/APIs)
- User wallet balance
- Flat coin balance
- Collateral composition (via Octav)
- Recent rebalance events
- Current inflation rate (mock or API)

### Mock Data (If APIs Unavailable)
- Sample rebalance logs
- Historical backing ratio data

---

## 🚀 Demo Script

1. **Intro (30 sec):**
   - "Argentina has 200%+ annual inflation. Our flat coin protects savings."
   
2. **Show Dashboard (45 sec):**
   - Point to Octav plugin: "Real-time collateral composition"
   - Explain: "USDC base + yield protocols fill inflation gap"
   
3. **Purchase Flow (60 sec):**
   - Click Purchase button
   - Select different networks (show LayerZero support)
   - Select input token (USDC)
   - Enter amount
   - Click Confirm
   - Show Composer message transaction
   - Success: "Flat coin received on [network]"
   
4. **Rebalancing (30 sec - optional):**
   - Scroll to logs
   - Explain: "Automatic rebalancing maintains peg despite inflation"

**Total Demo Time: ~3 minutes**

---

## ⚠️ Known Challenges & Solutions

| Challenge | Solution |
|:----------|:---------|
| Octav plugin may not load in dev | Use iframe with fallback to mock UI |
| LayerZero testnet gas costs | Use faucets, have backup funded wallets |
| Contract not deployed in time | Use mock contract with hardcoded responses |
| Multi-chain RPC rate limits | Use Alchemy/Infura with backup providers |

---

## 📦 Dependencies List
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "wagmi": "^2.x",
    "viem": "^2.x",
    "@rainbow-me/rainbowkit": "^2.x",
    "@tanstack/react-query": "^5.x",
    "framer-motion": "^11.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "@types/node": "^20.x",
    "@types/react": "^19.x"
  }
}
```

---

## ✅ Definition of Done

- [ ] User can connect wallet on multiple chains
- [ ] Octav plugin displays collateral composition
- [ ] Purchase modal shows LayerZero network selector
- [ ] Purchase flow demonstrates Composer message usage
- [ ] UI is responsive (mobile + desktop)
- [ ] Demo can run without internet (with mocks)
- [ ] Transaction states have clear UI feedback
- [ ] Argentine branding is consistent throughout

---

## 🏆 Hackathon Judging Criteria Alignment

1. **LayerZero Integration:** Purchase modal + Composer message flow
2. **Octav Integration:** Embedded dashboard plugin
3. **Innovation:** Inflation-protected flat coin concept
4. **UX:** Single-page, clean interface with clear value prop
5. **Technical Execution:** Type-safe, modern React patterns
```

a donwlable file too