import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-transparent py-8 lg:py-10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="flex flex-col max-w-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="material-icons-round text-white dark:text-black text-xl">play_arrow</span>
              </div>
              <span className="text-xl font-bold font-display text-gray-900 dark:text-white">Maxproof</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Empowering Shopify merchants with next-gen interactive video commerce.
            </p>
          </div>
          <div className="flex items-center space-x-8 mt-8 md:mt-2">
            <Link to="/privacy" className="text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
        <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
            © 2026 Maxproof Inc. All rights reserved.
          </p>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-accent-green mr-2.5"></span>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
