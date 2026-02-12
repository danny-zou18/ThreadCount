/**
 * Image Processing Utilities
 * 
 * This module handles image processing for wardrobe items, including:
 * - Background removal
 * - Image compression and optimization
 * - Format conversion
 */

import imageCompression from 'browser-image-compression';
import { removeBackground } from '@imgly/background-removal';

// Configuration for image optimization
export const IMAGE_CONFIG = {
  // Maximum file size in MB (affects storage costs and load times)
  maxSizeMB: 0.5, // 500KB - good balance between quality and size
  
  // Maximum dimension (width or height) in pixels
  maxWidthOrHeight: 1024, // 1024px - sufficient for display in most contexts
  
  // Output format (PNG preserves transparency from background removal)
  fileType: 'image/png',
  
  // Background removal model size
  // Options: 'small' (fast, less accurate), 'medium' (balanced), 'large' (slow, most accurate)
  bgRemovalModel: 'medium' as const,
};

/**
 * Why file size matters:
 * 
 * 1. Storage Costs: Cloud storage (Firebase, S3, etc.) charges per GB stored
 *    - 1GB free tier on most services
 *    - $0.026/GB/month on Firebase
 *    - With 0.5MB per image, you can store ~2000 images in 1GB
 * 
 * 2. Bandwidth Costs: Data transfer when loading images
 *    - Firebase: $0.12/GB transferred
 *    - Smaller images = faster loading + lower costs
 * 
 * 3. User Experience:
 *    - Smaller files load faster
 *    - Better mobile experience
 *    - Reduced memory usage
 * 
 * 4. Performance:
 *    - Faster outfit builder rendering
 *    - Smoother scrolling in wardrobe view
 *    - Less browser memory consumption
 */

export interface ProcessImageOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  fileType?: string;
  bgRemovalModel?: 'small' | 'medium' | 'large';
}

/**
 * Process an image file: remove background and compress
 * @param file - The original image file
 * @param options - Optional configuration overrides
 * @returns Promise<string> - Data URL of the processed image
 */
export async function processGarmentImage(
  file: File,
  options: ProcessImageOptions = {}
): Promise<{ dataUrl: string; originalSize: number; finalSize: number }> {
  const config = { ...IMAGE_CONFIG, ...options };
  const originalSize = file.size;

  // Step 1: Remove background
  const imageBlob = await removeBackground(file, {
    model: config.bgRemovalModel,
  });

  // Step 2: Compress the image
  const compressedBlob = await imageCompression(imageBlob as File, {
    maxSizeMB: config.maxSizeMB,
    maxWidthOrHeight: config.maxWidthOrHeight,
    useWebWorker: true,
    fileType: config.fileType,
  });

  // Step 3: Convert to data URL for easy storage/display
  const dataUrl = await blobToDataURL(compressedBlob);
  const finalSize = compressedBlob.size;

  return { dataUrl, originalSize, finalSize };
}

/**
 * Convert Blob to Data URL
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Calculate compression ratio
 */
export function getCompressionRatio(originalSize: number, finalSize: number): string {
  const ratio = ((originalSize - finalSize) / originalSize) * 100;
  return ratio.toFixed(1) + '%';
}
