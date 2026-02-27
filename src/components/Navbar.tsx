import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  const isHome = location.pathname === '/';

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 w-1/4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="material-icons-round text-white dark:text-black text-2xl">play_arrow</span>
              </div>
              <span className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white">Maxproof</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center space-x-10 w-2/4">
            {isHome ? (
              <>
                <a href="#features" className="text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
                <a href="#contact" className="text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
              </>
            ) : (
              <>
                <Link to="/#features" className="text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link>
                <Link to="/#pricing" className="text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
                <Link to="/#contact" className="text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link>
              </>
            )}
          </div>
          <div className="hidden md:flex items-center justify-end space-x-6 w-1/4">
            <button onClick={toggleDarkMode} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <a href="#contact" className="px-6 py-2.5 bg-primary text-white rounded-full font-bold hover:bg-primary-hover hover:shadow-glow-blue transition-all shadow-lg shadow-blue-500/20 text-sm tracking-wide">
              Install App
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none">
              <span className="material-icons-round text-2xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
