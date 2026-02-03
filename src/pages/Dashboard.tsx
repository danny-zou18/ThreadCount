import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, Sparkles, Eye, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { mockOutfits, mockWardrobeItems } from '../data/mockData';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Calculate wardrobe stats
  const categoryData = [
    { name: 'Tops', value: mockWardrobeItems.filter(i => i.category === 'tops').length, color: '#C9A87C' },
    { name: 'Bottoms', value: mockWardrobeItems.filter(i => i.category === 'bottoms').length, color: '#6B7280' },
    { name: 'Outerwear', value: mockWardrobeItems.filter(i => i.category === 'outerwear').length, color: '#1A1A1A' },
    { name: 'Shoes', value: mockWardrobeItems.filter(i => i.category === 'shoes').length, color: '#F3F4F6' },
  ];

  const trendingOutfits = [
    { id: 1, name: 'Minimalist Chic', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMG91dGZpdCUyMGZsYXRsYXl8ZW58MXx8fHwxNzcwMDcyNDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 2, name: 'Street Style', image: 'https://images.unsplash.com/photo-1727524366429-27de8607d5f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjBqYWNrZXR8ZW58MXx8fHwxNzcwMDcyNDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 3, name: 'Business Casual', image: 'https://images.unsplash.com/photo-1633821879282-0c4e91f96232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHRyZW5jaCUyMGNvYXR8ZW58MXx8fHwxNzcwMDIxNjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 4, name: 'Weekend Comfort', image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vY2t1cHxlbnwxfHx8fDE3NzAwMjU4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  ];

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="mb-1">{greeting}, Sarah</h1>
        <p className="text-[var(--secondary)]">{dateStr}</p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Outfit Idea */}
          <Card className="overflow-hidden">
            <div className="relative aspect-[16/10]">
              <img
                src={mockOutfits[0].previewUrl}
                alt="Today's outfit"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-[var(--accent)]" />
                  <span className="text-white text-sm font-medium">AI Suggested for You</span>
                </div>
                <h2 className="text-white mb-4">Today's Outfit Idea</h2>
                <div className="flex gap-3">
                  <Button onClick={() => onNavigate('try-on')}>
                    <Eye size={18} />
                    Try It On
                  </Button>
                  <Button variant="ghost" className="!bg-white/20 !text-white hover:!bg-white/30">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div>
            <h3 className="mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card
                hover
                onClick={() => onNavigate('wardrobe')}
                className="p-6 text-center cursor-pointer"
              >
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Plus size={24} className="text-[var(--accent)]" />
                </div>
                <p className="font-medium text-sm">Add Item</p>
              </Card>
              <Card
                hover
                onClick={() => onNavigate('outfit-builder')}
                className="p-6 text-center cursor-pointer"
              >
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={24} className="text-[var(--accent)]" />
                </div>
                <p className="font-medium text-sm">Create Outfit</p>
              </Card>
              <Card
                hover
                onClick={() => onNavigate('try-on')}
                className="p-6 text-center cursor-pointer"
              >
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Eye size={24} className="text-[var(--accent)]" />
                </div>
                <p className="font-medium text-sm">Virtual Try-On</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Wardrobe Stats */}
          <Card className="p-6">
            <h3 className="mb-4">Wardrobe Stats</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-2xl font-bold text-[var(--accent)]">{mockWardrobeItems.length}</p>
                <p className="text-xs text-[var(--secondary)]">Total Items</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--accent)]">{mockOutfits.length}</p>
                <p className="text-xs text-[var(--secondary)]">Saved Outfits</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-xs">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Outfits */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Recent Outfits</h3>
              <button
                onClick={() => onNavigate('saved-outfits')}
                className="text-sm text-[var(--accent)] hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {mockOutfits.slice(0, 3).map((outfit) => (
                <div
                  key={outfit.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => onNavigate('saved-outfits')}
                >
                  <img
                    src={outfit.previewUrl}
                    alt={outfit.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{outfit.name}</p>
                    <p className="text-xs text-[var(--secondary)]">{outfit.itemIds.length} items</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Trending Inspiration */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-[var(--accent)]" />
            <h2>Trending Inspiration</h2>
          </div>
          <button
            onClick={() => onNavigate('inspiration')}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            See More
          </button>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
          <div className="flex gap-4 pb-4" style={{ minWidth: 'min-content' }}>
            {trendingOutfits.map((outfit) => (
              <Card key={outfit.id} hover className="flex-shrink-0 w-64 overflow-hidden">
                <img
                  src={outfit.image}
                  alt={outfit.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <p className="font-medium">{outfit.name}</p>
                  <Button size="sm" variant="ghost" className="mt-3 w-full">
                    Try Similar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
