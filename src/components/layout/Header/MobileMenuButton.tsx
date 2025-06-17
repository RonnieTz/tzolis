import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function MobileMenuButton({
  isMenuOpen,
  onToggleMenu,
}: MobileMenuButtonProps) {
  return (
    <motion.button
      onClick={onToggleMenu}
      className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isMenuOpen ? 'close' : 'menu'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
