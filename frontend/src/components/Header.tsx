import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image
                src="/meridian-logo-compact.svg"
                alt="MERIDIAN Foundation"
                width={160}
                height={64}
                priority
                className="cursor-pointer"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-meridian-navy hover:text-meridian-gold transition-colors font-medium font-montserrat"
              >
                Home
              </Link>
              <Link
                href="/collateralization"
                className="text-meridian-navy hover:text-meridian-gold transition-colors font-medium font-montserrat"
              >
                Collateralization
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-meridian-gold text-meridian-navy rounded-lg hover:bg-meridian-gold-dark transition-colors font-montserrat font-semibold">
              Purchase
            </button>
            <button className="px-6 py-2 border-2 border-meridian-navy text-meridian-navy rounded-lg hover:bg-meridian-light-gray transition-colors font-montserrat font-medium">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
