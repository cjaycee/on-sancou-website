/**
 * ShopSection Component — ON Running Showcase
 *
 * Design Philosophy: Minimalist Black & White
 * - Tab-based navigation: Shoes | Apparel | Accessories
 * - Product cards with hover lift and subtle shadow
 * - Inter font throughout (ON Brand)
 * - ON Red (#E8002D) for CTAs and active tab indicator
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Category = 'Shoes' | 'Apparel' | 'Accessories';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  tag?: string;
  bgColor: string;
}

const products: Record<Category, Product[]> = {
  Shoes: [
    {
      id: 'cloudmonster',
      name: 'Cloudmonster 2',
      subtitle: 'Maximum cushion. Maximum energy return.',
      price: '$169.99',
      image: 'https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663413077715/kkpAkYbsaxRcyIBS.jpg?Expires=1804476532&Signature=UtFfvaUWI990Fp5wLUBWot5GD2j4PO0eTZ2OFqDhIoBM8~-GdivQC2So7ubZc3IHXUfsYCiKIpiRhiEOkFgSQCX1dzHOZgsdnaMfVgjp~FKj8fg6kDG8IVbx6dakXI7lTtRAQ5FKmsc6-HjmbaqN6Pz3oNKZGXr8~nrwYcliTtdbgpAPHtv1DK51BqHOx94hVHhXvcQ3YU4GAzdiHvD-aBBEAr1kloigXojA3un1b4~Y7eaCN2JkDLa-cFx1Zolw8uh1t1PpEyXZ0DiKuFHthKSozH0wMn0dGSa4Xe4jLs90ngGW2kYXrh3V1iO~fOmjSlTFUWc3TYoZL~JhB4gT-A__&Key-Pair-Id=K2HSFNDJXOU9YS',
      tag: 'Best Seller',
      bgColor: 'bg-gray-100',
    },
    {
      id: 'cloudflow',
      name: 'Cloudflow 4',
      subtitle: 'Lightweight speed for every run.',
      price: '$149.99',
      image: 'https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663413077715/BlMKuYsNzjhbkqvS.jpg?Expires=1804476532&Signature=E0ZE2ikXRNmSud-k7H0a25A1pYwqM2b3vMY90ccr6pldTcd~2fj1p7pZJaaO9kC5RRQSKIrtSxnr3v1NV0zWcGSbS7jLXB4kjPLglwwM7UkNNSPxon9sLErT7YtnYle2HMXPp6Ea430irhzs1z5aGuaQP88R5zFOhMYGhXo8-ajFB-OW3Wp67kk1BfwXeLYlwYO30yGw2XvZyguDN2lS4eerGDLmVvkYcK24WB8f-~kbMBa7FbnC26MFzTbv3OTMDyqa9T2fFPHh2fPdvSFb7Hldgq0sUSKdXCPhgJD1MXNGD8yA3fPpHCsfD4~dUxiBmA-dbfSGxgsBMWFIXUsUhg__&Key-Pair-Id=K2HSFNDJXOU9YS',
      bgColor: 'bg-gray-100',
    },
    {
      id: 'cloudultra',
      name: 'Cloudultra 2',
      subtitle: 'Ultratrail. Unlimited distance.',
      price: '$179.99',
      image: 'https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663413077715/uTvHoGekEAmsFsJD.jpg?Expires=1804476532&Signature=XjgSYHjoKH4f~VK1XKMR5QxwuTeBQe7VshDeGWwOW7Pqpb~aK9mDPIlAzDuZxxDUF-qYGKCMQrFkzFYta7ZA2MyKq-NSpF0vBsb2q6Ln-yUyDjnPtrnOp7IDKG2pBVWOd93sMWF4rDxqKUwpyriLYQFRsF~qR3Cs0jKGYoVh3PTlKFhdV1LZE7KF5jVY61HjnTP3PsHb6GUCvqGKY7MZ5RmjcxzN8LFWz7IMHoWy8zMZ~zktxe5rrNkMWMBLM-qzzTtNC35x1zyCgi8o3Ah~ltArfKYfjipfznnL3INjzIfs-LlB~55cT7aLummCLCW9tefPJ3g4gwOI3I8uWethPg__&Key-Pair-Id=K2HSFNDJXOU9YS',
      tag: 'New',
      bgColor: 'bg-gray-100',
    },
  ],
  Apparel: [
    {
      id: 'weather-jacket',
      name: 'Weather Jacket',
      subtitle: 'Wind and water resistant. Always ready.',
      price: '$199.99',
      image: 'https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663413077715/djrsqEDDNDZvXQKx.png?Expires=1804476020&Signature=ALm7HPNoZBCsA3vRVfpV60DegfRwZHFJ7X-GqQi2kPBYzJ8TrzzV9v-zsRySwc4yH4m0us~qHGnlIUxnI0PZnSdZ9B1bvo2bNT2krqyZQCf2SPdssVsP5f-IXz4t2lkXlSU40LI-rEcHdFveqk-xfcYBJcPOFQQBPvX6ccfsYyu1yd-r6TwWvSNXad18Zfu5HRQJzVTmIRfuj-L2AfO0vHVuQF3zBYRPJ4uLfCLKi~BL8zJVzbKvX-28T33dn0V~fGk7LETVpyT2FWomJCMspqpU7bWFR6~0ZF3WIdCrjTA~SwI4q0G2YrNqbCD~jEYsVFAsFjLzr7hNG~cXc4VouQ__&Key-Pair-Id=K2HSFNDJXOU9YS',
      tag: 'Featured',
      bgColor: 'bg-gray-100',
    },
    {
      id: 'performance-tee',
      name: 'Performance Tee',
      subtitle: 'Breathable. Lightweight. Built for movement.',
      price: '$59.99',
      image: 'https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663413077715/SRvDZWTJMCmhZHBG.jpg?Expires=1804476020&Signature=JdspYwWWX4D1gUOqI4hR71QvC9MvSNIhNLK7s-b95zTh5wYTaxbB2C50rUnJVHjIXdy9JyTvF0E-qGM7Y0CMwDqoALbvIZGb47DHKRpacNCTW5gCv8n3FrFJwoE5NnVOiHkg98j620ojR~CPglik1TCSCsBmITlAcHtmsOOAxtk9EJf58bdIcAQNLuE4cv54UjN5qfRQn8vx63dfe~ihocdT9ucPVcByqUWX7jXZmqbc5pKvTSpFlqNl5pv6GLmUaqO9KLwqV9rdWcd-yykl1EuaNqCERD~3V8GyVvLZcvFdVswXwaku9wG7OR-Tifiuq297xpQdVK~Bj6JNlXRIIw__&Key-Pair-Id=K2HSFNDJXOU9YS',
      bgColor: 'bg-gray-100',
    },
    {
      id: 'running-shorts',
      name: 'Running Shorts',
      subtitle: 'Freedom of movement. Every stride.',
      price: '$79.99',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop',
      bgColor: 'bg-gray-100',
    },
  ],
  Accessories: [
    {
      id: 'lightweight-cap',
      name: 'Lightweight Cap',
      subtitle: 'Ventilated. Adjustable. Packable.',
      price: '$39.99',
      image: 'https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663413077715/fGFkmQZUqVAKdJJw.jpg?Expires=1804476020&Signature=Wbj2m0kvSJzjSFfaN03ofWi1fX3itkM8tRZb3Kd4bdYGunZBASgMQIksAT~jr-XMoS7iBOtXVct~5GnK~VPMh84J~EvAUcPqfxjD-aUuXbjIw~CZT7Gn5ZBPwla7Mq3hL6odxhK0LbbKbqb8NIBbspNAtiIQTnyxafp14SP00QnN5Ccap0qLwK5ln2flm8L990oMBeR9nDbNQv7u9Tb2iHZlnNGyHSObdZl8wIFKbB6RkbMgMcn-5fpiubLi~~5Xwq5-90-Jbg1J65uEMmtLMaHI63ZMKWRSJmZ2j5sx123A4QXKYSQIzSSbImpa7ChJVIBai77MIfbPRcU5KLrMQQ__&Key-Pair-Id=K2HSFNDJXOU9YS',
      tag: 'Popular',
      bgColor: 'bg-gray-100',
    },
    {
      id: 'sancou-bag',
      name: 'Sancou Bag',
      subtitle: 'Designed for work and play.',
      price: '$129.99',
      image: 'https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663413077715/wdKOdUVPZDIjWxul.jpg?Expires=1804476020&Signature=biPIGkUQqjAbaqRyeAeP1qaQrAgfNLQFtUgZgXYgKqoE-rmwZOmoF2WTQf~7wRnZ70se4y~osN7Hrfr793bdRIyqWH7IZwXs4oZnb3iM6N89HnSuHcaAYUF28h1qqLdy5uHYuckvBpJTKqWYv9ZRoLxBRRR1Iz4sXvDgK27YJzLyxCfmUslqKOSflVwmTWRGxjPonT8bV2QeUfqvZ524NFQqvogowQWP9m7DVez8u3bJm27MSrwMeVr~GPq9ZgzDpm-8TMdrF5vsVqx9KE0OVSFhJcD5gl024QtR7RSJLcBeW4W9RHdTHsVHNamiu77zHdIH4Vf7Z9X18FZEBgfnGA__&Key-Pair-Id=K2HSFNDJXOU9YS',
      tag: 'New',
      bgColor: 'bg-gray-100',
    },
    {
      id: 'tote-bag',
      name: 'Tote Bag',
      subtitle: 'Minimal carry. Maximum style.',
      price: '$89.99',
      image: 'https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663413077715/wOTdELOxxlIQhALg.jpg?Expires=1804476020&Signature=d6gVVSwGLrFEgo8KBxUg3WLpRguoj~AGVAYIrMCDLhRhbd0lVAduQaGxtwd-K4EIFhlS61KWFEqjQQmTnkLRW3y~zbZktgT8ZNBAS9-P074~Ckjw6tvrpGZyTIgBcX68MEC8lTotPaDZ5XpMCTXnfpWGcTRXap~YqRVIfBY62IpcmhJgZw5YRgjJ2cz-sxu5b9WA3al~vrMZc6rlJd8szdL6ROxUknR46IZiC18dICSM483kasAaj5-gJv3gbXqawazMNISiVKFWie7nhQ4DGFftbMjRP47bQ1xzt1-lW9d1S8M4IACgiuRSZ57eB0N1PcLe-hQNPvRWKfwrFDfJmQ__&Key-Pair-Id=K2HSFNDJXOU9YS',
      bgColor: 'bg-gray-100',
    },
  ],
};

export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Shoes');

  return (
    <section className='py-24 bg-[#FAFAF8]' id='shop'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-10'>
        {/* Section Header */}
        <motion.div
          className='mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className='text-xs tracking-[0.25em] uppercase text-stone-400 mb-3 font-medium'>
            Explore the Collection
          </p>
          <h2
            className='text-4xl md:text-5xl font-bold text-stone-900 mb-6'
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop ON
          </h2>

          {/* Category Tabs */}
          <div className='flex gap-0 border-b border-stone-200'>
            {(['Shoes', 'Apparel', 'Accessories'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'text-stone-900'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8002D]'
                    layoutId='tab-indicator'
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCategory}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {products[activeCategory].map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          className='mt-12 flex justify-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button className='group flex items-center gap-3 px-8 py-3.5 bg-[#1A1A1A] text-white text-sm font-medium tracking-wide hover:bg-[#E8002D] transition-colors duration-300 rounded-none'>
            View All {activeCategory}
            <ArrowRight
              size={16}
              className='transition-transform duration-300 group-hover:translate-x-1'
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className='group cursor-pointer'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden ${product.bgColor} aspect-square mb-4`}
        style={{ borderRadius: '2px' }}
      >
        {product.tag && (
          <span className='absolute top-4 left-4 z-10 text-[10px] font-semibold tracking-widest uppercase bg-[#E8002D] text-white px-2.5 py-1'>
            {product.tag}
          </span>
        )}
        <motion.img
          src={product.image}
          alt={product.name}
          className='w-full h-full object-contain p-6'
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Quick Add Overlay */}
        <motion.div
          className='absolute inset-x-0 bottom-0 bg-[#1A1A1A] text-white text-xs font-medium tracking-widest uppercase py-3 text-center'
          initial={{ y: '100%' }}
          animate={{ y: hovered ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Quick Add
        </motion.div>
      </div>

      {/* Product Info */}
      <div className='space-y-1'>
        <div className='flex items-start justify-between'>
          <h3
            className='text-base font-semibold text-stone-900 leading-tight'
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {product.name}
          </h3>
          <span className='text-sm font-medium text-stone-700 ml-4 shrink-0'>
            {product.price}
          </span>
        </div>
        <p className='text-xs text-stone-500 leading-relaxed'>{product.subtitle}</p>
      </div>
    </motion.div>
  );
}
