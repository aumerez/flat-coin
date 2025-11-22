---
title: "[]{#_c5u2kr704n4q .anchor}Toward a Programmable Inflation Hedge:
  The \\$FLATCOIN Model"
---

# Introduction

The global monetary system is increasingly strained by persistent
inflation and volatility in fiat currencies. While offering a reprieve
from price fluctuations in cryptocurrencies, traditional stablecoins
remain tethered to fiat currencies that erode in value over time. As a
result, stablecoins like USDT or USDC provide *nominal stability* but
not *absolute stability*; they preserve price but do not provide
purchasing power.

\$FLATCOIN is introduced as a new class of stable asset---*a
flatcoin*---designed to maintain value relative to inflation rather than
a fiat peg. By anchoring its redemption value to 1 USDT *plus an
interest component* that aims to track inflation, \$FLATCOIN acts as a
synthetic hedge against the loss of purchasing power. The system
leverages smart contracts to automate minting, burning, position
management, and interest calculation, removing intermediaries and
enabling transparent, rule-based monetary logic.

The core mechanism of \$FLATCOIN revolves around user-managed positions.
Buyers can acquire \$FLAT through spot purchases or limit orders,
minting new tokens in the former case. Sellers close these positions and
are rewarded with a principal return plus interest, funded through a
programmable tax applied to redemptions and transfers. Futures-style
positions allow users to speculate on inflation expectations, while an
auction-based or Harberger-style taxation mechanism enables market
dynamics to shape the protocol's monetary signals.

This document presents the complete design of the \$FLATCOIN protocol,
detailing the economic rationale, technical architecture, and feedback
systems that govern supply, interest, and inflation tracking. In doing
so, \$FLATCOIN aims to offer a decentralized, self-adjusting, and
user-governed flatcoin that serves as a store of value and a barometer
for inflationary expectations in the crypto economy.

# Tokenomics

\$FLATCOIN introduces a decentralized monetary system centered on
*positions* and user-controlled contracts that define ownership,
interest accrual, and redemption rights. The tokenomics are built around
mechanisms for minting, burning, interest distribution, taxation, and
market-driven inflation alignment. This structure aims to preserve
purchasing power, provide user incentives, and provide system
sustainability without relying on centralized entities or external price
oracles.

## Token Minting and Burning

### Minting (Spot Buys)

When a user performs a spot buy through the contract:

-   They pay 1 USDT per \$FLAT token.

-   New \$FLAT tokens are minted, increasing the circulating supply.

-   A position is created and assigned to the buyer.

-   A fee is applied to the transaction, contributing to the protocol
    > reserve.

This process directly expands the token supply and acts as a proxy for
inflationary pressure in the system.

### Burning (Spot Sells)

When a user initiates a spot sell through the contract:

-   The user closes their position.

-   The \$FLAT tokens involved are burned, reducing the circulating
    > supply.

-   The seller receives 1 USDT + accrued interest.

-   A closing tax is applied, funding future interest payouts.

Burning acts as a deflationary counterforce, triggered when users exit
their positions.

## Position-Based Ownership

\$FLAT is not a simple bearer token---it is always tied to an underlying
position:

-   Each spot buy creates a unique position, entitling the owner to
    > redemption rights.

-   Only the owner can close the position and redeem the \$FLAT.

-   Transferability: Positions can be transferred or sold to others,
    > enabling a secondary market for \$FLAT exposure.

-   Every transfer incurs a fee, which is used to sustain the protocol
    > and balance incentives.

This model introduces a composable and tradable ownership layer around
each token, enabling futures and speculation without protocol-level
complexity.

## Futures and Flatcoins

There are two types of positions:

-   Flatcoin Positions: Purchased at the base price (1 USDT), redeemable
    > with interest to preserve purchasing power.

-   Future Positions: Created by users who sell a position with a
    > premium price (e.g., \$1.02), reflecting inflation expectations.
    > Buyers of these positions are betting that future inflation will
    > exceed the premium.

Futures allow participants to speculate on inflation or hedge against it
using simple market mechanics.

## Interest Distribution

To maintain purchasing power parity with real-world inflation, \$FLAT
positions pay interest upon closure:

-   Interest is paid in USDT from the protocol's reserve.

-   The goal is for this interest to track inflation, enabling \$FLAT
    > holders to preserve real value over time.

-   The amount of interest depends on:

    -   The time the position was held.

    -   The current system-wide interest rate (adjusted to reflect
        > inflation).

    -   Any applicable taxes or penalties.

## Taxation Mechanism

The interest payouts are funded through a protocol-level tax system:

### Closing Tax

-   Applied when a position is closed.

-   Formula (example):\
    > Tax = (Principal -- Earned Interest) × Interest Rate

-   This mechanism makes users who redeem their positions contribute
    > proportionally to the protocol's sustainability.

### Transfer Fees

-   Every position transfer is taxed.

-   These fees act as friction on speculation while funding future
    > payouts.

## Dynamic Tax Adjustment (Optional Mechanisms)

To fine-tune the protocol's equilibrium between supply, demand, and
inflation alignment, \$FLATCOIN can implement dynamic tax rate discovery
mechanisms:

### Tax Exemption Auctions

-   Users bid to obtain temporary exemptions from position-closing
    > taxes.

-   The auction outcomes signal market preferences, informing future tax
    > rates.

### Harberger-Style Auctions

-   Users bid the tax rate they will pay to acquire or close positions.

-   All positions are ALWAYS on sale once the bid reaches a threshold.

-   Creates a continuous price discovery process for the real cost of
    > liquidity.

Both mechanisms introduce a feedback loop between user behavior and
protocol parameters, enabling adaptive inflation modeling without
external price feeds.

## Inflation Feedback Loop

The minting and burning of \$FLAT tokens, alongside interest and tax
flows, create a self-regulating inflation index:

-   Increased spot buys signal rising inflation expectations and expands
    > supply.

-   Taxation and interest payments modulate capital flows and maintain
    > balance.

-   The resulting economic data can be used to derive a synthetic
    > inflation index internal to the system.

This feedback system would make \$FLATCOIN behave as a living inflation
hedge, continuously recalibrated by market activity.

# Position Management

At the core of the \$FLATCOIN protocol lies a position-based
architecture. Every \$FLAT token exists within the context of a
position, which defines ownership, lifecycle, and rights to future
value. This structure introduces a programmable financial layer on top
of basic token transfers, enabling advanced features such as inflation
hedging, future pricing, and secondary markets. Position management
governs how users acquire, hold, transfer, and close their \$FLAT
holdings.

## Position Creation

Positions are created exclusively through spot purchases executed via
the protocol's smart contract. When a user buys \$FLAT:

-   A new position is opened that is uniquely associated with that user.

-   The buyer receives \$FLAT tokens, minted at 1 USDT per token.

-   The contract logs the purchase time and price, which later determine
    > interest at the time of redemption.

-   The buyer becomes the sole party authorized to close the position.

This mechanism ties \$FLAT tokens directly to individual user positions
rather than treating them as free-floating assets.

## Position Ownership and Rights

A position grants the holder the following rights:

-   Redemption: The ability to sell \$FLAT back to the contract and
    > receive 1 USDT plus interest.

-   Transferability: The option to transfer the position to another
    > user.

-   Pricing: The discretion to sell the position at a premium,
    > especially for futures.

Ownership is tracked on-chain, and each transfer is subject to protocol
fees contributing to the system's operational pool.

## Position Transfer

Positions are fully transferable. When a user sells or assigns a
position:

-   The new owner inherits all rights and obligations, including the
    > redemption timeline and interest potential.

-   The protocol charges a transfer fee, either fixed or
    > percentage-based.

-   Transfers can occur peer-to-peer or through decentralized
    > marketplaces.

This feature enables a secondary market for \$FLAT positions. Buyers may
seek discounted entries or bet on inflation by acquiring future-priced
positions.

## Closing a Position

Positions are closed when the owner redeems the \$FLAT tokens through a
spot sale. During closure:

-   The tokens are burned, removing them from circulation.

-   The user receives 1 USDT per token plus accrued interest.

-   A closing tax is applied, reducing the payout slightly to support
    > the system's sustainability.

Only the current owner of a position has the authority to close it. The
interest calculation is based on the time held and the protocol's
current rate, which reflects inflationary trends.

## Futures Pricing and Arbitrage

Users can assign premium prices to their positions, turning them into
futures. For example:

-   A user buys a \$1,000 position and lists it for \$1,020.

-   Another participant who expects inflation to rise above 2% may
    > purchase it, anticipating a net gain at redemption.

This allows inflation expectations to be priced into the protocol,
creating arbitrage opportunities between present value and future
returns. The more participants expect inflation to rise, the more they
will pay for early exposure.

## Market Dynamics

The position management model creates several essential dynamics:

-   Holding for interest rewards patient users who aim to preserve
    > purchasing power.

-   Trading positions introduce speculation, price discovery, and
    > optional liquidity.

-   Auction mechanisms can be layered on top, allowing tax exemptions or
    > priority access to positions based on market bidding.

The protocol should anchor each \$FLAT token to a unique and
transferable position, encouraging strategic behavior and a
self-adjusting ecosystem.