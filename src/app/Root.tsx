import { Outlet, useLocation } from 'react-router';
import { Navigation } from './components/Navigation';
import { LeftSidebar } from './components/LeftSidebar';
import { motion, AnimatePresence } from 'motion/react';
import { SearchProvider } from './contexts/SearchContext';

export function Root() {
  const location = useLocation();

  return (
    <SearchProvider>
      <div className="min-h-screen bg-[#faf8f5]">
        <LeftSidebar />
        <Navigation />
        <main className="ml-20 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </SearchProvider>
  );
}