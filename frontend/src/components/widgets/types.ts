/**
 * Generic type definitions for portable widgets
 *
 * These types are designed to be generic and reusable across different
 * applications. They don't depend on project-specific types.
 */

/**
 * Minimal transaction data required for TransactionBubbleChart
 *
 * @example
 * ```typescript
 * const transaction: BubbleChartTransaction = {
 *   timestamp: "1704067200", // Unix timestamp in seconds
 *   hash: "0x123...",
 *   type: "swap"
 * };
 * ```
 */
export interface BubbleChartTransaction {
  /** Unix timestamp in seconds (as string or number) */
  timestamp: string | number;
  /** Unique transaction identifier */
  hash: string;
  /** Optional transaction type for categorization */
  type?: string;
}

/**
 * Chain or network information for display
 */
export interface ChainInfo {
  /** Chain/network name */
  name: string;
  /** Optional small icon URL for the chain */
  imgSmall?: string;
}

/**
 * Transaction data required for TransactionsTable
 *
 * @example
 * ```typescript
 * const transaction: TableTransaction = {
 *   hash: "0xabc123...",
 *   timestamp: "1704067200",
 *   type: "deposit",
 *   chain: "Ethereum",
 *   explorerUrl: "https://etherscan.io/tx/0xabc123..."
 * };
 * ```
 */
export interface TableTransaction {
  /** Transaction hash */
  hash: string;
  /** Unix timestamp in seconds (as string) */
  timestamp: string;
  /** Transaction type (e.g., "send", "receive", "swap", "deposit") */
  type?: string;
  /** Chain/network information (can be string or object with name and icon) */
  chain: string | ChainInfo;
  /** Optional URL to blockchain explorer for this transaction */
  explorerUrl?: string;
  /** Optional additional fields from blockchain transaction data */
  from?: string;
  to?: string;
  value?: string;
  blockNumber?: string;
  status?: string;
  gasUsed?: string;
  gasPrice?: string;
  tokenSymbol?: string;
  tokenValue?: string;
}

/**
 * Data point for treemap visualization
 *
 * @example
 * ```typescript
 * const data: TreemapData = {
 *   name: "Ethereum",
 *   value: 150000,
 *   size: 150000
 * };
 * ```
 */
export interface TreemapData {
  /** Label to display */
  name: string;
  /** Numeric value for sizing (optional if using children) */
  size?: number;
  /** Numeric value (can be same as size) */
  value?: number;
  /** Nested children for hierarchical treemaps */
  children?: TreemapData[];
  /** Allow additional properties for flexibility */
  [key: string]: unknown;
}

/**
 * Type guard to check if chain is ChainInfo object
 */
export function isChainInfo(chain: string | ChainInfo): chain is ChainInfo {
  return typeof chain === 'object' && 'name' in chain;
}

/**
 * Helper to extract chain information from string or object
 */
export function getChainInfo(chain: string | ChainInfo): ChainInfo {
  if (isChainInfo(chain)) {
    return chain;
  }
  return { name: chain, imgSmall: undefined };
}

/**
 * Transaction type labels mapping
 * Converts raw transaction types to human-readable labels
 */
export const TRANSACTION_TYPE_LABELS: Record<string, string> = {
  send: 'Send',
  receive: 'Receive',
  swap: 'Swap',
  deposit: 'Deposit',
  withdraw: 'Withdraw',
  approve: 'Approval',
  transfer: 'Transfer',
  interaction: 'Interaction',
  mint: 'Mint',
  burn: 'Burn',
};

/**
 * Helper to format transaction type for display
 */
export function formatTransactionType(type?: string): string {
  if (!type) return '-';
  return TRANSACTION_TYPE_LABELS[type.toLowerCase()] || type;
}
