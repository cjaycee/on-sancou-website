/**
 * Navbar Component — ON Running Showcase
 *
 * Design Philosophy: Minimalist Black & White
 * - Transparent on hero, transitions to white on scroll
 * - ON logo (wordmark "on") at far left
 * - Nav links: Shop, Activities, Explore
 * - Right icons: Search, Cart, Profile
 * - Inter font throughout (ON Brand)
 */

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white border-b border-gray-200 shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className='max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between'>
          {/* ON Logo */}
          <a href='/' className='flex items-center group'>
            <ONLogo scrolled={scrolled} />
          </a>

          {/* Center Nav Links */}
          <div className='hidden md:flex items-center gap-8'>
            {['Shop', 'Activities', 'Explore'].map((item) => (
              <a
                key={item}
                href='#'
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  scrolled
                    ? 'text-stone-800 hover:text-stone-950'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-stone-800' : 'bg-white'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className='flex items-center gap-1'>
            {[
              { Icon: Search, label: 'Search' },
              { Icon: ShoppingBag, label: 'Cart' },
              { Icon: User, label: 'Profile' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  scrolled
                    ? 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={19} strokeWidth={1.6} />
              </button>
            ))}

            {/* Mobile menu toggle */}
            <button
              className={`md:hidden p-2.5 rounded-full transition-colors duration-200 ${
                scrolled
                  ? 'text-stone-700 hover:bg-stone-100'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label='Toggle menu'
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className='fixed inset-0 z-40 bg-white flex flex-col pt-20 px-8'
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className='flex flex-col gap-6 mt-8'>
              {['Shop', 'Activities', 'Explore'].map((item, i) => (
                <motion.a
                  key={item}
                  href='#'
                  className='text-3xl font-semibold text-stone-900 tracking-tight'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ONLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <svg
      width='36'
      height='36'
      viewBox='0 0 100 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='transition-all duration-300'
    >
      {/* ON Running logo — stylized "on" wordmark */}
      <circle
        cx='50'
        cy='50'
        r='48'
        fill={scrolled ? '#1a1a1a' : 'white'}
        className='transition-colors duration-300'
      />
      <text
        x='50'
        y='67'
        textAnchor='middle'
        fontSize='42'
        fontWeight='700'
        fontFamily='DM Sans, sans-serif'
        fill={scrolled ? 'white' : '#1a1a1a'}
        letterSpacing='-1'
        className='transition-colors duration-300'
      >
        on
      </text>
    </svg>
  );
}
