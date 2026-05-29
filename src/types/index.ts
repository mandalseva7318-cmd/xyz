export type CompressionMode = 'slider' | 'size';

export type CompressionStatus = 'idle' | 'compressing' | 'done' | 'error';

export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  originalSize: number;
  compressedSize: number | null;
  compressedFile: File | null;
  compressedUrl: string | null;
  status: CompressionStatus;
  progress: number;
  error?: string;
}

export interface SliderSettings {
  quality: number; // 1-100
}

export interface SizeSettings {
  targetSize: number;
  targetUnit: 'KB' | 'MB';
}

export interface CompressionSettings {
  mode: CompressionMode;
  slider: SliderSettings;
  size: SizeSettings;
}
