import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Destination", href: "/" },
  { label: "Stays", href: "", comingSoon: true },
  { label: "Car Rental", href: "", comingSoon: true },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-footer.png"
            alt="TripNexa — Try the next-gen way of traveling"
            width={180}
            height={96}
            className="h-auto w-[180px]"
            priority
          />
        </Link>

        {/* Navigation Links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.comingSoon ? (
                <div className="group relative">
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-[#28536B]"
                    aria-label={`${link.label} coming soon`}
                  >
                    {link.label}
                  </button>
                  <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-[8px] bg-[#0A1E2A] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100">
                    Coming soon
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-[#28536B] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button — hidden on mobile */}
        <Link
          href="/contact"
          className="hidden md:inline-block bg-[#28536B] text-white px-6 py-2.5 rounded-[8px] text-sm font-semibold hover:bg-[#1e3f52] transition-colors duration-200"
        >
          Plan a Trip
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#28536B] p-2"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
