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

export interface OctavHistoricalDataPoint {
  date: string;
  networth: string;
  cashBalance: string;
  dailyIncome: string;
  dailyExpense: string;
  fees: string;
  feesFiat: string;
}

export interface OctavHistoricalResponse {
  address: string;
  data: OctavHistoricalDataPoint[];
}

export interface OctavChainInfo {
  uuid: string;
  key: string;
  name: string;
  imgSmall?: string;
  imgLarge?: string;
}

export interface OctavTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  blockNumber: string;
  chain: string | OctavChainInfo;
  status: string;
  explorerUrl?: string;
  gasUsed?: string;
  gasPrice?: string;
  tokenSymbol?: string;
  tokenValue?: string;
  type?: string;
}

export interface OctavTransactionsResponse {
  address: string;
  transactions: OctavTransaction[];
  total: number;
  limit: number;
  offset: number;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  value: string;
  price: string;
  chain: string;
  contractAddress?: string;
  decimals?: number;
  imgSmall?: string;
  imgLarge?: string;
}

export interface OctavTokenOverviewResponse {
  address: string;
  date?: string;
  tokens: TokenBalance[];
  totalValue: string;
}
