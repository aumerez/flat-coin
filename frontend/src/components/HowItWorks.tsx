export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Inflation-Protected Peg",
      description: "Anchored to a transparent inflation index, updated periodically."
    },
    {
      number: "2",
      title: "Overcollateralized Backing",
      description: "Secured by a diversified collateral pool deployed in audited DeFi protocols."
    },
    {
      number: "3",
      title: "Omnichain Liquidity",
      description: "Built on the LayerZero OFT standard — mint, move, and redeem across any chain."
    },
    {
      number: "4",
      title: "Continuous Audit",
      description: "Powered by Octav's real-time protocol analytics."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-accent mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-accent mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
