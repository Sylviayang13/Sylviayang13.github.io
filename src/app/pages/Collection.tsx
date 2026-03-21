import { Link } from 'react-router';
import { motion } from 'motion/react';
import { poems } from '../data/poems';
import { getFavorites, getReviewLater, toggleFavorite, toggleReviewLater } from '../utils/favorites';
import { Heart, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Collection() {
  const [tab, setTab] = useState<'favorites' | 'review'>('favorites');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reviewLater, setReviewLater] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    setReviewLater(getReviewLater());
  }, []);

  const handleToggleFavorite = (poemId: string) => {
    toggleFavorite(poemId);
    setFavorites(getFavorites());
  };

  const handleToggleReviewLater = (poemId: string) => {
    toggleReviewLater(poemId);
    setReviewLater(getReviewLater());
  };

  const items = poems.filter(p => (tab === 'favorites' ? favorites.includes(p.id) : reviewLater.includes(p.id)));

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl text-[#3d3229] mb-2">My Collection</h1>
          <p className="text-[#8b7355]">A curated list of your saved poems.</p>
        </motion.div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setTab('favorites')}
            className={`rounded-xl px-5 py-3 text-sm font-medium transition-all ${
              tab === 'favorites'
                ? 'bg-[#8b7355] text-white'
                : 'bg-[#f5f1e8] text-[#3d3229] hover:bg-[#ebe4d5]'
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setTab('review')}
            className={`rounded-xl px-5 py-3 text-sm font-medium transition-all ${
              tab === 'review'
                ? 'bg-[#8b7355] text-white'
                : 'bg-[#f5f1e8] text-[#3d3229] hover:bg-[#ebe4d5]'
            }`}
          >
            Review Later
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#8b7355] text-lg">
              {tab === 'favorites'
                ? 'Your collection is empty. Add poems by tapping the heart icon.'
                : 'No poems saved for review. Use the bookmark icon to save for later.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((poem, index) => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, boxShadow: '0 18px 30px rgba(139, 115, 85, 0.16)' }}
                className="bg-white rounded-3xl p-8 border border-[#d4c5a9]/20 shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-[#3d3229] mb-1">{poem.title}</h2>
                    <p className="text-[#8b7355] text-sm">{poem.author} • {poem.dynasty}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleFavorite(poem.id)}
                      className="w-10 h-10 rounded-full bg-[#f5f1e8] hover:bg-[#ebe4d5] flex items-center justify-center transition-all"
                      aria-label="Toggle favorite"
                    >
                      <Heart className="w-5 h-5 text-red-500" />
                    </button>
                    <button
                      onClick={() => handleToggleReviewLater(poem.id)}
                      className="w-10 h-10 rounded-full bg-[#f5f1e8] hover:bg-[#ebe4d5] flex items-center justify-center transition-all"
                      aria-label="Toggle review later"
                    >
                      <Bookmark className="w-5 h-5 text-[#8b7355]" />
                    </button>
                  </div>
                </div>

                <p className="text-[#6b5745] leading-relaxed mb-6 text-sm">
                  {poem.simpleExplanation}
                </p>

                <Link
                  to={`/poem/${poem.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#8b7355] hover:text-[#6b5745]"
                >
                  Read full poem →
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
