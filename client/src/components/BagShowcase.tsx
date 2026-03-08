/**
 * BagShowcase Component — ON Running Showcase
 *
 * Design Philosophy: Minimalist Black & White
 * - Asymmetric two-column layout: large product image left, editorial copy right
 * - Inter font throughout (ON Brand)
 * - Strict black and white color scheme
 * - ON Red (#E8002D) for CTA button only
 * - Scroll-triggered entrance animations
 */

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Package } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Work-Ready',
    desc: 'Dedicated laptop sleeve and organizer pockets for the office.',
  },
  {
    icon: Shield,
    title: 'Weather Resistant',
    desc: 'Durable ripstop fabric keeps your gear dry in any condition.',
  },
  {
    icon: Package,
    title: 'Versatile Carry',
    desc: 'Converts from backpack to tote in seconds.',
  },
];

interface BagShowcaseProps {
  onCustomizeClick?: () => void;
}

export default function BagShowcase({ onCustomizeClick }: BagShowcaseProps = {}) {
  return (
    <section className='py-24 bg-white overflow-hidden' id='sancou-bag'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-10'>
        {/* Section Label */}
        <motion.p
          className='text-xs tracking-[0.25em] uppercase text-gray-600 mb-16 font-medium'
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Product
        </motion.p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* Product Image — Left */}
          <motion.div
            className='relative'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background accent */}
            <div className='absolute -inset-4 bg-gray-100 rounded-sm -z-10' />

            {/* Tag */}
            <div className='absolute top-6 left-6 z-10'>
              <span className='text-[10px] font-semibold tracking-widest uppercase bg-[#E8002D] text-white px-3 py-1.5'>
                New Arrival
              </span>
            </div>

            <div className='aspect-square bg-gray-100 overflow-hidden'>
              <motion.img
                src='https://d2xsxph8kpxj0f.cloudfront.net/310519663413077715/2tvVjtBDNzowZggfXUU3ZW/on-bag-product-52AE8HphSJq72d5LNceywA.webp'
                alt='Sancou Bag by ON Running'
                className='w-full h-full object-contain p-10'
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Floating price badge */}
            <motion.div
              className='absolute -bottom-4 -right-4 bg-black text-white px-5 py-3'
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <p className='text-xs text-white/50 tracking-widest uppercase mb-0.5'>From</p>
              <p className='text-xl font-bold tracking-tight'>$129.99</p>
            </motion.div>
          </motion.div>

          {/* Product Copy — Right */}
          <motion.div
            className='flex flex-col gap-6'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div>
              <p className='text-xs tracking-[0.2em] uppercase text-[#E8002D] font-semibold mb-3' style={{ fontFamily: "'Inter', sans-serif" }}>
                Sancou Bag
              </p>
              <h2
                className='text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-black leading-tight'
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                Designed for
                <br />
                <em className='not-italic text-gray-600'>work and play.</em>
              </h2>
            </div>

            <p className='text-gray-700 text-base leading-relaxed max-w-md' style={{ fontFamily: "'Inter', sans-serif" }}>
              The Sancou Bag blurs the line between performance gear and everyday carry.
              Engineered with ON's signature attention to detail — lightweight, organized,
              and built to move with you from morning run to boardroom.
            </p>

            {/* Feature List */}
            <div className='flex flex-col gap-4 py-2'>
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className='flex items-start gap-4'
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5'>
                    <f.icon size={15} className='text-gray-700' />
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-black mb-0.5' style={{ fontFamily: "'Inter', sans-serif" }}>{f.title}</p>
                    <p className='text-xs text-gray-600 leading-relaxed' style={{ fontFamily: "'Inter', sans-serif" }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className='w-full h-px bg-gray-300' />

            {/* CTA Row */}
            <div className='flex items-center gap-4'>
              <button
                onClick={onCustomizeClick}
                className='group flex items-center gap-3 px-8 py-3.5 bg-[#E8002D] text-white text-sm font-medium tracking-wide hover:bg-[#c0001f] transition-colors duration-300'
              >
                Customize Your Bag
                <ArrowRight
                  size={16}
                  className='transition-transform duration-300 group-hover:translate-x-1'
                />
              </button>
              <button className='text-sm font-medium text-gray-700 hover:text-black underline underline-offset-4 transition-colors duration-200' style={{ fontFamily: "'Inter', sans-serif" }}>
                Learn More
              </button>
            </div>

            {/* Color swatches */}
            <div className='flex items-center gap-3'>
              <span className='text-xs text-gray-600 tracking-wide uppercase' style={{ fontFamily: "'Inter', sans-serif" }}>Colors</span>
              {['#1A1A1A', '#4A5568', '#8B7355', '#2D3748'].map((color) => (
                <button
                  key={color}
                  className='w-5 h-5 rounded-full border-2 border-transparent hover:border-stone-400 transition-all duration-200'
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
