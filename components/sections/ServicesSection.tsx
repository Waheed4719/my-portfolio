'use client';

import { motion } from 'framer-motion';
import {
  FaBug,
  FaChartLine,
  FaGlobe,
  FaPalette,
  FaServer,
} from 'react-icons/fa';
import SectionHeading from '@/components/ui/SectionHeading';
import { services } from '@/lib/data';

const iconMap: Record<string, React.ReactNode> = {
  globe: <FaGlobe size={22} />,
  design: <FaPalette size={22} />,
  api: <FaServer size={22} />,
  chart: <FaChartLine size={22} />,
  bug: <FaBug size={22} />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <SectionHeading
        eyebrow="Services"
        title="What I can help you build"
        description="End-to-end delivery — from pixel-perfect UI to production APIs."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -6 }}
            className="glass group rounded-2xl p-6 transition hover:border-brand/30 hover:shadow-[0_20px_60px_rgba(255,74,87,0.08)]"
          >
            <div className="mb-5 inline-flex rounded-xl bg-brand/10 p-3 text-brand transition group-hover:bg-brand group-hover:text-white">
              {iconMap[service.icon]}
            </div>
            <h3 className="font-display text-xl font-semibold">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
