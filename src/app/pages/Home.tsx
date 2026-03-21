import { Link } from 'react-router';
import { Sparkles, BookMarked, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import bgImage from '../../assets/bd7c5fd6059b1b68b392768a430b1cc7aec147dd.png';

export function Home() {
  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      subtitle: '初级',
      description: 'Start your journey with simple, beautiful verses',
      icon: Sparkles,
      color: 'from-[#e8dcc4] to-[#d4c5a9]',
      poems: 2
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      subtitle: '中级',
      description: 'Explore deeper meanings and complex imagery',
      icon: BookMarked,
      color: 'from-[#d4c5a9] to-[#bfad8f]',
      poems: 2
    },
    {
      id: 'advanced',
      title: 'Advanced',
      subtitle: '高级',
      description: 'Master the art of classical Chinese poetry',
      icon: GraduationCap,
      color: 'from-[#bfad8f] to-[#a89984]',
      poems: 2
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#d4c5a9]/30 mb-4">
                <p className="text-sm text-[#8b7355]">Chinese Poetry Learning Platform</p>
              </div>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-[#3d3229] mb-4">
              MelodyHan
            </h1>
            <p className="font-serif text-3xl md:text-4xl text-[#6b5745] mb-3">
              诗韵乐声
            </p>
            <p className="text-lg text-[#8b7355] max-w-2xl mx-auto leading-relaxed">
              Discover the timeless beauty of Chinese classical poetry with MelodyHan.
              <br />
              Learn with pinyin, translations, and audio guides.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Levels Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl text-[#3d3229] mb-3">Choose Your Path</h2>
          <p className="text-[#8b7355]">Select your learning level to begin exploring ancient verses</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {levels.map((level, index) => {
            const Icon = level.icon;
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  to={`/level/${level.id}`}
                  className="group block"
                >
                  <motion.div
                    className="bg-white rounded-3xl p-10 border border-[#d4c5a9]/20 transition-all duration-300"
                    whileHover={{ 
                      y: -8,
                      boxShadow: '0 20px 40px rgba(139, 115, 85, 0.15)',
                      borderColor: 'rgba(212, 197, 169, 0.6)'
                    }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="font-serif text-2xl text-[#3d3229] mb-2">
                      {level.title}
                    </h3>
                    <p className="text-lg text-[#8b7355] mb-4">{level.subtitle}</p>
                    <p className="text-[#a89984] leading-relaxed mb-6">
                      {level.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#d4c5a9]/20">
                      <span className="text-sm text-[#a89984]">{level.poems} poems</span>
                      <span className="text-[#8b7355] group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-br from-[#f5f1e8] to-[#ebe4d5] py-24"
      >
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl text-[#3d3229] mb-4">Why Choose MelodyHan</h2>
            <p className="text-lg text-[#8b7355] max-w-2xl mx-auto">Experience the elegance of classical Chinese poetry through our premium learning platform</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-14 border border-[#d4c5a9]/20 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-6">📖</div>
              <h3 className="font-serif text-2xl text-[#3d3229] mb-4">
                Classic Texts
              </h3>
              <p className="text-[#8b7355] leading-relaxed text-lg">
                Immerse yourself in carefully curated masterpieces from the Tang and Song dynasties, selected for their timeless beauty and profound wisdom.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-14 border border-[#d4c5a9]/20 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-6">🎵</div>
              <h3 className="font-serif text-2xl text-[#3d3229] mb-4">
                Pinyin & Audio
              </h3>
              <p className="text-[#8b7355] leading-relaxed text-lg">
                Master perfect pronunciation with our comprehensive pinyin system and high-quality audio recordings featuring native speakers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-14 border border-[#d4c5a9]/20 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-6">🌸</div>
              <h3 className="font-serif text-2xl text-[#3d3229] mb-4">
                Cultural Context
              </h3>
              <p className="text-[#8b7355] leading-relaxed text-lg">
                Deepen your understanding with rich cultural insights, historical background, and the poetic traditions that shaped these masterpieces.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}