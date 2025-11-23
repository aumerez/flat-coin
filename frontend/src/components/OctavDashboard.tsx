import { getPortfolioData, getTokenOverview, getTransactions } from "@/app/actions";
import CollateralTreemap from "./widgets/CollateralTreemap";
import { OctavChain, OctavProtocol, OctavTransactionsResponse } from "@/src/types/octav";
import TransactionsTable from "./widgets/TransactionsTable";
import TransactionBubbleChart from "./widgets/TransactionBubbleChart";

interface TreemapData {
  name: string;
  size?: number;
  children?: TreemapData[];
  [key: string]: unknown;
}

export default async function OctavDashboard() {
  const DEFAULT_ADDRESS = "0x70709614bf9ad5bbab18e2244046d48f234a1583";

  let rawData;
  let txs: OctavTransactionsResponse = {
    transactions: [],
    address: "",
    total: 0,
    limit: 0,
    offset: 0
  };
  let error = null;
  try {
    rawData = await getPortfolioData(DEFAULT_ADDRESS);
    const allTxs = await getTransactions(DEFAULT_ADDRESS, 50); // Fetch more transactions

    // Filter for rebalance-relevant transaction types
    const rebalanceTypes = ['deposit', 'withdraw', 'mint', 'interaction'];
    txs = {
      ...allTxs,
      transactions: allTxs.transactions.filter(tx =>
        tx.type && rebalanceTypes.includes(tx.type.toLowerCase())
      )
    };
    
    if (txs.transactions.length) {
      console.log('Rebalance transactions:', txs.transactions.length, 'of', allTxs.transactions.length, 'total');
      console.log('First tx:', txs.transactions[0]);
    }

  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load portfolio data";
  }

  // Handle if API returns array or single object
  const portfolioData = Array.isArray(rawData) ? rawData[0] : rawData;

  // Transform chains data to treemap format
  const chainTreemapData: TreemapData[] =
    portfolioData?.chains
      ? Object.values(portfolioData.chains).map((chain: OctavChain) => ({
          name: chain.name,
          size: parseFloat(chain.value),
          value: parseFloat(chain.value),
        }))
      : [];

  // Transform protocols data to treemap format
  // Filter out "Wallet" as it's not a protocol
  const protocolTreemapData: TreemapData[] =
    portfolioData?.assetByProtocols
      ? Object.values(portfolioData.assetByProtocols)
          .filter((protocol: OctavProtocol) => protocol.key !== 'wallet')
          .map((protocol: OctavProtocol) => ({
            name: protocol.name,
            size: parseFloat(protocol.value),
            value: parseFloat(protocol.value),
          }))
      : [];
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Collateral Composition</h2>
        <p className="text-gray-600 mb-8">
          Real-time view of assets backing Bankl Stable, powered by Octav.
        </p>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Using mock data for demonstration</p>
          </div>
        ) : null}

        {portfolioData && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-600">Net Worth</p>
                <p className="text-2xl font-bold">
                  ${portfolioData.networth ? parseFloat(portfolioData.networth).toLocaleString() : '0'}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-600">Protocols</p>
                <p className="text-2xl font-bold">
                  {portfolioData.assetByProtocols ? Object.keys(portfolioData.assetByProtocols).length : 0}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-600">Chains</p>
                <p className="text-2xl font-bold">
                  {portfolioData.chains ? Object.keys(portfolioData.chains).length : 0}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-3 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: {portfolioData.lastUpdated ? new Date(parseInt(portfolioData.lastUpdated)).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chainTreemapData.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <CollateralTreemap data={chainTreemapData} title="By Chain" />
            </div>
          ) : null}

          {protocolTreemapData.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <CollateralTreemap data={protocolTreemapData} title="By Protocol" />
            </div>
          ) : null}

          {txs.transactions.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:col-span-2">
              <TransactionBubbleChart transactions={txs.transactions} title="Last 7 days transaction activity" />
            </div>
          ) : null}

          {txs.transactions.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:col-span-2">
              <TransactionsTable transactions={txs.transactions} title="Rebalance Log" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
