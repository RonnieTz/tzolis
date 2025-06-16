import { useState, useRef } from 'react';

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (
    files: FileList,
    selectedGroup: string,
    onSuccess?: () => void
  ) => {
    if (!selectedGroup || !files) return;

    const filesArray = Array.from(files);
    setUploading(true);
    setUploadProgress(0);
    setUploadingFiles(filesArray.map((f) => f.name));

    try {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      filesArray.forEach((file) => formData.append('files', file));

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      // Promise wrapper for XMLHttpRequest
      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error('Upload failed'));
          }
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
      });

      xhr.open('POST', `/api/gallery/groups/${selectedGroup}`);
      xhr.send(formData);

      await uploadPromise;
      onSuccess?.();
    } catch (error) {
      console.error('Error uploading files:', error);
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
    if (event.target.files) {
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
