import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderState } from './types';

export function useHeader() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'gr' : 'en';
    i18n.changeLanguage(newLang);
  };

  const state: HeaderState = {
    isMenuOpen,
    isAdmin,
    isScrolled,
  };

  const actions = {
    setIsMenuOpen,
    toggleLanguage,
    t,
    i18n,
  };

  return { state, actions };
}
