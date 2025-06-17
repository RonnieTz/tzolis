import { useState, useRef } from 'react';

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return `File "${file.name}" is too large. Maximum size is 10MB.`;
    }

    // Check file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/heic',
      'image/heif',
    ];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return `File "${file.name}" is not a supported image format. Supported formats: JPEG, PNG, WebP, HEIC.`;
    }

    // Check for empty file
    if (file.size === 0) {
      return `File "${file.name}" is empty.`;
    }

    return null;
  };

  const uploadFiles = async (
    files: FileList,
    selectedGroup: string,
    onSuccess?: () => void
  ) => {
    if (!selectedGroup || !files) return;

    const filesArray = Array.from(files);

    // Validate all files first
    const validationErrors: string[] = [];
    const validFiles: File[] = [];

    for (const file of filesArray) {
      const error = validateFile(file);
      if (error) {
        validationErrors.push(error);
      } else {
        validFiles.push(file);
      }
    }

    // Show validation errors if any
    if (validationErrors.length > 0) {
      alert('Upload validation errors:\n\n' + validationErrors.join('\n'));
      if (validFiles.length === 0) {
        return; // No valid files to upload
      }
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadingFiles(validFiles.map((f) => f.name));

    try {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      // Add valid files to form data
      validFiles.forEach((file) => formData.append('files', file));

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      // Promise wrapper for XMLHttpRequest with better error handling
      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.error) {
                reject(new Error(response.error));
              } else {
                // Show warnings if any files had issues
                if (response.warnings && response.warnings.length > 0) {
                  const warningMessage = `Upload completed with warnings:\n\n${response.warnings.join(
                    '\n'
                  )}\n\nSuccessfully uploaded: ${response.uploadedCount}/${
                    response.totalCount
                  } files.`;
                  setTimeout(() => alert(warningMessage), 100);
                }
                resolve();
              }
            } catch {
              resolve(); // Assume success if we can't parse response but status is OK
            }
          } else {
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              reject(
                new Error(
                  errorResponse.error ||
                    `Upload failed with status ${xhr.status}`
                )
              );
            } catch {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error during upload'));
        };

        xhr.ontimeout = () => {
          reject(new Error('Upload timed out'));
        };
      });

      // Set timeout for mobile connections
      xhr.timeout = 300000; // 5 minutes timeout
      xhr.open('POST', `/api/gallery/groups/${selectedGroup}`);

      // Add headers for better mobile compatibility
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      xhr.send(formData);

      await uploadPromise;
      onSuccess?.();
    } catch (error) {
      console.error('Error uploading files:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown upload error';
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadingFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedGroup: string,
    onSuccess?: () => void
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadFiles(event.target.files, selectedGroup, onSuccess);
    }
  };

  const deleteImage = async (
    groupId: string,
    filename: string,
    onSuccess?: () => void
  ) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/gallery/groups/${groupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });

      if (response.ok) {
        onSuccess?.();
      } else {
        const error = await response.json();
        alert(`Error deleting image: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  return {
    uploading,
    uploadProgress,
    uploadingFiles,
    fileInputRef,
    handleFileUpload,
    deleteImage,
  };
}
