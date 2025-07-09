// frontend/src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center bg-gray-800 p-10 rounded-lg shadow-xl max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Welcome to Nexus
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your central hub for competitive gaming, real-time tournament tracking, and powerful player analytics.
        </p>
        <div className="space-x-4">
          <Link href="/login" legacyBehavior>
            <a className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              Login
            </a>
          </Link>
          <Link href="/register" legacyBehavior>
            <a className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              Register
            </a>
          </Link>
        </div>
        <p className="mt-10 text-gray-500 text-sm">
          Phase 1: Authentication & Core Backend setup underway!
        </p>
      </div>
    </div>
  );
}