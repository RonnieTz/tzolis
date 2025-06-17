import Link from 'next/link';
import { motion } from 'framer-motion';
import { Settings, Globe, ChevronDown } from 'lucide-react';
import { navItems } from './constants';

interface DesktopNavigationProps {
  isAdmin: boolean;
  t: (key: string) => string;
  i18n: {
    language: string;
  };
  onToggleLanguage: () => void;
}

export function DesktopNavigation({
  isAdmin,
  t,
  i18n,
  onToggleLanguage,
}: DesktopNavigationProps) {
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navItems.map((item, index) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <Link
            href={item.href}
            className="relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 group rounded-lg hover:bg-white/5"
          >
            <span className="relative z-10">{t(`nav.${item.key}`)}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-3/4 transition-all duration-300"></div>
          </Link>
        </motion.div>
      ))}

      {/* Admin Button */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/admin"
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
          >
            <Settings size={16} />
            <span>Admin</span>
          </Link>
        </motion.div>
      )}

      {/* Language Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <button
          onClick={onToggleLanguage}
          className="flex items-center space-x-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group"
        >
          <Globe
            size={18}
            className="group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-medium">
            {i18n.language === 'en' ? 'GR' : 'EN'}
          </span>
          <ChevronDown
            size={14}
            className="group-hover:rotate-180 transition-transform duration-300"
          />
        </button>
      </motion.div>
    </nav>
  );
}
