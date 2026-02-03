import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bookmark, Sparkles } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { useToast } from '../components/ui/Toast';

export const Inspiration: React.FC = () => {
  const { showToast } = useToast();

  const inspirationItems = [
    { id: 1, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMG91dGZpdCUyMGZsYXRsYXl8ZW58MXx8fHwxNzcwMDcyNDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', title: 'Minimalist Basics', height: 400 },
    { id: 2, image: 'https://images.unsplash.com/photo-1727524366429-27de8607d5f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjBqYWNrZXR8ZW58MXx8fHwxNzcwMDcyNDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', title: 'Edgy Street Style', height: 500 },
    { id: 3, image: 'https://images.unsplash.com/photo-1633821879282-0c4e91f96232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHRyZW5jaCUyMGNvYXR8ZW58MXx8fHwxNzcwMDIxNjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', title: 'Classic Elegance', height: 450 },
    { id: 4, image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vY2t1cHxlbnwxfHx8fDE3NzAwMjU4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', title: 'Casual Weekend', height: 420 },
    { id: 5, image: 'https://images.unsplash.com/photo-1573875133340-0b589f59a8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwbWluaW1hbHxlbnwxfHx8fDE3NzAwMjE2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', title: 'Sneaker Culture', height: 380 },
    { id: 6, image: 'https://images.unsplash.com/photo-1639602182178-2dc689354103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwZGVuaW0lMjBqZWFuc3xlbnwxfHx8fDE3NzAwMDYzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', title: 'Denim Days', height: 440 },
  ];

  const categories = ['All', 'Casual', 'Formal', 'Street Style', 'Business', 'Weekend', 'Evening'];

  const handleSave = (item: any) => {
    showToast(`"${item.title}" saved to inspiration!`, 'success');
  };

  const handleTrySimilar = (item: any) => {
    showToast(`Finding similar items to "${item.title}"...`, 'info');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2">Style Inspiration</h1>
        <p className="text-[var(--secondary)]">
          Discover trending looks and get inspired for your next outfit
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-[var(--border)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] transition-all"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <Masonry columnsCount={3} gutter="24px">
        {inspirationItems.map((item) => (
          <Card key={item.id} hover className="overflow-hidden group">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
                style={{ height: item.height }}
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white mb-3">{item.title}</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSave(item)}
                    className="flex-1"
                  >
                    <Bookmark size={16} />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleTrySimilar(item)}
                    className="flex-1 !bg-white/20 !text-white hover:!bg-white/30"
                  >
                    <Sparkles size={16} />
                    Try Similar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Masonry>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="ghost" size="lg">
          Load More
        </Button>
      </div>
    </div>
  );
};
