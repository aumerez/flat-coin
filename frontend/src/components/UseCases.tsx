export default function UseCases() {
  const useCases = [
    "Bank treasury yield products",
    "Stable corporate reserves",
    "FX hedging in volatile markets",
    "Cross-border settlement",
    "DeFi liquidity backbone"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-accent mb-8 text-center">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:border-primary transition-colors"
            >
              <p className="text-gray-700 font-medium">{useCase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
