import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';
import { UserData } from '@/types';

export const UserDashboard = ({ user, onLogout }: { user: UserData; onLogout: () => void }) => (
  <motion.div className="min-h-screen p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, {user.name}!</h1>
          <p className="text-slate-400">Your personal dashboard</p>
        </div>
        <AnimatedButton variant="secondary" onClick={onLogout} icon={LogOut}>
          Logout
        </AnimatedButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Your Orders</h3>
          <div className="space-y-3">
            {['Website Development', 'AI Chatbot Setup'].map((order) => (
              <div key={order} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-slate-300">{order}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">Completed</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Account Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Email</span>
              <span className="text-slate-300">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Member Since</span>
              <span className="text-slate-300">2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  </motion.div>
);