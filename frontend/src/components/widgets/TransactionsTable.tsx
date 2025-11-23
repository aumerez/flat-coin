"use client";

import { TableTransaction, formatTransactionType, getChainInfo } from './types';
import { WidgetTheme, mergeTheme } from './config';
import { useState } from 'react';

/**
 * Props for TransactionsTable component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TransactionsTable
 *   transactions={[
 *     {
 *       hash: "0xabc123...",
 *       timestamp: "1704067200",
 *       type: "deposit",
 *       chain: "Ethereum",
 *       explorerUrl: "https://etherscan.io/tx/0xabc123..."
 *     }
 *   ]}
 * />
 *
 * // With custom theme
 * <TransactionsTable
 *   transactions={transactions}
 *   theme={{
 *     status: {
 *       success: { bg: "#E8F5E9", text: "#2E7D32" },
 *       warning: { bg: "#FFEBEE", text: "#C62828" }
 *     }
 *   }}
 * />
 *
 * // With custom chain icon renderer
 * <TransactionsTable
 *   transactions={transactions}
 *   renderChainIcon={(chainInfo) => (
 *     chainInfo.imgSmall ? <img src={chainInfo.imgSmall} alt={chainInfo.name} width={20} height={20} /> : null
 *   )}
 * />
 * ```
 */
export interface TransactionsTableProps {
  /**
   * Array of transactions to display
   * Each transaction must have:
   * - hash: Transaction identifier
   * - timestamp: Unix timestamp in seconds (string)
   * - chain: Chain name or ChainInfo object
   * - type: Optional transaction type
   * - explorerUrl: Optional link to block explorer
   */
  transactions: TableTransaction[];

  /**
   * Optional title to display above the table
   */
  title?: string;

  /**
   * Optional theme configuration to customize colors
   * Will be merged with default theme
   */
  theme?: Partial<WidgetTheme>;

  /**
   * Number of items per page (default: 10)
   */
  itemsPerPage?: number;

  /**
   * Custom renderer for chain icons
   * If not provided, will use basic <img> tag or Next.js Image if available
   *
   * @param chainInfo - Chain information object
   * @returns ReactNode to render the chain icon
   */
  renderChainIcon?: (chainInfo: { name: string; imgSmall?: string }) => React.ReactNode;

  /**
   * Custom empty state message
   */
  emptyMessage?: string;
}

/**
 * TransactionsTable - Displays transactions in a paginated table
 *
 * Shows transaction details including date, action type, chain, and hash
 * with pagination controls for large datasets.
 *
 * **Dependencies:**
 * - react
 *
 * **Standalone Usage:**
 * This component works in any React project (not just Next.js).
 * For chain icons, either provide a custom `renderChainIcon` function
 * or the component will fall back to standard <img> tags.
 */
export default function TransactionsTable({
  transactions,
  title,
  theme: customTheme,
  itemsPerPage = 10,
  renderChainIcon,
  emptyMessage = 'No rebalance transactions found',
}: TransactionsTableProps) {
  const theme = mergeTheme(customTheme);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Clamp current page to valid range to prevent out-of-bounds errors
  const validPage = totalPages > 0 ? Math.min(Math.max(1, currentPage), totalPages) : 1;
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  // Default chain icon renderer (fallback to <img> tag)
  const defaultRenderChainIcon = (chainInfo: { name: string; imgSmall?: string }) => {
    if (!chainInfo.imgSmall) return null;

    // Use standard img tag for portability
    // In Next.js projects, users can provide custom renderChainIcon with next/image
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={chainInfo.imgSmall}
        alt={chainInfo.name}
        width={20}
        height={20}
        style={{ borderRadius: '50%' }}
      />
    );
  };

  const iconRenderer = renderChainIcon || defaultRenderChainIcon;

  // Helper to get status badge colors
  const getStatusColors = (type?: string) => {
    const lowerType = type?.toLowerCase();
    if (lowerType === 'receive' || lowerType === 'deposit' || lowerType === 'mint') {
      return theme.status.success;
    } else if (lowerType === 'send' || lowerType === 'withdraw') {
      return theme.status.warning;
    } else {
      return theme.status.info;
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  // Styles
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: theme.background.selected,
    fontSize: '12px',
    fontWeight: 500,
    color: theme.text.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '12px 16px',
    textAlign: 'left',
  };

  const cellStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '14px',
    borderTop: `1px solid ${theme.border.light}`,
  };

  const rowStyle: React.CSSProperties = {
    backgroundColor: theme.background.base,
  };

  const rowHoverStyle: React.CSSProperties = {
    backgroundColor: theme.background.hover,
  };

  return (
    <div style={{ width: '100%' }}>
      {title && (
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: theme.text.primary,
          marginBottom: '16px',
        }}>
          {title}
        </h3>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Date</th>
              <th style={headerStyle}>Action</th>
              <th style={headerStyle}>Chain</th>
              <th style={headerStyle}>Hash</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((tx) => {
              const chainInfo = getChainInfo(tx.chain);
              const statusColors = getStatusColors(tx.type);

              return (
                <tr
                  key={tx.hash}
                  style={rowStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = rowHoverStyle.backgroundColor!;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = rowStyle.backgroundColor!;
                  }}
                >
                  <td style={{ ...cellStyle, color: theme.text.secondary, whiteSpace: 'nowrap' }}>
                    {new Date(parseInt(tx.timestamp) * 1000).toLocaleDateString()}
                  </td>
                  <td style={{ ...cellStyle, whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 10px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor: statusColors.bg,
                        color: statusColors.text,
                      }}
                    >
                      {formatTransactionType(tx.type)}
                    </span>
                  </td>
                  <td style={{ ...cellStyle, whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {iconRenderer(chainInfo)}
                      <span style={{ color: theme.text.primary }}>{chainInfo.name}</span>
                    </div>
                  </td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace', color: theme.text.muted, whiteSpace: 'nowrap' }}>
                    {tx.explorerUrl ? (
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: theme.primary,
                          textDecoration: 'none',
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        title={tx.hash}
                      >
                        {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                      </a>
                    ) : (
                      <span title={tx.hash}>
                        {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '32px 0',
            color: theme.text.muted,
          }}>
            {emptyMessage}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderTop: `1px solid ${theme.border.light}`,
        }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }} className="sm:hidden">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                border: `1px solid ${theme.border.base}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                color: theme.text.secondary,
                backgroundColor: theme.background.base,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                border: `1px solid ${theme.border.base}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                color: theme.text.secondary,
                backgroundColor: theme.background.base,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
                marginLeft: '12px',
              }}
            >
              Next
            </button>
          </div>
          <div style={{ display: 'none', flex: 1, alignItems: 'center', justifyContent: 'space-between' }} className="hidden sm:flex">
            <div>
              <p style={{ fontSize: '14px', color: theme.text.secondary, margin: 0 }}>
                Showing <span style={{ fontWeight: 500 }}>{startIndex + 1}</span> to{' '}
                <span style={{ fontWeight: 500 }}>{Math.min(endIndex, transactions.length)}</span> of{' '}
                <span style={{ fontWeight: 500 }}>{transactions.length}</span> transactions
              </p>
            </div>
            <div>
              <nav style={{ display: 'inline-flex', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    border: `1px solid ${theme.border.base}`,
                    borderRadius: '6px 0 0 6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: theme.text.muted,
                    backgroundColor: theme.background.base,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  Previous
                </button>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  border: `1px solid ${theme.border.base}`,
                  borderLeft: 'none',
                  borderRight: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: theme.text.primary,
                  backgroundColor: theme.background.base,
                }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    border: `1px solid ${theme.border.base}`,
                    borderRadius: '0 6px 6px 0',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: theme.text.muted,
                    backgroundColor: theme.background.base,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
