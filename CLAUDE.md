# 📋 CLAUDE.md: Peso Argentino Flat Coin - Hackathon Configuration

This document defines architectural constraints and coding standards for rapid, clean development of the flat coin dashboard frontend.

---

## 🚨 CRITICAL RULES & CONSTRAINTS

### A. Core Architecture & Workflow

1. **Framework & Routing:** Next.js 15+ (App Router). Project in `frontend/` folder.
2. **Language & Types:** TypeScript exclusively. Interfaces in `frontend/src/types/`.
3. **NO TESTING CODE:** Do not suggest or generate unit/integration/e2e tests. Manual testing only.
4. **Smart Contracts:** Frontend-only scope. Smart contract integration via type-safe interfaces only.

### B. Third-Party Integrations (HACKATHON CRITICAL)

1. **Octav Dashboard Plugin:**
   - Use Octav's embeddable plugins (https://octav.fi/) to display collateral composition.
   - Reference docs: https://docs.octav.fi/docs/quickstart
   - Integration via iframe/widget as per their plugin system.

2. **LayerZero (OFT + Composer):**
   - Display multi-chain support for flat coin (OFT standard).
   - Show composer message handling for cross-chain minting/transfers.
   - Network selector must be prominent in UI.

3. **Web3 Wallet Connection:**
   - Use wagmi + RainbowKit or similar for wallet connection.
   - Support multiple networks (Ethereum, Arbitrum, Optimism, Base, etc.).

### C. Data Flow & State Management

1. **Data Reads (GET):** Use Next.js `fetch` in Server Components for:
   - Static content (home page explainer text).
   - Any API data not from blockchain (USD/ARS inflation beacons if implemented).

2. **Blockchain Data:** Use wagmi hooks in Client Components for:
   - Wallet connection state.
   - Token balances.
   - Smart contract reads (collateral ratios, flat coin supply).

3. **Data Mutations:** Server Actions in `frontend/src/lib/actions/` for non-blockchain operations only.

4. **State Management:**
   - Server-backed state: Next.js caching for static content.
   - Client state: `useState`/`useReducer` for UI (modals, form inputs).
   - Blockchain state: wagmi's built-in caching.

### D. Styling & Theming (Separation of Concerns)

1. **Styling Separation:**
   - Tailwind CSS with Argentine-inspired color palette (blue/white/light blue).
   - Component logic in `frontend/src/components/`.
   - Semantic CSS classes using `@apply` in `frontend/src/styles/`.

2. **Theme:** CSS Variables in `globals.css`:
   - `--ar-blue`: #74ACDF (Argentine flag blue)
   - `--ar-white`: #FFFFFF
   - `--ar-yellow`: #F6B40E (sun yellow accent)

---

## 🔧 DEVELOPMENT STRUCTURE

| Path | Responsibility | Note |
|:-----|:---------------|:-----|
| `frontend/src/types/` | Type definitions | Interfaces for contracts, API responses |
| `frontend/src/lib/actions/` | Server Actions | Non-blockchain mutations only |
| `frontend/src/components/` | UI Components | Logic only; uses semantic classes |
| `frontend/src/styles/` | Tailwind styles | `@apply` definitions |
| `frontend/src/lib/contracts/` | Contract ABIs & addresses | Type-safe contract interfaces |

---

## 🎯 HACKATHON PRIORITIES

1. **MUST HAVE:**
   - Home page with flat coin explainer.
   - Octav plugin embedded showing collateral composition.
   - Wallet connection (wagmi + RainbowKit).
   - Purchase modal with network selector (LayerZero chains).
   - Visual proof of LayerZero Composer usage.

2. **NICE TO HAVE:**
   - Rebalance logs display (if time permits).
   - USD/ARS inflation beacon display.
   - On-ramp/off-ramp integration.

---

## 🧠 AI INSTRUCTIONS

- Always use Server Components by default unless wallet interaction is needed.
- When generating Web3 components, use wagmi hooks and mark as Client Component.
- For Octav integration, follow their plugin embedding documentation.
- All LayerZero-related UI must show multi-chain capability clearly.
- Installation commands use `npm`.