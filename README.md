# 🇦🇷 Flat Coin Dashboard

## 🚀 Project Overview (Hackathon Submission)

This is the front-end application for the Flat Coin Protocol Dashboard. Built for speed and leveraging the latest Next.js features, its primary goal is to provide a real-time, read-only visualization of the protocol's stability and operations.

### Key Features

* **Collateral Composition Visualization:** Displays the current ratio and USD value of all underlying crypto assets backing the Flat Coin via dynamic charts.
* **Rebalance Log:** Tracks a historical log of all asset inflows, outflows, and swaps (rebalances).
* **Octav Protocol Widget Integration:** Dedicated, low-overhead integration point for displaying core Octav data (e.g., current peg stability).
* **Argentinian Theme:** Custom styling using CSS Variables for easy, global theme changes.

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Strict separation of logic and styling using `@apply`.)
* **Data Handling:** Next.js Server Actions (`'use server'`) for all data mutations.

## 📁 Project Structure

The application code is contained within the `frontend/` directory.