/**
 * Home Page — ON Running Showcase
 *
 * Design Philosophy: Minimalist Black & White with High-Quality Commute Lifestyle Imagery
 * Font: Inter (ON Brand Primary)
 * Sections:
 *   1. Transparent Navbar
 *   2. Hero with Commute Background Image
 *   3. Sancou Bag Showcase with Customization Quiz
 *   4. Shop Section
 *   5. Footer
 */

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import BagShowcase from '@/components/BagShowcase';
import ShopSection from '@/components/ShopSection';
import CustomizationQuiz from '@/components/CustomizationQuiz';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube } from 'lucide-react';

const COMMUTE_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663413077715/2tvVjtBDNzowZggfXUU3ZW/on-commute-hero-bg-cCmroYKyWfysprJyE333wa.webp';

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      {/* Fixed Transparent Navbar */}
      <Navbar />

      {/* Hero: Commute Lifestyle Background */}
      <section className='relative w-full h-screen overflow-hidden'>
        {/* Background Image */}
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: `url('${COMMUTE_BG}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          {/* Dark overlay for text readability */}
          <div className='absolute inset-0 bg-black/40' />
        </div>

        {/* Content */}
        <div className='relative z-10 h-full flex items-center'>
          <div className='max-w-[1400px] mx-auto px-6 md:px-10 w-full'>
            <div className='max-w-2xl'>
              <motion.h1
                className='text-6xl md:text-7xl font-bold text-white leading-tight'
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Sancou Bag
              </motion.h1>
              <motion.p
                className='mt-6 text-white max-w-xl text-lg leading-relaxed'
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Designed for work and play. Engineered for every adventure. The Sancou Bag is modular, customizable, and built to move with you.
              </motion.p>
              <motion.div
                className='flex gap-4 mt-8'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <button
                  onClick={() => setShowQuiz(true)}
                  className='px-8 py-3.5 bg-black text-white text-sm font-medium tracking-wide hover:bg-[#1A1A1A] transition-colors duration-300'
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Customize Your Bag
                </button>
                <button
                  className='px-8 py-3.5 border border-white text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors duration-300'
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Explore Features
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sancou Bag Showcase Section */}
      <BagShowcase onCustomizeClick={() => setShowQuiz(true)} />

      {/* Shop Section: Shoes | Apparel | Accessories */}
      <ShopSection />

      {/* Footer */}
      <Footer />

      {/* Customization Quiz Modal */}
      {showQuiz && (
        <CustomizationQuiz onClose={() => setShowQuiz(false)} />
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className='bg-black text-white py-16'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-10'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 mb-12'>
          {/* Brand */}
          <div className='md:col-span-1'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-9 h-9 bg-white rounded-full flex items-center justify-center'>
                <span
                  className='text-black font-bold text-sm'
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  on
                </span>
              </div>
              <span className='text-white font-semibold tracking-wide' style={{ fontFamily: "'Inter', sans-serif" }}>ON Running</span>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed' style={{ fontFamily: "'Inter', sans-serif" }}>
              Born in the Swiss Alps. Built for every surface on Earth.
            </p>
            <div className='flex gap-3 mt-5'>
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className='w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors duration-200'
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Shop',
              links: ['Running Shoes', 'Trail Shoes', 'Apparel', 'Accessories', 'Bags'],
            },
            {
              title: 'Activities',
              links: ['Road Running', 'Trail Running', 'Hiking', 'Tennis', 'Everyday'],
            },
            {
              title: 'Company',
              links: ['About ON', 'Sustainability', 'Careers', 'Press', 'Contact'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className='text-xs font-semibold tracking-[0.2em] uppercase text-gray-300 mb-4' style={{ fontFamily: "'Inter', sans-serif" }}>
                {col.title}
              </h4>
              <ul className='space-y-2.5'>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-sm text-gray-500 hover:text-gray-200 transition-colors duration-200'
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-gray-600' style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2026 ON Running. All rights reserved. This is a showcase demo.
          </p>
          <div className='flex gap-6'>
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <a
                key={item}
                href='#'
                className='text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200'
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
