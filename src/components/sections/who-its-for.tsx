"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, Scale } from "lucide-react";

const audiences = [
  {
    icon: <TrendingUp className="w-8 h-8 text-brand-accent-secondary" />,
    role: "Sales Teams",
    outcome: "Close deals 50% faster.",
    description: "Stop waiting days for legal to read every redline. Know exactly what your prospect changed in 60 seconds, and keep the momentum alive over the weekend.",
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-brand-warning" />,
    role: "Procurement",
    outcome: "Stop vendor cost creep.",
    description: "Catch sneaky 5% price increases and SLA reductions buried in massive supplier amendments before they cost your company millions.",
  },
  {
    icon: <Scale className="w-8 h-8 text-brand-accent" />,
    role: "Legal Teams",
    outcome: "Focus on strategy.",
    description: "Pre-triage incoming contracts. Only spend your time on the high-risk clauses that genuinely require legal expertise, not scanning unchanged pages.",
  }
];

export function WhoItsFor() {
  return (
    <section className="py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Built for the speed of <span className="text-brand-text-secondary">modern business.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass p-8 rounded-3xl border border-black/ hover:border-black/ transition-colors"
            >
              <div className="mb-6">
                {audience.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-text-primary mb-2">
                {audience.role}
              </h3>
              <p className="text-lg font-medium text-brand-text-primary mb-4">
                {audience.outcome}
              </p>
              <p className="text-brand-text-secondary leading-relaxed">
                {audience.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
