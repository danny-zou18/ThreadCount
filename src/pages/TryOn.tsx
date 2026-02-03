import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Upload, Camera, Sparkles, Download, Share2, RotateCcw } from 'lucide-react';
import { mockWardrobeItems, mockOutfits } from '../data/mockData';

export const TryOn: React.FC = () => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'outfits' | 'items'>('outfits');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setResultImage('https://images.unsplash.com/photo-1768599064940-611c34ef079a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwd29tYW4lMjBwb3J0cmFpdCUyMG5ldXRyYWwlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MDA3MjQ0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');
      setIsGenerating(false);
    }, 2000);
  };

  const handleStartOver = () => {
    setResultImage(null);
    setSelectedItems([]);
  };

  if (resultImage) {
    return (
      <div>
        <h1 className="mb-6">Virtual Try-On Result</h1>
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <img
              src={resultImage}
              alt="Try-on result"
              className="w-full aspect-[3/4] object-cover"
            />
          </Card>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button>
              <Download size={18} />
              Download
            </Button>
            <Button variant="ghost">
              <Share2 size={18} />
              Share
            </Button>
            <Button variant="ghost" onClick={handleStartOver}>
              <RotateCcw size={18} />
              Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6">Virtual Try-On Studio</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel - User Photo */}
        <div>
          <Card className="p-6">
            <h3 className="mb-4">Your Photo</h3>
            
            {!userPhoto ? (
              <label
                htmlFor="photo-upload"
                className="border-2 border-dashed border-[var(--border)] rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--accent)] transition-colors min-h-[500px]"
              >
                <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mb-4">
                  <Camera size={40} className="text-[var(--accent)]" />
                </div>
                <p className="font-medium mb-2">Upload your photo</p>
                <p className="text-sm text-[var(--secondary)] mb-6 text-center">
                  Drag and drop or click to browse
                </p>
                <div className="bg-[var(--background)] rounded-lg p-4 w-full">
                  <p className="text-xs font-medium mb-2">Tips for best results:</p>
                  <ul className="text-xs text-[var(--secondary)] space-y-1">
                    <li>• Front-facing, full-body photo</li>
                    <li>• Good lighting, neutral background</li>
                    <li>• Stand straight with arms at sides</li>
                    <li>• Wear fitted clothing</li>
                  </ul>
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={userPhoto}
                  alt="Your photo"
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
                <button
                  onClick={() => setUserPhoto(null)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                >
                  Change Photo
                </button>
              </div>
            )}

            {userPhoto && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Privacy Note:</strong> Your photo is processed securely and never stored or shared.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Right Panel - Select Outfit */}
        <div>
          <Card className="p-6">
            <h3 className="mb-4">Select Items to Try On</h3>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('outfits')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'outfits'
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-gray-100 text-[var(--secondary)]'
                }`}
              >
                Saved Outfits
              </button>
              <button
                onClick={() => setActiveTab('items')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'items'
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-gray-100 text-[var(--secondary)]'
                }`}
              >
                Individual Items
              </button>
            </div>

            {/* Selected Items Pills */}
            {selectedItems.length > 0 && (
              <div className="mb-4 p-3 bg-[var(--background)] rounded-lg">
                <p className="text-xs font-medium mb-2">Selected ({selectedItems.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((itemId) => {
                    const item = mockWardrobeItems.find(i => i.id === itemId);
                    return item ? (
                      <span
                        key={itemId}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-[var(--border)] rounded text-xs"
                      >
                        {item.name}
                        <button
                          onClick={() => setSelectedItems(selectedItems.filter(id => id !== itemId))}
                          className="hover:text-[var(--error)]"
                        >
                          ×
                        </button>
                      </span>
                    ) : null;
                  })}
                </div>
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-xs text-[var(--accent)] hover:underline mt-2"
                >
                  Clear Selection
                </button>
              </div>
            )}

            {/* Content */}
            <div className="max-h-[450px] overflow-y-auto">
              {activeTab === 'outfits' ? (
                <div className="space-y-3">
                  {mockOutfits.map((outfit) => (
                    <button
                      key={outfit.id}
                      onClick={() => setSelectedItems(outfit.itemIds)}
                      className="w-full group"
                    >
                      <Card hover className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={outfit.previewUrl}
                            alt={outfit.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 text-left">
                            <p className="font-medium">{outfit.name}</p>
                            <p className="text-sm text-[var(--secondary)]">
                              {outfit.itemIds.length} items
                            </p>
                          </div>
                          <Sparkles size={20} className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Card>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {mockWardrobeItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (selectedItems.includes(item.id)) {
                          setSelectedItems(selectedItems.filter(id => id !== item.id));
                        } else {
                          setSelectedItems([...selectedItems, item.id]);
                        }
                      }}
                      className="group"
                    >
                      <Card
                        hover
                        className={`overflow-hidden ${
                          selectedItems.includes(item.id) ? 'ring-2 ring-[var(--accent)]' : ''
                        }`}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="p-2">
                          <p className="text-xs font-medium truncate">{item.name}</p>
                        </div>
                      </Card>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-6 max-w-4xl mx-auto">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[var(--secondary)]">
              {userPhoto && selectedItems.length > 0 ? (
                <>
                  <p className="font-medium text-[var(--primary)]">Ready to generate!</p>
                  <p>Estimated time: ~10 seconds</p>
                </>
              ) : (
                <p>Upload a photo and select items to continue</p>
              )}
            </div>
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!userPhoto || selectedItems.length === 0}
              loading={isGenerating}
            >
              <Sparkles size={20} />
              Generate Try-On
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
