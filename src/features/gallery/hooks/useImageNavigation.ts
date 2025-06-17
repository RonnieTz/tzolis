import { useState, useEffect, useCallback } from 'react';
import { GalleryGroup } from '../types';

interface UseImageNavigationProps {
  currentGroup: GalleryGroup | undefined;
}

export function useImageNavigation({ currentGroup }: UseImageNavigationProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const selectedImage =
    selectedImageIndex !== null && currentGroup
      ? currentGroup.images[selectedImageIndex]?.url
      : null;

  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null && currentGroup) {
      const newIndex =
        selectedImageIndex > 0
          ? selectedImageIndex - 1
          : currentGroup.images.length - 1;
      setSelectedImageIndex(newIndex);
    }
  }, [selectedImageIndex, currentGroup]);

  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null && currentGroup) {
      const newIndex =
        selectedImageIndex < currentGroup.images.length - 1
          ? selectedImageIndex + 1
          : 0;
      setSelectedImageIndex(newIndex);
    }
  }, [selectedImageIndex, currentGroup]);

  const closeModal = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case 'Escape':
          event.preventDefault();
          closeModal();
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, goToPrevious, goToNext, closeModal]);

  return {
    selectedImageIndex,
    selectedImage,
    setSelectedImageIndex,
    goToPrevious,
    goToNext,
    closeModal,
  };
}
