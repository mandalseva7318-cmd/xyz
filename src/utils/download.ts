import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ImageFile } from '../types';

export function downloadSingle(imageFile: ImageFile): void {
  if (!imageFile.compressedFile || !imageFile.compressedUrl) return;

  const ext = imageFile.file.name.split('.').pop() || 'jpg';
  const baseName = imageFile.file.name.replace(/\.[^/.]+$/, '');
  const fileName = `${baseName}_compressed.${ext}`;

  saveAs(imageFile.compressedFile, fileName);
}

export async function downloadAllAsZip(images: ImageFile[]): Promise<void> {
  const completed = images.filter(img => img.status === 'done' && img.compressedFile);
  if (completed.length === 0) return;

  const zip = new JSZip();
  const folder = zip.folder('compressed_images');

  for (const img of completed) {
    if (!img.compressedFile) continue;
    const ext = img.file.name.split('.').pop() || 'jpg';
    const baseName = img.file.name.replace(/\.[^/.]+$/, '');
    const fileName = `${baseName}_compressed.${ext}`;
    const arrayBuffer = await img.compressedFile.arrayBuffer();
    folder?.file(fileName, arrayBuffer);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'compresspro_compressed.zip');
}
