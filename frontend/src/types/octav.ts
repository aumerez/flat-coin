export interface OctavAsset {
  balance: string;
  symbol: string;
  price: string;
  value: string;
  contractAddress?: string;
  chain: string;
}

export interface OctavProtocol {
  key: string;
  name: string;
  value: string;
  assets: OctavAsset[];
}

export interface OctavChain {
  key: string;
  name: string;
  value: string;
  chainId: string;
  imgSmall?: string;
  imgLarge?: string;
  valuePercentile: string;
  totalCostBasis: string;
  totalClosedPnl: string;
  totalOpenPnl: string;
  protocols?: string[];
}

export interface OctavPortfolioResponse {
  address: string;
  cashBalance: string;
  dailyIncome: string;
  dailyExpense: string;
  fees: string;
  feesFiat: string;
  lastUpdated: string;
  networth: string;
  assetByProtocols: Record<string, OctavProtocol>;
  chains: Record<string, OctavChain>;
}
