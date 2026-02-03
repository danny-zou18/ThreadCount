import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Upload } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'tops',
    colors: [] as string[],
    season: [] as string[],
    tags: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onAdd({
      ...formData,
      imageUrl: imagePreview || 'https://via.placeholder.com/400',
      id: Math.random().toString(36).substr(2, 9),
      usageCount: 0,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    onClose();
    setStep(1);
    setImagePreview(null);
    setFormData({ name: '', category: 'tops', colors: [], season: [], tags: '' });
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
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Item" size="lg">
      <div className="p-6">
        {step === 1 ? (
          <div>
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-[var(--border)] rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--accent)] transition-colors"
            >
              <Upload size={48} className="text-[var(--secondary)] mb-4" />
              <p className="font-medium mb-1">Drag and drop or click to upload</p>
              <p className="text-sm text-[var(--secondary)]">PNG, JPG up to 10MB</p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Preview */}
            <div>
              <p className="text-sm font-medium mb-2">Preview</p>
              {imagePreview && (
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <button
                onClick={() => setStep(1)}
                className="text-sm text-[var(--accent)] mt-2 hover:underline"
              >
                Change Image
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. White Cotton T-Shirt"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
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

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border)]">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          {step === 2 && (
            <Button onClick={handleSubmit} className="flex-1">
              Add to Wardrobe
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
