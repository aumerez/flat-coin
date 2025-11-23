import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum, optimism, base, polygon, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Define the chains for LayerZero OFT support
export const supportedChains = [
  mainnet,
  arbitrum,
  optimism,
  base,
  polygon,
  sepolia, // For testing
] as const

// Create wagmi config with RainbowKit
export const config = getDefaultConfig({
  appName: 'Peso Argentino Flat Coin',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: supportedChains,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true, // Enable server-side rendering support
})
