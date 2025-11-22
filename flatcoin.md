# $FLATCOIN Design Document

## Buying $FLAT

People can always buy $FLAT from a contract and pay 1 USDT.

- Every time someone buys $FLAT, she opens and owns a position the owner can only close.
- Users can make a spot buy or place a buy order.
- Buy orders are fulfilled when holders want to sell.
- When someone makes a spot buy, new $FLATs are minted.
- Spot orders pay a fee.

### Position Features

- Ownership is transferable so that positions can be negotiated.
- Positions can be opened as futures.
- Non-future positions are Flatcoins.

### Example

I bought a $1000 $FLAT future position and priced it at $1.02. If someone expects the inflation to be higher than 2%, they have the incentive to buy it.

## Selling $FLAT

People can always sell $FLAT to a contract and receive 1 USDT + Interest that should match or be close to inflation.

- Every time someone sells $FLAT, she closes a position she owns.
- Users can make a spot sale or place a sell order.
- Sellers' orders are fulfilled when someone wants to buy through the contract.
- When someone makes a spot sale, $FLATs are burned, and the system's reserves fulfill the order.

## Tax Mechanism to Fund Interests

The system uses a tax mechanism to fund the interests.

### Tax Structure

- To reward holders, every time a position is closed (i.e., $FLAT is sold through the contract), the seller is taxed using a formula like:
  ```
  tax = (principal - earned_interest) * interest_rate
  ```
- Every position transfer pays a fee.

### Tax Rate Mechanisms

Two potential mechanisms for setting tax rates:

1. **Auction-based mechanism**: Tax exemptions are auctioned, and the information is used to set new tax rates.
2. **Harberger-style auction**: People bid the taxes they are willing to pay to buy and close a position.

## Inflation Index Generation

The dynamics between interests and taxes should be able to generate an inflation index.

### Spot Buy Impact on Inflation

Spot buys directly increase inflation because each purchase mints new tokens, expanding the total supply. This inflationary effect is specific to spot buys, as they are the only mechanism that increases token circulation. As such, heightened demand for spot buys may also signal that participants expect rising inflation, seeking early exposure to assets they believe will hold value in an inflationary environment.

### Tax Design Objectives

Taxes should be designed to encourage/discourage spot/sell-orders as necessary to keep interest rates similar to inflation.
