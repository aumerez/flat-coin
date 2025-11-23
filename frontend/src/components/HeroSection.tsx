export default function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-meridian-light-gray to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-meridian-navy mb-6 font-montserrat">
            The Inflation-Proof Institutional Asset for Global Markets
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-open-sans">
            Institutional-grade DeFi with regulatory compliance — designed for banks, treasuries, and fintechs with real-time transparency.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-meridian-gold text-meridian-navy rounded-lg hover:bg-meridian-gold-dark transition-colors font-montserrat font-semibold">
              View Demo
            </button>
            <a
              href="/assets/meridian-whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-meridian-navy text-meridian-navy rounded-lg hover:bg-meridian-light-gray transition-colors font-montserrat font-medium inline-block"
            >
              Read Whitepaper
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
