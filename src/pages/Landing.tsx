import React from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Shirt, Layers, Sparkles, CheckCircle } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--background)]">
      {/* Header */}
      <header className="py-4 px-6 border-b border-[var(--border)] bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h3 className="text-[var(--accent)]">StyleMirror</h3>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button onClick={onGetStarted} size="sm">Get Started Free</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-4">Your AI-Powered Style Assistant</h1>
            <p className="text-lg text-[var(--secondary)] mb-6">
              Organize your wardrobe, create stunning outfit combinations, and see how they look on you with AI-powered virtual try-on technology.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-[var(--secondary)]">
                <CheckCircle size={16} className="text-[var(--success)]" />
                <span>100% Free to start</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--secondary)]">
                <CheckCircle size={16} className="text-[var(--success)]" />
                <span>No credit card required</span>
              </div>
            </div>
            <Button onClick={onGetStarted} size="lg">Get Started Free</Button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)]">
              <img
                src="https://images.unsplash.com/photo-1610911894224-299f485649af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXAlMjBmYXNoaW9ufGVufDF8fHx8MTc3MDA3MjQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="StyleMirror App"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-3">Everything You Need to Look Your Best</h2>
            <p className="text-[var(--secondary)]">Powerful features to help you organize, style, and visualize your wardrobe</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shirt size={32} className="text-[var(--accent)]" />
              </div>
              <h3 className="mb-2">Virtual Wardrobe</h3>
              <p className="text-sm text-[var(--secondary)]">
                Digitize and organize all your clothes in one place. Tag by color, season, and category for easy access.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Layers size={32} className="text-[var(--accent)]" />
              </div>
              <h3 className="mb-2">Mix & Match</h3>
              <p className="text-sm text-[var(--secondary)]">
                Create and save unlimited outfit combinations. Get AI-powered suggestions based on your style preferences.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} className="text-[var(--accent)]" />
              </div>
              <h3 className="mb-2">AI Virtual Try-On</h3>
              <p className="text-sm text-[var(--secondary)]">
                See how outfits look on you before getting dressed. Our AI technology makes visualization effortless.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-3">How It Works</h2>
            <p className="text-[var(--secondary)]">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload Your Wardrobe', desc: 'Take photos or upload images of your clothes' },
              { step: '2', title: 'Create Outfits', desc: 'Mix and match items to create perfect combinations' },
              { step: '3', title: 'Try Them On', desc: 'See how outfits look on you with AI try-on' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[var(--accent)] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[var(--primary)] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 text-white">Ready to Transform Your Style?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of fashion enthusiasts organizing their wardrobes smarter.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 px-4 py-3 rounded-lg text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <Button onClick={onGetStarted} variant="secondary" size="lg">Get Started</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--border)] bg-white">
        <div className="max-w-7xl mx-auto text-center text-sm text-[var(--secondary)]">
          <p>&copy; 2026 StyleMirror. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
