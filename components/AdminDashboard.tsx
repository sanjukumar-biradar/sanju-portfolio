import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Edit2, Trash2, Search, Filter, Upload } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';
import { Product } from '@/types';

export const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'users' | 'content'>('products');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Website Package', price: 9999, description: 'Full website development', category: 'Web' },
    { id: '2', name: 'AI Chatbot', price: 4999, description: 'Custom AI assistant', category: 'AI' },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, {
        id: Date.now().toString(),
        name: newProduct.name,
        price: Number(newProduct.price),
        description: newProduct.description,
        category: newProduct.category,
      }]);
      setNewProduct({ name: '', price: '', description: '', category: '' });
      setShowAddForm(false);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <motion.div className="min-h-screen p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your business</p>
          </div>
          <AnimatedButton variant="secondary" onClick={onLogout} icon={LogOut}>
            Logout
          </AnimatedButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Products', value: products.length, color: 'from-indigo-500 to-blue-500' },
            { label: 'Total Users', value: '156', color: 'from-purple-500 to-pink-500' },
            { label: 'Revenue', value: '₹2.4L', color: 'from-emerald-500 to-teal-500' },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-6">
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </GlassCard>
          ))}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['products', 'users', 'content'] as const).map((tab) => (
            <motion.button
              key={tab}
              className={`px-4 py-2 rounded-xl capitalize font-medium transition-all ${
                activeTab === tab
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Products</h2>
              <AnimatedButton onClick={() => setShowAddForm(!showAddForm)} icon={Plus}>
                Add Product
              </AnimatedButton>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <GlassCard className="p-6 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                      />
                      <input
                        placeholder="Price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                      />
                      <input
                        placeholder="Category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 md:col-span-2"
                      />
                      <textarea
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 md:col-span-2 h-24 resize-none"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <AnimatedButton onClick={addProduct}>Save Product</AnimatedButton>
                      <AnimatedButton variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</AnimatedButton>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <GlassCard key={product.id} className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-indigo-400 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-indigo-400 mb-2">₹{product.price}</p>
                  <p className="text-slate-400 text-sm mb-3">{product.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {product.category}
                  </span>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Search className="w-5 h-5 text-slate-500" />
              <input
                placeholder="Search users..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
              <Filter className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-3">
              {['John Doe', 'Jane Smith', 'Mike Johnson'].map((name, i) => (
                <motion.div
                  key={name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{name}</p>
                    <p className="text-slate-400 text-sm">{name.toLowerCase().replace(' ', '.')}@email.com</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-300 border border-green-500/30">
                    Active
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        )}

        {activeTab === 'content' && (
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Website Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Hero Title</label>
                <input
                  defaultValue="Sanjukumar"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Hero Subtitle</label>
                <input
                  defaultValue="Full-Stack Developer & Digital Creator"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-indigo-500/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-400">Click to upload or drag and drop</p>
                </div>
              </div>
              <AnimatedButton>Save Changes</AnimatedButton>
            </div>
          </GlassCard>
        )}
      </div>
    </motion.div>
  );
};