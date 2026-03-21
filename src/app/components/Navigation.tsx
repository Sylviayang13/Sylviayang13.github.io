import { Link, useLocation } from 'react-router';
import { BookOpen, Home, ArrowLeft } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-20 right-0 z-40 bg-white/60 backdrop-blur-sm border-b border-[#d4c5a9]/20">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHomePage && (
              <Link
                to="/"
                className="flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#6b5745] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h1 className="font-serif text-lg text-[#3d3229]">MelodyHan</h1>
              <p className="text-xs text-[#8b7355]">诗韵乐声</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}