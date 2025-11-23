import Link from "next/link";

export default function CollateralizationCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-ar-blue to-ar-dark-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            100% Transparent Collateralization
          </h2>
          <p className="text-ar-light-blue text-lg mb-8 max-w-2xl mx-auto">
            See exactly what backs every Bankl Stable token. Real-time data on collateral composition,
            protocols, chains, and rebalancing activities.
          </p>
          <Link
            href="/collateralization"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ar-blue font-semibold rounded-lg hover:bg-ar-light-blue transition-colors"
          >
            View Live Collateral Composition
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
