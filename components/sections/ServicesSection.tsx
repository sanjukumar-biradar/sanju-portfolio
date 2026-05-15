import { motion } from 'framer-motion';
import { Globe, Brain, Smartphone, Gamepad2, FileSpreadsheet, QrCode } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const ServicesSection = () => {
  const services = [
    { icon: Globe, title: 'Website Development', desc: 'Stunning, responsive websites built with React & Next.js', color: 'from-blue-500 to-indigo-500' },
    { icon: Brain, title: 'AI Tools & Solutions', desc: 'Custom AI chatbots, automation, and smart systems', color: 'from-purple-500 to-pink-500' },
    { icon: Smartphone, title: 'Mobile App Development', desc: 'Cross-platform apps for iOS and Android', color: 'from-pink-500 to-rose-500' },
    { icon: Gamepad2, title: 'Unity Game Development', desc: 'Engaging 2D/3D games with immersive experiences', color: 'from-emerald-500 to-teal-500' },
    { icon: FileSpreadsheet, title: 'Excel Automation', desc: 'Advanced macros, VBA, and data processing solutions', color: 'from-amber-500 to-orange-500' },
    { icon: QrCode, title: 'QR Scanner Services', desc: 'Custom QR solutions for business and payments', color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto">Premium digital solutions tailored to your business needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-8 h-full" glow>
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};