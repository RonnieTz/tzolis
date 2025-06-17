import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { GalleryGroup } from '../types';

interface AdminImageModalProps {
  selectedImage: string | null;
  selectedImageIndex: number | null;
  currentGroup: GalleryGroup | undefined;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onDeleteImage: (groupId: string, filename: string) => void;
}

export default function AdminImageModal({
  selectedImage,
  selectedImageIndex,
  currentGroup,
  onClose,
  onPrevious,
  onNext,
  onDeleteImage,
}: AdminImageModalProps) {
  if (!selectedImage || selectedImageIndex === null || !currentGroup) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDeleteInModal = () => {
    if (currentGroup && selectedImageIndex !== null) {
      const image = currentGroup.images[selectedImageIndex];
      onDeleteImage(currentGroup._id, image.filename);
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        style={{
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.1)', // Slightly scale to avoid blur edge artifacts
        }}
      />

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative max-w-5xl max-h-full flex items-center justify-center w-full z-10">
        {/* Previous Button */}
        {currentGroup.images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all backdrop-blur-sm"
            title="Previous image (←)"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Image */}
        <motion.img
          key={selectedImageIndex}
          src={selectedImage}
          alt={`Gallery image ${selectedImageIndex + 1}`}
          className="object-contain max-h-[85vh] max-w-full shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Next Button */}
        {currentGroup.images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all backdrop-blur-sm"
            title="Next image (→)"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all backdrop-blur-sm"
          title="Close (Esc)"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Delete Button in Modal */}
        <button
          onClick={handleDeleteInModal}
          className="absolute top-4 left-4 text-white bg-red-500 bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all backdrop-blur-sm"
          title="Delete image"
        >
          <Trash2 size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-sm">
            {selectedImageIndex + 1} / {currentGroup.images.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
