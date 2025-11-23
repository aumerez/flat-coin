import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image
                src="/images/banlklLogo.png"
                alt="Bankl"
                width={120}
                height={40}
                priority
                className="cursor-pointer"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/collateralization"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Collateralization
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-ar-dark-blue transition-colors">
              Purchase
            </button>
            <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-ar-light-blue/10 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
