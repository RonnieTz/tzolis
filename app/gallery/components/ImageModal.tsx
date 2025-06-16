import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useState } from 'react';
import { GalleryGroup } from '../types';

interface ImageModalProps {
  selectedImage: string | null;
  selectedImageIndex: number | null;
  currentGroup: GalleryGroup | undefined;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}

export function ImageModal({
  selectedImage,
  selectedImageIndex,
  currentGroup,
  onPrevious,
  onNext,
  onClose,
}: ImageModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!selectedImage || selectedImageIndex === null || !currentGroup)
    return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Gallery Image',
          url: selectedImage,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `gallery-image-${selectedImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        {/* Enhanced Background with Blur */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative max-w-7xl max-h-full flex items-center justify-center w-full z-10">
          {/* Navigation Buttons */}
          {currentGroup.images.length > 1 && (
            <>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/30 backdrop-blur-sm rounded-full p-4 hover:bg-black/50 transition-all duration-300 group"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                title="Previous image (←)"
              >
                <ChevronLeft
                  size={28}
                  className="group-hover:scale-110 transition-transform"
                />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/30 backdrop-blur-sm rounded-full p-4 hover:bg-black/50 transition-all duration-300 group"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                title="Next image (→)"
              >
                <ChevronRight
                  size={28}
                  className="group-hover:scale-110 transition-transform"
                />
              </motion.button>
            </>
          )}

          {/* Main Image Container */}
          <motion.div
            className="relative max-h-[85vh] max-w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.img
              key={selectedImageIndex}
              src={selectedImage}
              alt={`Gallery image ${selectedImageIndex + 1}`}
              className={`object-contain max-h-[85vh] max-w-full shadow-2xl rounded-lg cursor-pointer transition-all duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
              }}
            />
          </motion.div>

          {/* Top Control Bar */}
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-black/30 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center gap-4">
              {/* Action Buttons */}
              <motion.button
                onClick={handleDownload}
                className="text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Download image"
              >
                <Download size={20} />
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Share image"
              >
                <Share2 size={20} />
              </motion.button>

              <motion.button
                onClick={() => setIsZoomed(!isZoomed)}
                className="text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </motion.button>

              <div className="w-px h-6 bg-white/30" />

              <motion.button
                onClick={onClose}
                className="text-white p-2 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                title="Close (Esc)"
              >
                <X size={20} />
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom Info Bar */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-black/30 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center gap-6">
              {/* Image Counter */}
              <div className="text-white text-sm font-medium">
                <span className="text-lg">{selectedImageIndex + 1}</span>
                <span className="text-white/60 mx-2">of</span>
                <span className="text-white/80">
                  {currentGroup.images.length}
                </span>
              </div>

              <div className="w-px h-4 bg-white/30" />

              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-xs">Progress</span>
                <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((selectedImageIndex + 1) /
                          currentGroup.images.length) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Keyboard Hints */}
          <motion.div
            className="absolute bottom-4 right-4 z-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                  ←
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                  →
                </kbd>
                <span>Navigate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
