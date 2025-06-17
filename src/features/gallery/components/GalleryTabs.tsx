import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Create a local type based on what the component expects
interface GalleryGroup {
  _id: string;
  name: string;
  nameGr: string;
  images: Array<{
    url: string;
    filename: string;
    uploadedAt: Date;
  }>;
}

interface GalleryTabsProps {
  groups: GalleryGroup[];
  selectedGroup: string | null;
  onGroupSelect: (groupId: string) => void;
}

export function GalleryTabs({
  groups,
  selectedGroup,
  onGroupSelect,
}: GalleryTabsProps) {
  const { i18n } = useTranslation();

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-3">
        {groups.map((group, index) => (
          <motion.button
            key={group._id}
            onClick={() => onGroupSelect(group._id)}
            className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedGroup === group._id
                ? 'text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-700 bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-md border border-gray-200/50'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background gradient for active tab */}
            {selectedGroup === group._id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl"
                layoutId="activeTab"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Tab content */}
            <span className="relative z-10 flex items-center gap-2">
              {/* Icon indicator */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedGroup === group._id
                    ? 'bg-white'
                    : 'bg-gradient-to-r from-blue-400 to-purple-400'
                }`}
              />

              {i18n.language === 'gr' ? group.nameGr : group.name}

              {/* Image count badge */}
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full transition-all duration-300 ${
                  selectedGroup === group._id
                    ? 'bg-white/20 text-white'
                    : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
                }`}
              >
                {group.images.length}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Decorative line */}
      <div className="flex justify-center mt-8">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
    </div>
  );
}
