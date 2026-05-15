import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';
import { CartItem } from '@/types';

interface ShoppingCartProps {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export const ShoppingCartComponent = ({ cart, onClose, onRemove }: ShoppingCartProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div
      className="fixed inset-y-0 right-0 w-full max-w-md z-[80] bg-slate-900/95 backdrop-blur-xl border-l border-white/10"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Cart ({cart.length})
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
                layout
                exit={{ opacity: 0, x: 100 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                    <p className="text-indigo-400 font-bold mt-1">₹{item.price} x {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/10 pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400">Total</span>
              <span className="text-2xl font-bold text-white">₹{total}</span>
            </div>
            <AnimatedButton className="w-full justify-center">
              Proceed to Checkout
            </AnimatedButton>
          </div>
        )}
      </div>
    </motion.div>
  );
};