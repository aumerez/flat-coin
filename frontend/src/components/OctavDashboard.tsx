import { getPortfolioData } from "@/app/actions";
import CollateralTreemap from "./CollateralTreemap";
import { OctavChain, OctavProtocol } from "@/src/types/octav";

interface TreemapData {
  name: string;
  size?: number;
  children?: TreemapData[];
  [key: string]: unknown;
}

export default async function OctavDashboard() {
  const DEFAULT_ADDRESS = "0x70709614bf9ad5bbab18e2244046d48f234a1583";

  let rawData;
  let error = null;
  try {
    rawData = await getPortfolioData(DEFAULT_ADDRESS);
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Net Worth</p>
                <p className="text-2xl font-bold text-accent">
                  ${portfolioData.networth ? parseFloat(portfolioData.networth).toLocaleString() : '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Protocols</p>
                <p className="text-2xl font-bold text-accent">
                  {portfolioData.assetByProtocols ? Object.keys(portfolioData.assetByProtocols).length : 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Chains</p>
                <p className="text-2xl font-bold text-accent">
                  {portfolioData.chains ? Object.keys(portfolioData.chains).length : 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-sm font-medium text-accent">
                  {portfolioData.lastUpdated ? new Date(parseInt(portfolioData.lastUpdated)).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chainTreemapData.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">By Chain</h3>
              <CollateralTreemap data={chainTreemapData} />
            </div>
          ) : null}

          {protocolTreemapData.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">By Protocol</h3>
              <CollateralTreemap data={protocolTreemapData} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
