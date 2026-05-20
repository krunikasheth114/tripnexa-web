"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { fetchNavDestinations, NavDestination } from "@/services/destinations";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/slices/authSlice";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Hotels", href: "/hotels" },
  { label: "Car Rentals", href: "/car-rentals" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [destinations, setDestinations] = useState<NavDestination[]>([]);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNavDestinations().then(setDestinations);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 group">
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Trip
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent tracking-tight">
            Nexa
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.label === "Destinations" ? (
              <li key={link.label} className="relative">
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href)
                        ? "text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-lg transition-colors inline-block"
                        : "text-sm font-medium text-gray-600 px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors inline-block"
                    }
                  >
                    {link.label}
                  </Link>

                  {dropdownOpen && destinations.length > 0 && (
                    <div className="absolute left-0 top-full pt-2 w-56 z-50">
                      <div className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                        <Link
                          href="/destinations"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors border-b border-gray-100"
                        >
                          All Destinations
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                        <div className="max-h-64 overflow-y-auto py-1">
                          {destinations.map((dest) => (
                            <Link
                              key={dest.id}
                              href={`/destinations/${dest.id}`}
                              onClick={() => setDropdownOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                            >
                              {dest.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={
                    isActive(link.href)
                      ? "text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-lg transition-colors"
                      : "text-sm font-medium text-gray-600 px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  }
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA / User Avatar */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-sm"
          >
            Plan a Trip
          </Link>

          {isAuthenticated && user && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 group focus:outline-none"
                aria-label="User menu"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-white group-hover:ring-orange-200 transition-all">
                  {getInitials(user.name)}
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { dispatch(logout()); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1 shadow-lg">
          {navLinks.map((link) =>
            link.label === "Destinations" ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileDestOpen((prev) => !prev)}
                  className={
                    isActive(link.href)
                      ? "w-full text-left text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-3 rounded-lg transition-colors flex items-center justify-between"
                      : "w-full text-left text-sm font-medium text-gray-600 px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  }
                >
                  {link.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-4 h-4 transition-transform ${mobileDestOpen ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {mobileDestOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5">
                    <Link
                      href="/destinations"
                      onClick={() => { setMobileOpen(false); setMobileDestOpen(false); }}
                      className="text-sm font-semibold text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      All Destinations
                    </Link>
                    {destinations.map((dest) => (
                      <Link
                        key={dest.id}
                        href={`/destinations/${dest.id}`}
                        onClick={() => { setMobileOpen(false); setMobileDestOpen(false); }}
                        className="text-sm text-gray-600 px-4 py-2 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      >
                        {dest.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={
                  isActive(link.href)
                    ? "text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-3 rounded-lg transition-colors"
                    : "text-sm font-medium text-gray-600 px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors"
                }
              >
                {link.label}
              </Link>
            )
          )}
          {isAuthenticated && user ? (
            <div className="mt-3 border-t border-gray-100 pt-3">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => { dispatch(logout()); setMobileOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-3 mt-1 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 bg-orange-500 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors text-center"
            >
              Plan a Trip
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
