# FlatCoin Monorepo

## Overview
This monorepo contains all components of the FlatCoin ecosystem, including:
- **Smart contracts** defining the FlatCoin protocol.
- **Financial agents** that monitor inflation indexes, prices, and rebalance baskets.
- **Next.js frontend** for institutions and users to interact with FlatCoin.
- **Documentation** (pitch deck, plan, technical docs).

FlatCoin aims to provide an inflation‑resistant unit of account, enabling institutional‑grade financial products on-chain (e.g., inflation‑protected bonds) using an omnichain architecture powered by LayerZero and Octav.

---

## Repository Structure

```
flat-coin/
│
├── contracts/
│   └── README.md
│
├── docs/
│   ├── PITCH_DECK.md
│   └── PLAN.md
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── README.md
│
├── CLAUDE.md
├── flatcoin.txt
└── README.md   (this file)
```

---

## Key Components

### **1. FlatCoin Contracts**
- Inflation-indexed on-chain stability model.
- Peg adjusted using official CPI or equivalent trusted sources.
- Oracle integration (Octav).
- Omnichain messaging (LayerZero) for cross-chain mints/redemptions.

### **2. Financial Agents**
Agents continuously monitor:
- Price feeds
- Inflation indexes
- Basket collateral ratios  
Perform automated rebalancing operations to keep FlatCoin aligned with the inflation index.

### **3. Next.js Frontend**
- App Router architecture
- Strong separation of UI and logic
- Tailwind used only via external class-composition files (no inline logic)
- Hydration-safe state design to prevent unnecessary rerendering

### **State Management Approach**
- Use **Zustand** for global stores with explicit selectors to avoid rerenders.
- Use **SWR/React Query** for remote data.
- Avoid context overuse.
- All side effects isolated in service modules.

---

## Development Setup

### Install dependencies
```bash
pnpm install
```

### Start the dev environment
```bash
pnpm dev
```

### Build packages
```bash
pnpm build
```

---

## Testing (Optional)
Testing tools are installed, but CI-triggered test‑on‑change is disabled to save tokens when running Claude workflows.

---

## Sponsors and Integrations

### **LayerZero**
Used to make FlatCoin **omnichain**, enabling:
- Cross-chain mint/redeem
- Multi-network issuance for institutions
- Chain-agnostic liquidity expansion

### **Octav**
Used to supply:
- Inflation indexes
- Asset categorization data
- High-quality financial metadata needed for a CPI-pegged asset

---

## Pitch Deck & Docs
See the `docs/` folder for:
- **PITCH_DECK.md**
- **PLAN.md**
- Architecture and roadmap details

---

## License
MIT License.
