import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, QrCode } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { AnimatedButton } from '../AnimatedButton';
import { Product } from '@/types';

interface StoreSectionProps {
  onAddToCart: (product: Product) => void;
}

export const StoreSection = ({ onAddToCart }: StoreSectionProps) => {
  const products: Product[] = [
    { id: '1', name: 'Business Website Package', price: 9999, description: 'Complete business website with CMS', category: 'Web' },
    { id: '2', name: 'AI Chatbot Integration', price: 4999, description: 'Custom AI assistant for your business', category: 'AI' },
    { id: '3', name: 'E-Commerce Store', price: 14999, description: 'Full online store with payment gateway', category: 'E-Commerce' },
    { id: '4', name: 'Mobile App Development', price: 24999, description: 'iOS & Android cross-platform app', category: 'Mobile' },
    { id: '5', name: 'Excel Automation Suite', price: 2999, description: 'Advanced macros and data processing', category: 'Automation' },
    { id: '6', name: 'Unity Game Project', price: 19999, description: '2D/3D game development', category: 'Game' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Web', 'AI', 'E-Commerce', 'Mobile', 'Automation', 'Game'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="store" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Store</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto">Premium digital products and services</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <GlassCard className="p-8 mb-8" glow>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">QR Scanner Services</h3>
              <p className="text-slate-400 mb-4">Upload your QR code or scanner image for instant processing and verification.</p>
            </div>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-indigo-500/30 transition-colors cursor-pointer min-w-[200px]">
              <p className="text-slate-400 text-sm">Click to upload QR image</p>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-6 h-full flex flex-col" glow>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-slate-400 text-sm mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-indigo-400">₹{product.price}</span>
                    <AnimatedButton
                      onClick={() => onAddToCart(product)}
                      icon={ShoppingCart}
                      className="px-4 py-2 text-sm"
                    >
                      Add to Cart
                    </AnimatedButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};