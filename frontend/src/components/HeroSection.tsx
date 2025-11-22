export default function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-ar-light-blue/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            The Inflation-Proof Institutional Asset for Emerging Markets
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A cross-chain Flatcoin designed for banks, treasuries, and fintechs — with real-time transparency and DeFi-native yield.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-ar-dark-blue transition-colors font-medium">
              View Demo
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-ar-light-blue/10 transition-colors font-medium">
              Read Whitepaper
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
