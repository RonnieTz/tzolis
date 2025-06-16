'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Settings } from 'lucide-react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if admin is logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.user?.role === 'admin');
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      }
    };

    checkAuthStatus();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'gr' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'gallery', href: '/gallery' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.jpg"
              alt="Tzolis Welding Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="hover:text-orange-400 transition-colors"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}

            {/* Admin Button - Desktop */}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-md transition-colors"
              >
                <Settings size={16} />
                <span>Admin</span>
              </Link>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 hover:text-orange-400 transition-colors"
            >
              <Globe size={20} />
              <span>{i18n.language === 'en' ? 'GR' : 'EN'}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="hover:text-orange-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}

              {/* Admin Button - Mobile */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-md transition-colors w-fit"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={16} />
                  <span>Admin</span>
                </Link>
              )}

              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 hover:text-orange-400 transition-colors w-fit"
              >
                <Globe size={20} />
                <span>{i18n.language === 'en' ? 'Greek' : 'English'}</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
