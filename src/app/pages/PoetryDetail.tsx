import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { poems } from '../data/poems';
import { User, Calendar, Heart, Eye, EyeOff, Info, Bookmark } from 'lucide-react';
import { EnhancedAudioPlayer } from '../components/EnhancedAudioPlayer';
import { motion } from 'motion/react';
import { isFavorite, toggleFavorite, isReviewLater, toggleReviewLater } from '../utils/favorites';

export function PoetryDetail() {
  const { id } = useParams<{ id: string }>();
  const poem = poems.find(p => p.id === id);

  const [showPinyin, setShowPinyin] = useState(true);
  const [currentLine, setCurrentLine] = useState<number>(-1);
  const [currentChar, setCurrentChar] = useState<number>(-1);
  const [currentNote, setCurrentNote] = useState<number>(-1);
  const [isFav, setIsFav] = useState(false);
  const [isSavedForLater, setIsSavedForLater] = useState(false);
  const [showAuthorCard, setShowAuthorCard] = useState(false);

  useEffect(() => {
    if (!poem) return;
    setIsFav(isFavorite(poem.id));
    setIsSavedForLater(isReviewLater(poem.id));
  }, [poem]);

  useEffect(() => {
    if (currentLine === -1) return;
    
    const currentLineText = poem.lines[currentLine].chinese;
    let charIndex = 0;
    
    const charTimer = setInterval(() => {
      setCurrentChar(charIndex);
      charIndex++;
      if (charIndex > currentLineText.length) {
        clearInterval(charTimer);
      }
    }, 300); // Adjust speed as needed
    
    return () => clearInterval(charTimer);
  }, [currentLine, poem]);

  if (!poem) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8b7355] mb-4">Poem not found</p>
        </div>
      </div>
    );
  }

  const levelMap = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级'
  };

  const handleToggleFavorite = () => {
    toggleFavorite(poem.id);
    setIsFav(prev => !prev);
  };

  const handleToggleReviewLater = () => {
    toggleReviewLater(poem.id);
    setIsSavedForLater(prev => !prev);
  };

  const handleLineChange = (lineIndex: number) => {
    setCurrentLine(lineIndex);
    setCurrentChar(0); // Reset character index when line changes
    // Update current note based on line index
    if (poem.musicSheet) {
      const notesPerLine = Math.ceil(poem.musicSheet.length / poem.lines.length);
      const noteIndex = lineIndex * notesPerLine;
      setCurrentNote(Math.min(noteIndex, poem.musicSheet.length - 1));
    }
  };

  return (
    <div className="h-screen relative bg-gradient-to-br from-[#f8f3e0] via-[#fbf6e6] to-[#ede3d4] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 filter saturate-110"
        style={{
          backgroundImage: `url(${poem.backgroundImage})`,
          animation: 'backgroundPan 480s ease-in-out infinite',
          filter: 'saturate(1.2) brightness(1.05)',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 bg-white/65 backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 h-full">
        <div className="flex gap-8 h-full">
          <aside className="w-[350px] overflow-y-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5a9]/30 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-[#8b7355] text-white rounded-full">
                    <span className="text-xs font-medium">{levelMap[poem.level]}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleToggleFavorite}
                    className="w-10 h-10 rounded-full bg-[#f5f1e8] hover:bg-[#ebe4d5] flex items-center justify-center transition-all"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        isFav
                          ? 'fill-red-500 text-red-500'
                          : 'text-[#a89984]'
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleToggleReviewLater}
                    className="w-10 h-10 rounded-full bg-[#f5f1e8] hover:bg-[#ebe4d5] flex items-center justify-center transition-all"
                    title={isSavedForLater ? 'Remove from review later' : 'Save for review later'}
                  >
                    <Bookmark
                      className={`w-5 h-5 transition-all ${
                        isSavedForLater
                          ? 'fill-[#8b7355] text-[#8b7355]'
                          : 'text-[#a89984]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <h1 className="font-serif text-3xl mb-2" style={{ color: poem.theme?.text ?? '#3d3229' }}>
                {poem.title}
              </h1>
              <p className="text-lg mb-6 italic" style={{ color: poem.theme?.accent ?? '#6b5745' }}>
                {poem.titlePinyin}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-[#8b7355]">
                  <User className="w-4 h-4" />
                  <button
                    type="button"
                    onClick={() => setShowAuthorCard(true)}
                    className="text-left"
                  >
                    <p className="text-sm font-medium underline decoration-[#a89984] decoration-1 underline-offset-2">
                      {poem.author}
                    </p>
                    <p className="text-xs text-[#a89984]">{poem.authorPinyin}</p>
                  </button>
                </div>
                <div className="flex items-center gap-3 text-[#8b7355]">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{poem.dynasty}</span>
                </div>
              </div>

              {showAuthorCard && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                  role="dialog"
                  aria-modal="true"
                  onClick={() => setShowAuthorCard(false)}
                  onKeyDown={e => {
                    if (e.key === 'Escape') setShowAuthorCard(false);
                  }}
                  tabIndex={-1}
                >
                  <div
                    className="relative max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-[#d4c5a9]/30 shadow-xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setShowAuthorCard(false)}
                      className="absolute top-4 right-4 rounded-full bg-white/60 p-2 hover:bg-white text-[#6b5745]"
                      aria-label="Close author info"
                    >
                      ✕
                    </button>
                    <h2 className="font-serif text-2xl text-[#3d3229] mb-2">{poem.author}</h2>
                    <p className="text-sm text-[#8b7355] mb-4">{poem.authorPinyin}</p>
                    <p className="text-sm leading-relaxed text-[#6b5745]">
                      {poem.authorBio}
                    </p>
                    <div className="mt-4 text-xs text-[#a89984]">
                      <p>Click outside or press ESC to close.</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className="w-full py-3 px-4 bg-[#f5f1e8] hover:bg-[#ebe4d5] rounded-xl flex items-center justify-between transition-all mb-4"
              >
                <span className="text-sm text-[#6b5745]">
                  {showPinyin ? 'Hide Pinyin' : 'Show Pinyin'}
                </span>
                {showPinyin ? (
                  <EyeOff className="w-4 h-4 text-[#8b7355]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#8b7355]" />
                )}
              </button>

              <div className="bg-[#f7f1e7] border border-[#d4c5a9]/40 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-[#3d3229]">
                  Learn poetry with music: recite with audio, sing along, and follow the melody.
                </p>
                <p className="text-xs text-[#8b7355]">
                  Use the Music Teaching Method: listen to the recitation, follow along with the highlighted lines, and sing along with the song version to internalize rhythm and meaning.
                </p>
              </div>

              <EnhancedAudioPlayer
                poemTitle={poem.title}
                linesCount={poem.lines.length}
                audioRecitationUrl={poem.audioRecitationUrl}
                audioSongUrl={poem.audioSongUrl}
                onLineChange={handleLineChange}
              />
            </motion.div>
          </aside>

          <div className="flex-1 overflow-y-auto space-y-8 rounded-3xl shadow-2xl relative">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{
                backgroundImage: `url(${poem.backgroundImage})`,
                animation: 'backgroundPan 480s ease-in-out infinite',
                filter: 'saturate(1.2) brightness(1.05)',
                backgroundAttachment: 'fixed',
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative space-y-8 px-6 py-8 lg:px-10 lg:py-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="painted-background backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-[#8bbf8a]/20"
              >
                <div className="space-y-6">
                  {/* Music Sheet */}
                  {poem.musicSheet && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#d4c5a9]/30 shadow-lg"
                    >
                      <h3 className="font-serif text-lg text-[#3d3229] mb-4 flex items-center gap-2">
                        <span>🎵</span>
                        简谱
                      </h3>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {poem.musicSheet.map((note, idx) => (
                          <motion.div
                            key={idx}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-medium transition-all duration-300 ${
                              currentNote === idx
                                ? 'bg-[#8b7355] text-white shadow-lg scale-110'
                                : 'bg-[#f5f1e8] text-[#8b7355] hover:bg-[#ebe4d5]'
                            }`}
                            animate={{ scale: currentNote === idx ? 1.1 : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {note}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {poem.lines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      className={`space-y-2 p-5 rounded-2xl transition-all duration-500 ${
                        currentLine === idx
                          ? 'bg-white/95 border border-[#7fbf7b]/30 shadow-lg scale-102'
                          : 'bg-white/80 border border-[#7fbf7b]/10 shadow-sm'
                      }`}
                      animate={{ scale: currentLine === idx ? 1.02 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p
                        className="font-serif leading-snug"
                        style={{
                          fontSize: '18px',
                          fontFamily: "'Songti SC', 'Noto Serif SC', serif",
                        }}
                      >
                        {line.chinese.split('').map((char, charIndex) => (
                          <span
                            key={charIndex}
                            style={{
                              color: currentLine === idx && currentChar >= charIndex
                                ? poem.theme?.accent ?? '#8b7355'
                                : poem.theme?.text ?? '#3d3229',
                              fontWeight: currentLine === idx && currentChar === charIndex ? 'bold' : 'normal',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </p>
                      {showPinyin && (
                        <p
                          className="text-sm italic leading-snug"
                          style={{ color: poem.theme?.accent ?? '#8b7355' }}
                        >
                          {line.pinyin}
                        </p>
                      )}
                      <p className="text-sm leading-snug" style={{ color: poem.theme?.text ?? '#6b5745' }}>
                        {line.english}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50/90 to-indigo-50/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/50 shadow-lg"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-[#3d3229] mb-2">
                      Simple Explanation
                    </h2>
                    <p className="text-sm text-[#8b7355]">Easy to understand summary</p>
                  </div>
                </div>
                <p className="text-[#6b5745] leading-relaxed text-lg">
                  {poem.simpleExplanation}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-[#f5f1e8]/90 to-[#ebe4d5]/90 backdrop-blur-sm rounded-3xl p-8 border border-[#d4c5a9]/30 shadow-lg"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#8b7355] flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-[#3d3229] mb-1">
                      About the Poet
                    </h2>
                    <p className="text-lg text-[#6b5745]">{poem.author} ({poem.authorPinyin})</p>
                  </div>
                </div>
                <p className="text-[#6b5745] leading-relaxed">
                  {poem.authorBio}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-[#d4c5a9]/30 shadow-lg"
              >
                <h2 className="font-serif text-2xl text-[#3d3229] mb-4 flex items-center gap-2">
                  <span>🌸</span>
                  Cultural Context & Meaning
                </h2>
                <p className="text-[#6b5745] leading-relaxed">
                  {poem.meaning}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-sm rounded-3xl p-8 border border-amber-200/50 shadow-lg"
              >
                <h3 className="font-serif text-2xl text-[#3d3229] mb-6">
                  📚 Learning Tips
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-medium">1</span>
                    <p className="text-[#6b5745] leading-relaxed pt-1">
                      Listen to the recitation and practice pronunciation while following the highlighted lines
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-medium">2</span>
                    <p className="text-[#6b5745] leading-relaxed pt-1">
                      Sing along with the song version to deepen your understanding and memorize the melody
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-medium">3</span>
                    <p className="text-[#6b5745] leading-relaxed pt-1">
                      Use follow-along mode to read along with the audio and improve your rhythm
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-medium">4</span>
                    <p className="text-[#6b5745] leading-relaxed pt-1">
                      Read the cultural context to appreciate the deeper significance of the poem
                    </p>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
