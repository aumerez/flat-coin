export default function WhyItMatters() {
  const benefits = [
    "A stable inflation-protected asset",
    "Real-time collateral visibility (Octav)",
    "Cross-chain mobility (LayerZero)",
    "Institutional governance",
    "Access to low-risk DeFi yield"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Why It Matters</h2>
        <p className="text-lg text-gray-600 mb-6">
          Emerging markets need a reliable unit of value.
        </p>
        <p className="text-gray-600 mb-4">
          Latin America faces chronic inflation and unstable FX regimes.
          Banks hold billions in crypto but can't use DeFi safely.
        </p>
        <p className="text-gray-600 mb-6 font-medium">Flatcoin gives them:</p>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
