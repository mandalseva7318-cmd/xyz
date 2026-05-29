import { useState, useCallback, useRef } from 'react';
import { ImageFile, CompressionSettings } from '../types';
import {
  createImageFile,
  validateFile,
  compressWithQuality,
  compressToTargetSize,
} from '../utils/compression';

const MAX_IMAGES = 25;

export function useCompression() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const abortRef = useRef<boolean>(false);

  const addFiles = useCallback(async (files: File[]) => {
    setErrors([]);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    for (const file of files) {
      const err = validateFile(file);
      if (err) {
        newErrors.push(err);
      } else {
        validFiles.push(file);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }

    if (validFiles.length === 0) return;

    // Check how many slots remaining
    const imageFiles = await Promise.all(
      validFiles.map(f => createImageFile(f))
    );

    setImages(prev => {
      const remaining = MAX_IMAGES - prev.length;
      const toAdd = imageFiles.slice(0, remaining);
      if (remaining < imageFiles.length) {
        setErrors(e => [...e, `Only ${remaining} more image(s) can be added (max ${MAX_IMAGES}).`]);
      }
      return [...prev, ...toAdd];
    });
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.previewUrl);
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  }, []);

  const deleteAll = useCallback(() => {
    setImages(prev => {
      prev.forEach(img => {
        URL.revokeObjectURL(img.previewUrl);
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
      });
      return [];
    });
    setErrors([]);
  }, []);

  const compressAll = useCallback(async (settings: CompressionSettings) => {
    setIsCompressing(true);
    abortRef.current = false;

    // Get a snapshot of images and reset non-done ones to idle
    let snapshot: ImageFile[] = [];
    setImages(prev => {
      const updated = prev.map(img => ({
        ...img,
        status: (img.status === 'done' ? 'done' : 'idle') as ImageFile['status'],
      }));
      snapshot = updated;
      return updated;
    });

    // Small delay to allow state to flush
    await new Promise(res => setTimeout(res, 10));

    for (const img of snapshot) {
      if (abortRef.current) break;
      if (img.status === 'done') continue;

      // Set to compressing
      setImages(prev =>
        prev.map(i =>
          i.id === img.id ? { ...i, status: 'compressing', progress: 0 } : i
        )
      );

      try {
        const onProgress = (p: number) => {
          setImages(prev =>
            prev.map(i => (i.id === img.id ? { ...i, progress: p } : i))
          );
        };

        let compressedFile: File;

        if (settings.mode === 'slider') {
          compressedFile = await compressWithQuality(img.file, settings.slider, onProgress);
        } else {
          compressedFile = await compressToTargetSize(img.file, settings.size, onProgress);
        }

        const compressedUrl = URL.createObjectURL(compressedFile);

        setImages(prev =>
          prev.map(i =>
            i.id === img.id
              ? {
                  ...i,
                  status: 'done',
                  progress: 100,
                  compressedFile,
                  compressedSize: compressedFile.size,
                  compressedUrl,
                }
              : i
          )
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Compression failed';
        setImages(prev =>
          prev.map(i =>
            i.id === img.id
              ? { ...i, status: 'error', error: message, progress: 0 }
              : i
          )
        );
      }
    }

    setIsCompressing(false);
  }, []);

  const dismissErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    images,
    isCompressing,
    errors,
    addFiles,
    removeImage,
    deleteAll,
    compressAll,
    dismissErrors,
  };
}
