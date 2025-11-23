export default function WhyItMatters() {
  const benefits = [
    "A stable inflation-protected asset",
    "Real-time collateral visibility (Octav)",
    "Cross-chain mobility (LayerZero)",
    "Institutional governance",
    "Access to low-risk DeFi yield"
  ];

  return (
    <section className="py-16 bg-meridian-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-meridian-navy mb-4 font-montserrat">Why It Matters</h2>
        <p className="text-lg text-gray-600 mb-6 font-open-sans">
          Global markets need a reliable unit of value with institutional-grade security.
        </p>
        <p className="text-gray-600 mb-4 font-open-sans">
          Markets face chronic inflation and unstable FX regimes.
          Institutions hold billions in crypto but require regulatory compliance and transparency.
        </p>
        <p className="text-meridian-navy mb-6 font-semibold font-montserrat">MERIDIAN provides:</p>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-meridian-gold text-xl font-bold">✓</span>
              <span className="text-gray-700 font-open-sans">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
