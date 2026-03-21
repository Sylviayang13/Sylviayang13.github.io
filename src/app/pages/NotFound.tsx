import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🏮</div>
        <h1 className="font-serif text-4xl text-[#3d3229] mb-3">Page Not Found</h1>
        <p className="text-[#8b7355] mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#8b7355] hover:bg-[#6b5745] text-white rounded-full transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
