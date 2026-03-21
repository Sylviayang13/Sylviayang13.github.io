import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { poems } from '../data/poems';
import { ArrowLeft, BookOpen, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { useSearch } from '../contexts/SearchContext';
import riverImage from '../../assets/river-boat.png';

export function Level() {
  const { level } = useParams<{ level: string }>();
  const { query } = useSearch();
  const searchTerm = query.trim().toLowerCase();
  const filteredPoems = poems.filter(poem => {
    if (poem.level !== level) return false;
    if (!searchTerm) return true;
    return (
      poem.title.toLowerCase().includes(searchTerm) ||
      poem.titlePinyin.toLowerCase().includes(searchTerm)
    );
  });

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites on mount
    setFavorites(filteredPoems.filter(p => isFavorite(p.id)).map(p => p.id));
  }, []);

  const handleToggleFavorite = (e: React.MouseEvent, poemId: string) => {
    e.preventDefault();
    toggleFavorite(poemId);
    setFavorites(prev => 
      prev.includes(poemId) 
        ? prev.filter(id => id !== poemId)
        : [...prev, poemId]
    );
  };

  const levelInfo: Record<string, { title: string; subtitle: string; description: string }> = {
    beginner: {
      title: 'Beginner',
      subtitle: '初级诗词',
      description: 'Simple, memorable verses perfect for learning Chinese poetry fundamentals'
    },
    intermediate: {
      title: 'Intermediate',
      subtitle: '中级诗词',
      description: 'Rich imagery and deeper themes to expand your poetic knowledge'
    },
    advanced: {
      title: 'Advanced',
      subtitle: '高级诗词',
      description: 'Complex masterpieces showcasing the pinnacle of classical Chinese poetry'
    }
  };

  const info = levelInfo[level || 'beginner'];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#faf8f5] via-[#f5f1e8] to-[#ebe4d5]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,179,135,0.25),transparent_55%)] pointer-events-none" />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f5f1e8] to-[#ebe4d5]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${riverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-8 pt-12 pb-12">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-[#3d3229] mb-3">
              {info.title}
            </h1>
            <p className="font-serif text-2xl text-[#6b5745] mb-4">{info.subtitle}</p>
            <p className="text-[#8b7355] max-w-2xl">{info.description}</p>
          </div>
        </div>
      </div>

      {/* Poems Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPoems.map((poem, index) => (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={`/poem/${poem.id}`}
                className="group block"
              >
                <motion.div
                  className="bg-white rounded-2xl p-8 border border-[#d4c5a9]/20 transition-all duration-300 relative overflow-hidden"
                  whileHover={{ 
                    y: -8, 
                    boxShadow: '0 20px 40px rgba(139, 115, 85, 0.15)',
                    borderColor: 'rgba(212, 197, 169, 0.5)'
                  }}
                >
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => handleToggleFavorite(e, poem.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all z-10 border border-[#d4c5a9]/20"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all ${
                        favorites.includes(poem.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-[#a89984]'
                      }`}
                    />
                  </button>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e8dcc4] to-[#d4c5a9] flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl text-[#3d3229] mb-1">
                        {poem.title}
                      </h3>
                      <p className="text-[#8b7355] mb-2">{poem.titlePinyin}</p>
                      <div className="flex items-center gap-2 text-sm text-[#a89984]">
                        <span>{poem.author}</span>
                        <span>·</span>
                        <span>{poem.dynasty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {poem.lines.slice(0, 2).map((line, idx) => (
                      <p key={idx} className="text-[#6b5745] leading-relaxed">
                        {line.chinese}
                      </p>
                    ))}
                    {poem.lines.length > 2 && (
                      <p className="text-[#a89984] text-sm">...</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#d4c5a9]/20">
                    <span className="text-sm text-[#a89984]">
                      {poem.lines.length} lines
                    </span>
                    <span className="text-[#8b7355] group-hover:translate-x-1 transition-transform">
                      Read more →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredPoems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#a89984]">
              {searchTerm
                ? 'No poems match your search. Try another keyword.'
                : 'No poems available for this level yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}