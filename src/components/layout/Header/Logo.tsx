import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function Logo() {
  const { t } = useTranslation();

  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <Image
          src="/logo.jpg"
          alt="Tzolis Welding Logo"
          width={50}
          height={50}
          className="rounded-full relative z-10 ring-2 ring-transparent group-hover:ring-orange-400/50 transition-all duration-300"
        />
      </motion.div>
      <motion.div
        className="hidden sm:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
          {t('nav.logo.title')}
        </h1>
        <p className="text-xs text-gray-400">{t('nav.logo.subtitle')}</p>
      </motion.div>
    </Link>
  );
}
