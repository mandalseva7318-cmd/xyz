import imageCompression from 'browser-image-compression';
import { ImageFile, SliderSettings, SizeSettings } from '../types';

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getSavingsPercent(original: number, compressed: number): number {
  if (original === 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

export async function compressWithQuality(
  file: File,
  settings: SliderSettings,
  onProgress?: (p: number) => void
): Promise<File> {
  const quality = settings.quality / 100;

  // For very low quality settings, allow reducing resolution slightly
  const alwaysKeepResolution = settings.quality >= 40;

  const options = {
    maxSizeMB: file.size / (1024 * 1024), // don't exceed original
    initialQuality: quality,
    alwaysKeepResolution,
    useWebWorker: true,
    onProgress: (p: number) => {
      onProgress?.(p);
    },
  };

  const compressed = await imageCompression(file, options);

  // If the compressed file is larger than original (can happen with PNG→canvas),
  // return the original file
  if (compressed.size >= file.size) {
    return file;
  }

  return compressed;
}

export async function compressToTargetSize(
  file: File,
  settings: SizeSettings,
  onProgress?: (p: number) => void
): Promise<File> {
  const targetBytes =
    settings.targetUnit === 'MB'
      ? settings.targetSize * 1024 * 1024
      : settings.targetSize * 1024;

  const targetMB = targetBytes / (1024 * 1024);

  const options = {
    maxSizeMB: targetMB,
    useWebWorker: true,
    onProgress: (p: number) => {
      onProgress?.(p);
    },
  };

  const compressed = await imageCompression(file, options);
  return compressed;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export function validateFile(file: File): string | null {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];
  const maxSize = 25 * 1024 * 1024; // 25MB

  if (!allowedTypes.includes(file.type)) {
    return `"${file.name}" is not a supported format. Allowed: JPG, PNG, WEBP, GIF, BMP`;
  }

  if (file.size > maxSize) {
    return `"${file.name}" exceeds the 25MB limit.`;
  }

  return null;
}

export async function createImageFile(file: File): Promise<ImageFile> {
  const previewUrl = URL.createObjectURL(file);
  return {
    id: generateId(),
    file,
    previewUrl,
    originalSize: file.size,
    compressedSize: null,
    compressedFile: null,
    compressedUrl: null,
    status: 'idle',
    progress: 0,
  };
}
