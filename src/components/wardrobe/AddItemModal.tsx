import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Upload, Camera, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { processGarmentImage, formatFileSize, getCompressionRatio } from '../../utils/imageProcessing';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<'upload' | 'removing-bg' | 'compressing' | 'complete'>('upload');
  const [error, setError] = useState<string | null>(null);
  const [fileSizes, setFileSizes] = useState<{ original: number; final: number } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'tops',
    colors: [] as string[],
    season: [] as string[],
    tags: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB. Please choose a smaller image.');
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProcessingStage('upload');

    try {
      // Read original image for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Process image: remove background and compress
      setProcessingStage('removing-bg');
      const { dataUrl, originalSize, finalSize } = await processGarmentImage(file);
      
      setProcessedImage(dataUrl);
      setFileSizes({ original: originalSize, final: finalSize });
      setProcessingStage('complete');
      setIsProcessing(false);
      setStep(2);
    } catch (err) {
      console.error('Image processing error:', err);
      setError('Failed to process image. Please try another image or check your internet connection.');
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      setError('Please enter a name for the item');
      return;
    }
    
    if (!processedImage && !originalImage) {
      setError('Please upload an image');
      return;
    }

    onAdd({
      ...formData,
      imageUrl: processedImage || originalImage || 'https://via.placeholder.com/400',
      id: Math.random().toString(36).substr(2, 9),
      usageCount: 0,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    handleClose();
  };

  const handleClose = () => {
    onClose();
    // Reset state after modal close animation
    setTimeout(() => {
      setStep(1);
      setOriginalImage(null);
      setProcessedImage(null);
      setIsProcessing(false);
      setProcessingStage('upload');
      setError(null);
      setFileSizes(null);
      setFormData({ name: '', category: 'tops', colors: [], season: [], tags: '' });
    }, 300);
  };

  const colorOptions = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Gray', value: 'gray', hex: '#6B7280' },
    { name: 'Red', value: 'red', hex: '#EF4444' },
    { name: 'Blue', value: 'blue', hex: '#3B82F6' },
    { name: 'Green', value: 'green', hex: '#10B981' },
    { name: 'Beige', value: 'beige', hex: '#C9A87C' },
  ];

  const seasons = ['spring', 'summer', 'fall', 'winter'];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Item" size="lg">
      <div className="p-6">
        {step === 1 ? (
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Camera className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Photo Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Lay garment flat on a solid-colored surface</li>
                    <li>• Take photo from directly above (bird's eye view)</li>
                    <li>• Ensure good lighting with minimal shadows</li>
                    <li>• Fill the frame with the garment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <label
              htmlFor="file-upload"
              className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isProcessing 
                  ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
                  : 'border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5'
              }`}
            >
              {isProcessing ? (
                <div className="text-center">
                  <Loader2 size={48} className="text-[var(--accent)] mb-4 animate-spin mx-auto" />
                  <p className="font-medium mb-2">Processing your image...</p>
                  <p className="text-sm text-[var(--secondary)]">
                    {processingStage === 'removing-bg' && 'Removing background...'}
                    {processingStage === 'compressing' && 'Optimizing image size...'}
                    {processingStage === 'upload' && 'Uploading...'}
                  </p>
                </div>
              ) : (
                <>
                  <Upload size={48} className="text-[var(--secondary)] mb-4" />
                  <p className="font-medium mb-1">Drag and drop or click to upload</p>
                  <p className="text-sm text-[var(--secondary)]">PNG, JPG up to 10MB</p>
                </>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isProcessing}
              />
            </label>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Preview</p>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-xs font-medium">Background Removed</span>
                </div>
              </div>
              {processedImage && (
                <div className="space-y-3">
                  {/* Processed Image with Checkered Background */}
                  <div 
                    className="aspect-square rounded-lg overflow-hidden relative"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  >
                    <img 
                      src={processedImage} 
                      alt="Processed Preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* File Size Info */}
                  {fileSizes && (
                    <div className="text-xs space-y-1">
                      <div className="bg-green-50 border border-green-200 rounded p-2">
                        <p className="font-medium text-green-900 mb-1">✓ Processing Complete</p>
                        <div className="space-y-0.5 text-green-700">
                          <p>• Background removed</p>
                          <p>• Original size: {formatFileSize(fileSizes.original)}</p>
                          <p>• Optimized size: {formatFileSize(fileSizes.final)}</p>
                          <p className="font-medium">• Reduced by {getCompressionRatio(fileSizes.original, fileSizes.final)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => {
                  setStep(1);
                  setOriginalImage(null);
                  setProcessedImage(null);
                  setError(null);
                }}
                className="text-sm text-[var(--accent)] mt-2 hover:underline"
              >
                Change Image
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (error && e.target.value.trim()) {
                      setError(null);
                    }
                  }}
                  placeholder="e.g. White Cotton T-Shirt"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                >
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="dresses">Dresses</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Colors</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        const newColors = formData.colors.includes(color.value)
                          ? formData.colors.filter(c => c !== color.value)
                          : [...formData.colors, color.value];
                        setFormData({ ...formData, colors: newColors });
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.colors.includes(color.value)
                          ? 'border-[var(--accent)] scale-110'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Season</label>
                <div className="flex flex-wrap gap-2">
                  {seasons.map((season) => (
                    <button
                      key={season}
                      onClick={() => {
                        const newSeasons = formData.season.includes(season)
                          ? formData.season.filter(s => s !== season)
                          : [...formData.season, season];
                        setFormData({ ...formData, season: newSeasons });
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        formData.season.includes(season)
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-gray-100 text-[var(--secondary)]'
                      }`}
                    >
                      {season.charAt(0).toUpperCase() + season.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="casual, basic, comfortable"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Error Display (Step 2) */}
        {step === 2 && error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="text-red-600 flex-shrink-0" size={18} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border)]">
          <Button variant="ghost" onClick={handleClose} className="flex-1" disabled={isProcessing}>
            Cancel
          </Button>
          {step === 2 && (
            <Button 
              onClick={handleSubmit} 
              className="flex-1" 
              disabled={(!processedImage && !originalImage) || !formData.name.trim()}
            >
              Add to Wardrobe
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
