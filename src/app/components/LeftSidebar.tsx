import { Link, useLocation, useNavigate } from 'react-router';
import { Home, BookOpen, Heart, Search, MessageSquare, FileQuestion } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { poems } from '../data/poems';
import { useSearch } from '../contexts/SearchContext';
import { useState } from 'react';

function SearchDialog() {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const results = poems.filter(poem => {
    const term = query.trim().toLowerCase();
    if (!term) return false;
    return (
      poem.title.toLowerCase().includes(term) ||
      poem.titlePinyin.toLowerCase().includes(term)
    );
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl text-[#8b7355] hover:bg-[#f5f1e8] transition-all"
          title="Search poems"
        >
          <Search className="w-5 h-5" />
          <span className="text-xs">Search</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogTitle>Search Poems</DialogTitle>
        <DialogDescription>Type to filter by title or pinyin and jump straight to the poem.</DialogDescription>

        <div className="mt-4">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full rounded-xl border border-[#d4c5a9]/40 bg-white/70 px-4 py-3 text-sm text-[#3d3229] focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
            placeholder="Search by title or pinyin..."
            autoFocus
          />
        </div>

        <div className="mt-4 max-h-56 overflow-y-auto space-y-2">
          {results.length === 0 ? (
            <p className="text-sm text-[#8b7355]">No matching poems yet.</p>
          ) : (
            results.map(poem => (
              <button
                key={poem.id}
                onClick={() => {
                  navigate(`/poem/${poem.id}`);
                }}
                className="w-full text-left rounded-xl px-4 py-3 hover:bg-[#f5f1e8] transition-colors"
              >
                <p className="text-sm font-medium text-[#3d3229]">{poem.title}</p>
                <p className="text-xs text-[#8b7355]">{poem.author}</p>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AskDialog() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const generateResponse = (q: string) => {
    const lower = q.toLowerCase();
    if (!lower.trim()) {
      return 'Please type a question about the poem, pronunciation, meaning, or how to memorize with music.';
    }

    if (lower.includes('tone') || lower.includes('pronounce') || lower.includes('pinyin')) {
      return 'Try listening closely to the recitation and match each line to the pinyin. Slow mode helps with accurate pronunciation.';
    }

    if (lower.includes('meaning') || lower.includes('interpret') || lower.includes('translate')) {
      return 'Focus on the key images (moon, river, mountain) and how they connect to feelings. The “Simple Explanation” section can help you memorise key meanings.';
    }

    if (lower.includes('memor') || lower.includes('remember') || lower.includes('recall')) {
      return 'Use the follow-along mode: listen, repeat aloud, and highlight the line as you go. Repeating the same line 2–3 times makes it stick.';
    }

    if (lower.includes('song') || lower.includes('sing')) {
      return 'Switch to Singing mode and follow the melody. It creates a musical memory path that helps the words stay with you.';
    }

    return 'Great question! Try switching between recitation and singing modes, and listen to how the rhythm helps you remember each line.';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl text-[#8b7355] hover:bg-[#f5f1e8] transition-all"
          title="Ask a question"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs">Ask</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogTitle>Ask a question</DialogTitle>
        <DialogDescription>
          Type your question and receive a helpful learning tip.
        </DialogDescription>

        <div className="mt-4">
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className="w-full min-h-[120px] resize-none rounded-xl border border-[#d4c5a9]/40 bg-white/70 px-4 py-3 text-sm text-[#3d3229] focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
            placeholder="Ask about pronunciation, meaning, memorization, or music..."
          />
        </div>

        {response && (
          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-[#3d3229]">
            <p className="font-medium">Bot:</p>
            <p className="mt-2">{response}</p>
          </div>
        )}

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => {
              setResponse(generateResponse(question));
              setQuestion('');
            }}
            className="rounded-xl bg-[#8b7355] px-4 py-2 text-sm font-medium text-white hover:bg-[#6b5745] transition-all"
          >
            Send
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function LeftSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-white/80 backdrop-blur-sm border-r border-[#d4c5a9]/20 flex flex-col items-center py-8 z-50">
      {/* Logo */}
      <Link to="/" className="mb-12 group">
        <div className="flex flex-col items-center gap-1">
          <BookOpen className="w-8 h-8 text-[#8b7355] group-hover:text-[#6b5745] transition-colors" />
          <div className="text-center">
            <p className="text-xs font-serif text-[#3d3229]">诗韵</p>
            <p className="text-xs font-serif text-[#8b7355]">乐声</p>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-6">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all ${
            isActive('/')
              ? 'bg-[#8b7355] text-white'
              : 'text-[#8b7355] hover:bg-[#f5f1e8]'
          }`}
          title="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/collection"
          className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all ${
            isActive('/collection')
              ? 'bg-[#8b7355] text-white'
              : 'text-[#8b7355] hover:bg-[#f5f1e8]'
          }`}
          title="Collection"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">Collection</span>
        </Link>

        <Link
          to="/quiz"
          className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all ${
            isActive('/quiz')
              ? 'bg-[#8b7355] text-white'
              : 'text-[#8b7355] hover:bg-[#f5f1e8]'
          }`}
          title="Quiz"
        >
          <FileQuestion className="w-5 h-5" />
          <span className="text-xs">Quiz</span>
        </Link>

        <SearchDialog />
        <AskDialog />
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <div className="text-center">
          <p className="text-xs text-[#8b7355] writing-mode-vertical">诗韵乐声</p>
        </div>
      </div>
    </aside>
  );
}
