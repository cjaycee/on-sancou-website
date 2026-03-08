/**
 * Bag3DShowcase Component — Interactive 3D-style bag visualization
 *
 * Uses CSS 3D transforms and animations to create a dynamic,
 * interactive product showcase with rotating bag imagery.
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BAG_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663413077715/2tvVjtBDNzowZggfXUU3ZW/on-bag-product-52AE8HphSJq72d5LNceywA.webp';

export default function Bag3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
      setRotation({
        x: (y - 0.5) * 20,
        y: (x - 0.5) * -20,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className='w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-stone-900 via-black to-stone-950'
      style={{ perspective: '1000px' }}
    >
      {/* Ambient light effect */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-[#E8002D] rounded-full filter blur-3xl opacity-20' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10' />
      </div>

      {/* 3D Bag Container */}
      <motion.div
        className='relative w-80 h-96'
        style={{
          transformStyle: 'preserve-3d',
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Main bag image with shadow */}
        <div className='absolute inset-0 flex items-center justify-center'>
          {/* Glow effect */}
          <div className='absolute inset-0 bg-gradient-to-t from-[#E8002D]/20 to-transparent rounded-3xl blur-2xl' />

          {/* Bag image */}
          <motion.img
            src={BAG_IMAGE}
            alt='Sancou Bag 3D'
            className='w-full h-full object-contain drop-shadow-2xl'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              filter: 'drop-shadow(0 20px 60px rgba(232, 0, 45, 0.3))',
            }}
          />
        </div>

        {/* Subtle shine effect */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none' />
      </motion.div>

      {/* Floating specs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-white rounded-full opacity-30'
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: '50%',
            }}
          />
        ))}
      </div>

      {/* Info text */}
      <div className='absolute bottom-8 left-8 right-8 text-center'>
        <p className='text-xs text-stone-400 tracking-widest uppercase'>
          Hover to rotate • Modular • Customizable
        </p>
      </div>
    </div>
  );
}
