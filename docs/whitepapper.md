# Toward a Programmable Inflation Hedge: The $FLATCOIN Model

**Boris Polania** - boris.polania@gmail.com  
**Armando Umerez** - aumerez@gmail.com

---

## Abstract

$FLATCOIN is a novel stable flatcoin asset designed to preserve purchasing power by anchoring its value to real-world inflation rather than fiat currencies. Unlike conventional stablecoins, which are pegged to nominal values such as 1 USD, $FLATCOIN introduces a dynamic mechanism awhere users can buy and sell tokens directly through a smart contract at a fixed base price of 1 USDT, with built-in interest and taxation structures that mirror inflationary behavior. 

The protocol allows users to open positions via spot purchases or limit orders and to sell positions with interest rewards funded through a programmable tax model. By differentiating between $FLATCOIN and future positions and leveraging mechanisms such as auction-based tax rate discovery and Harberger-style auctions, $FLATCOIN embeds economic signals directly into its token lifecycle. 

The system is designed to create a self-regulating, inflation-indexed monetary instrument whose supply and yield reflect aggregate market expectations. This design is a hedge against inflation, enabling a decentralized and programmable monetary policy.

---

## Introduction

The global monetary system is increasingly strained by persistent inflation and volatility in fiat currencies. While offering a reprieve from price fluctuations in cryptocurrencies, traditional stablecoins remain tethered to fiat currencies that erode in value over time. As a result, stablecoins like USDT or USDC provide nominal stability but not absolute stability; they preserve price but do not provide purchasing power.

$FLATCOIN is introduced as a new class of stable asset—a **flatcoin**—designed to maintain value relative to inflation rather than a fiat peg. By anchoring its redemption value to 1 USDT plus an interest component that aims to track inflation, $FLATCOIN acts as a synthetic hedge against the loss of purchasing power. The system leverages smart contracts to automate minting, burning, position management, and interest calculation, removing intermediaries and enabling transparent, rule-based monetary logic.

The core mechanism of $FLATCOIN revolves around user-managed positions. Buyers can acquire $FLAT through spot purchases or limit orders, minting new tokens in the former case. Sellers close these positions and are rewarded with a principal return plus interest, funded through a programmable tax applied to redemptions and transfers. Futures-style positions allow users to speculate on inflation expectations, while an auction-based or Harberger-style taxation mechanism enables market dynamics to shape the protocol's monetary signals.

This document presents the complete design of the $FLATCOIN protocol, detailing the economic rationale, technical architecture, and feedback systems that govern supply, interest, and inflation tracking. In doing so, $FLATCOIN aims to offer a decentralized, self-adjusting, and user-governed flatcoin that serves as a store of value and a barometer for inflationary expectations in the crypto economy.

---

## Tokenomics

$FLATCOIN introduces a decentralized monetary system centered on positions and user-controlled contracts that define ownership, interest accrual, and redemption rights. The tokenomics are built around mechanisms for minting, burning, interest distribution, taxation, and market-driven inflation alignment. This structure aims to preserve purchasing power, provide user incentives, and provide system sustainability without relying on centralized entities or external price oracles.

### Token Minting and Burning

#### Minting (Spot Buys)

When a user performs a spot buy through the contract:

- They pay 1 USDT per $FLAT token.
- New $FLAT tokens are minted, increasing the circulating supply.
- A position is created and assigned to the buyer.
- A fee is applied to the transaction, contributing to the protocol reserve.

This process directly expands the token supply and acts as a proxy for inflationary pressure in the system.

#### Burning (Spot Sells)

When a user initiates a spot sell through the contract:

- The user closes their position.
- The $FLAT tokens involved are burned, reducing the circulating supply.
- The seller receives 1 USDT + accrued interest.
- A closing tax is applied, funding future interest payouts.

Burning acts as a deflationary counterforce, triggered when users exit their positions.

### Position-Based Ownership

$FLAT is not a simple bearer token—it is always tied to an underlying position:

- Each spot buy creates a unique position, entitling the owner to redemption rights.
- Only the owner can close the position and redeem the $FLAT.
- **Transferability:** Positions can be transferred or sold to others, enabling a secondary market for $FLAT exposure.
- Every transfer incurs a fee, which is used to sustain the protocol and balance incentives.

This model introduces a composable and tradable ownership layer around each token, enabling futures and speculation without protocol-level complexity.

### Futures and Flatcoins

There are two types of positions:

1. **Flatcoin Positions:** Purchased at the base price (1 USDT), redeemable with interest to preserve purchasing power.
2. **Future Positions:** Created by users who sell a position with a premium price (e.g., $1.02), reflecting inflation expectations. Buyers of these positions are betting that future inflation will exceed the premium.

Futures allow participants to speculate on inflation or hedge against it using simple market mechanics.

### Interest Distribution

To maintain purchasing power parity with real-world inflation, $FLAT positions pay interest upon closure:

- Interest is paid in USDT from the protocol's reserve.
- The goal is for this interest to track inflation, enabling $FLAT holders to preserve real value over time.
- The amount of interest depends on:
  - The time the position was held.
  - The current system-wide interest rate (adjusted to reflect inflation).
  - Any applicable taxes or penalties.

### Taxation Mechanism

The interest payouts are funded through a protocol-level tax system:

#### Closing Tax

- Applied when a position is closed.
- Formula (example):
  ```
  Tax = (Principal – Earned Interest) × Interest Rate
  ```
- This mechanism makes users who redeem their positions contribute proportionally to the protocol's sustainability.

#### Transfer Fees

- Every position transfer is taxed.
- These fees act as friction on speculation while funding future payouts.

### Dynamic Tax Adjustment (Optional Mechanisms)

To fine-tune the protocol's equilibrium between supply, demand, and inflation alignment, $FLATCOIN can implement dynamic tax rate discovery mechanisms:

#### Tax Exemption Auctions

- Users bid to obtain temporary exemptions from position-closing taxes.
- The auction outcomes signal market preferences, informing future tax rates.

#### Harberger-Style Auctions

- Users bid the tax rate they will pay to acquire or close positions.
- All positions are ALWAYS on sale once the bid reaches a threshold.
- Creates a continuous price discovery process for the real cost of liquidity.

Both mechanisms introduce a feedback loop between user behavior and protocol parameters, enabling adaptive inflation modeling without external price feeds.

### Inflation Feedback Loop

The minting and burning of $FLAT tokens, alongside interest and tax flows, create a self-regulating inflation index:

- Increased spot buys signal rising inflation expectations and expands supply.
- Taxation and interest payments modulate capital flows and maintain balance.
- The resulting economic data can be used to derive a synthetic inflation index internal to the system.

This feedback system would make $FLATCOIN behave as a living inflation hedge, continuously recalibrated by market activity.

---

## Position Management

At the core of the $FLATCOIN protocol lies a position-based architecture. Every $FLAT token exists within the context of a position, which defines ownership, lifecycle, and rights to future value. This structure introduces a programmable financial layer on top of basic token transfers, enabling advanced features such as inflation hedging, future pricing, and secondary markets. Position management governs how users acquire, hold, transfer, and close their $FLAT holdings.

### Position Creation

Positions are created exclusively through spot purchases executed via the protocol's smart contract. When a user buys $FLAT:

- A new position is opened that is uniquely associated with that user.
- The buyer receives $FLAT tokens, minted at 1 USDT per token.
- The contract logs the purchase time and price, which later determine interest at the time of redemption.
- The buyer becomes the sole party authorized to close the position.

This mechanism ties $FLAT tokens directly to individual user positions rather than treating them as free-floating assets.

### Position Ownership and Rights

A position grants the holder the following rights:

- **Redemption:** The ability to sell $FLAT back to the contract and receive 1 USDT plus interest.
- **Transferability:** The option to transfer the position to another user.
- **Pricing:** The discretion to sell the position at a premium, especially for futures.

Ownership is tracked on-chain, and each transfer is subject to protocol fees contributing to the system's operational pool.

### Position Transfer

Positions are fully transferable. When a user sells or assigns a position:

- The new owner inherits all rights and obligations, including the redemption timeline and interest potential.
- The protocol charges a transfer fee, either fixed or percentage-based.
- Transfers can occur peer-to-peer or through decentralized marketplaces.

This feature enables a secondary market for $FLAT positions. Buyers may seek discounted entries or bet on inflation by acquiring future-priced positions.

### Closing a Position

Positions are closed when the owner redeems the $FLAT tokens through a spot sale. During closure:

- The tokens are burned, removing them from circulation.
- The user receives 1 USDT per token plus accrued interest.
- A closing tax is applied, reducing the payout slightly to support the system's sustainability.

Only the current owner of a position has the authority to close it. The interest calculation is based on the time held and the protocol's current rate, which reflects inflationary trends.

### Futures Pricing and Arbitrage

Users can assign premium prices to their positions, turning them into futures. For example:

- A user buys a $1,000 position and lists it for $1,020.
- Another participant who expects inflation to rise above 2% may purchase it, anticipating a net gain at redemption.

This allows inflation expectations to be priced into the protocol, creating arbitrage opportunities between present value and future returns. The more participants expect inflation to rise, the more they will pay for early exposure.

### Market Dynamics

The position management model creates several essential dynamics:

- **Holding for interest** rewards patient users who aim to preserve purchasing power.
- **Trading positions** introduce speculation, price discovery, and optional liquidity.
- **Auction mechanisms** can be layered on top, allowing tax exemptions or priority access to positions based on market bidding.

The protocol should anchor each $FLAT token to a unique and transferable position, encouraging strategic behavior and a self-adjusting ecosystem.

---

## Interest and Inflation Alignment

$FLATCOIN is designed to preserve real value over time by compensating users for inflation through interest-bearing positions. The protocol's interest model is tightly integrated with token lifecycle events, user behavior, and tax mechanisms. By aligning interest payouts with inflation expectations, $FLATCOIN should offer a decentralized way to maintain purchasing power without relying on external oracles.

### Purpose of Interest

Interest is the key mechanism that enables $FLAT to function as an inflation-resistant asset. When a user closes a position, the protocol pays out the original principal (1 USDT per token) plus interest. This interest is intended to match or closely approximate the prevailing inflation rate during the position's life.

Interest serves two main goals:

1. Preserve purchasing power for users holding $FLAT over time.
2. Signal inflationary expectations through system activity and pricing behavior.

This should make $FLAT more than just a stable asset. It should make it a dynamic hedge capable of reflecting and responding to inflationary trends.

### Interest Calculation

Interest is computed at the time a position is closed and depends on:

- **Holding duration:** Longer-held positions receive more interest.
- **Protocol interest rate:** Set or adjusted to reflect inflation expectations.
- **Principal amount:** The original USDT paid during position creation.

The formula can be structured as:

```
Interest = Principal × Effective_Interest_Rate × Time_Held
```

Depending on system design and market feedback, the protocol can adjust this rate constant, tiered, or dynamically.

### Funding the Interest

Interest payouts are funded by the protocol using a tax mechanism. Taxes are applied when:

- Positions are closed (spot sales).
- Positions are transferred between users.

The closing tax formula might follow:

```
Tax = (Principal – Earned_Interest) × Tax_Rate
```

This setup allows the system to continuously recycle capital, rewarding long-term holders while collecting contributions from those seeking liquidity or transfer flexibility.

### Interest as a Function of Inflation

Rather than relying on off-chain data, $FLATCOIN allows inflation to be inferred from protocol dynamics. In particular:

- Increased demand for spot buys suggests users anticipate rising inflation and want to lock in $FLAT now.
- Higher premiums on futures positions reflect expectations of greater future inflation.
- Auction outcomes (for tax exemptions or priority access) give real-time insight into users' expectations of inflation.

These behaviors should allow the protocol to approximate a synthetic inflation index. Interest rates can then be adjusted accordingly, either algorithmically or through governance.

### Incentive Balance

The relationship between interest and tax is designed to guide user behavior:

- Attractive interest rates encourage users to hold positions and delay redemption.
- Higher taxes on early closures discourage short-term speculation.
- Transfer fees discourage excessive flipping and fund long-term holders.

The system should maintain a balance between liquidity, speculation, and inflation hedging by tuning these variables.

### Dynamic Adjustment Models

The protocol should include mechanisms to adjust the interest rate to remain aligned with inflation dynamically:

- **Auction-Based Feedback:** Users bid on tax exemptions, and bid levels inform future interest rates.
- **Harberger Tax Models:** Users declare what rate they are willing to pay, producing continuous feedback on perceived inflation.
- **Expected returns:** Users set an expected inflation rate when opening a position.

These models convert collective user sentiment into protocol signals that guide the evolution of interest payouts.

---

## Taxation and Incentives

Taxation in the $FLATCOIN protocol serves a dual purpose: it funds interest payouts that preserve purchasing power and creates economic incentives that shape user behavior. Rather than functioning as a punitive mechanism, taxes are used as strategic tools to influence redemption timing, trading frequency, and system equilibrium. When structured carefully, these incentives align long-term sustainability with inflation-resilient returns.

### Purpose of Taxation

Taxes play a critical role in the $FLATCOIN economy by:

- Funding interest for position holders without requiring external capital.
- Discouraging short-term speculation and promoting value-stable behavior.
- Balancing liquidity demands through variable penalties on early exits.
- Feeding back into inflation estimation, especially in auction-based models.

Taxes are not constant. They can be dynamic and market-informed, adapting to the protocol's economic conditions.

### Closing Tax

The closing tax is applied whenever a user redeems $FLAT through a spot sale to the contract. This tax is calculated based on the amount of interest accrued by the position and functions as a protocol-level contribution from the seller.

**Formula (Example):**

```
Tax = (Principal – Earned_Interest) × Tax_Rate
```

**Key characteristics:**

- The longer a position is held, the more interest it earns, and the more the tax is offset.
- Sellers who redeem early, before interest has meaningfully accrued, contribute more in relative terms.
- The tax is deducted from the payout and routed to the protocol reserve.

This structure encourages longer-term holding while maintaining a source of capital for interest distribution.

### Transfer Fees

Whenever a position is transferred between users:

- A fee is collected, which may be fixed or percentage-based.
- This fee contributes to the reserve pool that supports interest payouts.
- The protocol may implement minimum holding periods or additional charges to discourage high-frequency flipping.

Transfer fees introduce a layer of friction that reduces speculative volatility while maintaining secondary market flexibility.

### Dynamic Tax Models

The protocol can optionally implement mechanisms to allow taxes to be discovered and adjusted through market activity.

#### Tax Exemption Auctions

- Users may bid for exemptions or reductions on closing taxes.
- The protocol periodically holds auctions for these exemptions.
- Winning bids are collected into the reserve.
- The level of demand and bid amounts provide real-time information about inflation expectations and liquidity pressure.

#### Harberger-Style Tax Bidding

- Users state the tax rate they will pay to close or acquire a position.
- These self-declared rates become binding for a fixed time window.
- This model incentivizes honest bidding since underbidding can lead to loss of opportunity or underperformance.
- Over time, these declarations can be aggregated to refine the system-wide interest and tax rate policies.
- Once the tax is paid sellers are required to sell, it's after all a radical market.

Both mechanisms allow user sentiment to shape the tax landscape, reducing reliance on fixed or arbitrarily set rates.

### Incentive Balancing

By carefully tuning taxes and fees, the protocol creates a stable feedback loop:

- Higher interest rewards encourage holding.
- Proportional taxes discourage early exits but allow flexibility when needed.
- Market-driven adjustments provide long-term sustainability and adaptability.
- Transfer friction reduces noise from short-term speculation and rewards patient capital.

These tools are not just sustainability levers but also key elements of the protocol's internal inflation modeling system.

### Optional Governance Layers

To adapt over time, governance mechanisms may be introduced to adjust:

- Tax rates and formulas
- Auction parameters
- Fee thresholds and tiering
- Allocation of reserve funds

Community input, or delegated governance, could help maintain a responsive and transparent framework for evolving economic conditions.

---

## Market Mechanisms and Order Fulfillment

The $FLATCOIN protocol should offer a hybrid model that blends automated on-chain minting and burning with flexible order placement and fulfillment. This structure allows users to engage with the protocol through both spot interactions and order-based strategies, giving them greater control over timing, pricing, and exposure. The result shall be a fluid marketplace where inflation expectations and liquidity needs drive real-time behavior.

### Spot Market Operations

Spot interactions are direct, protocol-level transactions executed on demand. These form the backbone of the $FLATCOIN economy and govern token supply.

#### Spot Buy

- Users purchase $FLAT directly from the contract at a fixed price of 1 USDT per token.
- When opening a position, the user should set a target inflation rate.
- The protocol mints new $FLAT, increasing circulating supply.
- A fee is charged and a position is created for the buyer.

Spot buys are inflationary, as they increase the token supply and reflect user demand for inflation protection.

#### Spot Sell

- Users sell $FLAT back to the contract, closing their position.
- They receive 1 USDT + interest, subject to a closing tax.
- The tokens are burned, reducing supply.

Spot sells are deflationary, as they remove tokens from circulation and indicate liquidity-seeking behavior.

### Order-Based Fulfillment

In addition to spot transactions, users can place buy and sell orders, which are fulfilled only when matching interest exists. These off-chain or escrow-based interactions allow for delayed execution at more favorable terms.

#### Buy Orders

- A user places a request to purchase $FLAT from an existing holder, specifying the desired quantity, price and target inflation rate.
- The order is fulfilled when a seller agrees to the terms.
- No new tokens are minted in this case; the transaction occurs as a position transfer, not a mint event.

#### Sell Orders

- A holder of $FLAT lists their position for sale, typically at a premium.
- These positions may represent futures, allowing sellers to capitalize on inflation expectations.
- Fulfillment results in a transfer, not a redemption, preserving token supply while redistributing exposure.

Order-based fulfillment introduces market dynamics that supplement the base protocol, allowing for flexible, peer-matched exchanges.

### Matching Logic and Prioritization

The protocol may define simple rules for how orders are matched and fulfilled:

- First-in, first-out for queued orders
- Price-time priority, where higher-value and earlier orders are matched first
- Auction clearing, where multiple buyers or sellers are pooled for batch execution

While basic functionality can be off-chain or managed by aggregators, these models can also be implemented natively in smart contracts as the protocol matures.

### Market Impact of Order Types

Different order types influence the economy in different ways:

This diversity allows the market to express complex behavior while the protocol tracks the deeper signals embedded in transaction choices.

### Liquidity Dynamics

The protocol's hybrid model creates a dual liquidity system:

- **Protocol Liquidity:** Spot buyers and sellers interact directly with reserves. This provides guaranteed entry and exit at baseline pricing but involves minting, burning, fees, and taxes.
- **Peer Liquidity:** Orders between users introduce flexibility, allowing speculative positioning, discount entries, and inflation hedging with minimized protocol friction.

Users can shift between these systems based on urgency, pricing, and expected market trends, contributing to a self-regulating balance between protocol and peer activity.

### Long-Term Equilibrium

The design of order flow supports the broader goals of $FLATCOIN:

- Stable interest funding through controlled tax inflows
- Responsive inflation indexing via spot minting and burning trends
- Encouragement of secondary markets that reduce pressure on core liquidity pools

As the protocol grows, the interaction between these mechanisms should form a decentralized monetary system capable of adapting to changing economic environments through user behavior alone.

---

## Inflation Index Generation

A key innovation in the $FLATCOIN protocol is its ability to create an internal, market-driven inflation index based entirely on user activity. Instead of relying on external data sources or centralized oracles, $FLATCOIN uses the economic behavior of its participants to estimate and reflect inflation expectations. This design allows the protocol to stay adaptable and resistant to manipulation, while maintaining alignment with real-world purchasing power trends.

### Inflation as a Behavioral Signal

In traditional systems, inflation is reported through lagging indicators published by central banks or statistical agencies. $FLATCOIN replaces this with a forward-looking model that uses real-time user behavior to infer expected inflation. Key signals include:

- **Spot Buy Volume:** A rise in spot purchases, which mint new $FLAT, indicates users expect inflation to increase. They are opting to lock in flatcoin exposure at current rates in anticipation of future value erosion in fiat.
- **Futures Position Pricing:** When users sell positions at a premium (e.g., $1.02 for a token that costs $1.00 to mint), this premium reflects the seller's inflation expectations. Willing buyers validate these expectations through market demand.
- **Auction Bids and Tax Preferences:** In models where users bid for tax exemptions or declare acceptable tax rates (as in Harberger auctions), the level and variance of bids provide additional insight into inflation sentiment.

These behavioral signals should form a composite picture of how participants perceive inflation risk and future value shifts.

### Role of Spot Buys in Inflation Dynamics

Spot buys are the only action that increases token supply and are therefore a direct measure of inflationary behavior. Their implications include:

- **Token Supply Expansion:** More spot buys lead to more tokens entering circulation, mirroring the way fiat supply expands through credit and monetary stimulus.
- **Interest Demand Pressure:** As more users buy and hold $FLAT, the system must sustain greater interest payouts to maintain purchasing power parity.
- **System Feedback Loop:** When demand rises for spot buys, the protocol may interpret this as a rising inflation signal, prompting governance or automated mechanisms to adjust interest rates or tax models accordingly.

User's expected inflation could act as an index.

### Measuring Inflation Implicitly

Rather than producing a single fixed number for inflation, $FLATCOIN generates a floating, implied inflation index based on:

- **Mint-to-Burn Ratio:** The ratio of new token creation (spot buys) to token destruction (spot sells).
- **Futures Premium Curve:** The average premium being paid on futures positions across different holding durations.
- **Effective Interest Rate Curve:** The realized rate of return across closed positions, adjusted for tax and fees.

By aggregating this data, the protocol can construct a dynamic picture of inflation expectations. This index is not explicitly published unless desired, but it influences interest rate adjustments and economic parameters.

### Benefits of an Internal Index

Using an internal, behavior-based inflation index provides several advantages:

- **Decentralization:** No need for external data feeds or trusted parties.
- **Resilience to manipulation:** The index emerges from many users' economic decisions, making it difficult to distort.
- **Forward-Looking Nature:** Unlike consumer price indices that reflect past data, this model reflects participants' expectations and is more responsive to future conditions.
- **Adaptability:** The protocol can adapt its tax, interest, and liquidity parameters based on actual activity, not forecasts.

### Optional Publication and Use Cases

While not required, the protocol or third-party tools may publish:

- A synthetic inflation index as a dashboard metric.
- Historical inflation charts, based on system activity.
- Volatility estimates derived from futures pricing and spot volume.

These tools should enhance transparency and give users greater insight into how $FLATCOIN responds to macroeconomic trends.

---

## Missing Parts

Shall we add a governance section?
