import { motion } from 'framer-motion';

export const SkillsSection = () => {
  const skills = [
    { name: 'React / Next.js', level: 95, color: 'from-cyan-500 to-blue-500' },
    { name: 'JavaScript / TypeScript', level: 90, color: 'from-yellow-500 to-amber-500' },
    { name: 'Python', level: 85, color: 'from-blue-500 to-indigo-500' },
    { name: 'AI & Machine Learning', level: 80, color: 'from-purple-500 to-pink-500' },
    { name: 'Unity / C#', level: 75, color: 'from-gray-500 to-slate-500' },
    { name: 'Excel / VBA Automation', level: 90, color: 'from-green-500 to-emerald-500' },
    { name: 'Mobile Development', level: 70, color: 'from-pink-500 to-rose-500' },
    { name: 'UI/UX Design', level: 85, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400">Technologies I master</p>
        </motion.div>

        <div className="space-y-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-indigo-400 font-bold">{skill.level}%</span>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};