'use client';

import { motion } from 'framer-motion';
import { useHeader } from './Header/useHeader';
import { headerVariants } from './Header/constants';
import { Logo } from './Header/Logo';
import { DesktopNavigation } from './Header/DesktopNavigation';
import { MobileMenuButton } from './Header/MobileMenuButton';
import { MobileMenu } from './Header/MobileMenu';

export default function Header() {
  const { state, actions } = useHeader();
  const { isMenuOpen, isAdmin, isScrolled } = state;
  const { setIsMenuOpen, toggleLanguage, t, i18n } = actions;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl shadow-black/20 border-b border-white/10'
          : 'bg-transparent'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Logo />

          <DesktopNavigation
            isAdmin={isAdmin}
            t={t}
            i18n={i18n}
            onToggleLanguage={toggleLanguage}
          />

          <MobileMenuButton
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <MobileMenu
          isMenuOpen={isMenuOpen}
          isAdmin={isAdmin}
          t={t}
          i18n={i18n}
          onToggleLanguage={toggleLanguage}
          onCloseMenu={() => setIsMenuOpen(false)}
        />
      </div>
    </motion.header>
  );
}
