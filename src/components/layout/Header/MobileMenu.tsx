import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Globe } from 'lucide-react';
import { navItems, mobileMenuVariants, itemVariants } from './constants';

interface MobileMenuProps {
  isMenuOpen: boolean;
  isAdmin: boolean;
  t: (key: string) => string;
  i18n: {
    language: string;
  };
  onToggleLanguage: () => void;
  onCloseMenu: () => void;
}

export function MobileMenu({
  isMenuOpen,
  isAdmin,
  t,
  i18n,
  onToggleLanguage,
  onCloseMenu,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.nav
          className="md:hidden overflow-hidden"
          variants={mobileMenuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="py-4 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm rounded-b-xl mx-4 mb-4">
            <div className="flex flex-col space-y-2 px-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group"
                    onClick={onCloseMenu}
                  >
                    <span className="relative">
                      {t(`nav.${item.key}`)}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Admin Button - Mobile */}
              {isAdmin && (
                <motion.div
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Link
                    href="/admin"
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-4 py-3 rounded-lg transition-all duration-300 w-fit"
                    onClick={onCloseMenu}
                  >
                    <Settings size={16} />
                    <span>Admin</span>
                  </Link>
                </motion.div>
              )}

              {/* Language Toggle - Mobile */}
              <motion.div
                variants={itemVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: (navItems.length + 1) * 0.1 }}
              >
                <button
                  onClick={onToggleLanguage}
                  className="flex items-center space-x-2 py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 w-fit group"
                >
                  <Globe
                    size={18}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                  <span>{i18n.language === 'en' ? 'Greek' : 'English'}</span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
