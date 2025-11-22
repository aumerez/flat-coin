export default function Features() {
  const features = [
    {
      title: "Omnichain by Default",
      description: "Mint once, move everywhere."
    },
    {
      title: "DeFi Yield for Institutions",
      description: "Access low-risk strategies with built-in compliance."
    },
    {
      title: "Transparent by Design",
      description: "Every asset, every strategy, every movement — live on-chain."
    },
    {
      title: "Governance You Can Trust",
      description: "Banks, treasuries, and regulated entities shape policy."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
