import { motion } from 'framer-motion';
import { useThemeContext } from '@/contexts/ThemeContext';
import logo from '../assets/investment-calculator-logo.png';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const { theme, toggleTheme, isTransitioning } = useThemeContext();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-8 ${className}`}
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.img
          src={logo}
          alt="Investment Calculator Logo"
          className="w-16 h-16 rounded-full shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        
        <motion.button
          onClick={toggleTheme}
          disabled={isTransitioning}
          className={`p-3 rounded-full transition-all duration-300 ${
            theme.mode === 'dark' 
              ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' 
              : 'bg-gray-800 hover:bg-gray-900 text-yellow-400'
          } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          whileHover={{ scale: isTransitioning ? 1 : 1.1 }}
          whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
          aria-label={`Switch to ${theme.mode === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme.mode === 'dark' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.button>
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4"
      >
        Investment Calculator
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
      >
        Plan your financial future with our comprehensive investment calculator. 
        Visualize growth, compare scenarios, and make informed decisions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2 mt-6"
      >
        {['Retirement', 'College Fund', 'Emergency Fund', 'House Down Payment'].map((tag, index) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </motion.header>
  );
}

export default Header;
