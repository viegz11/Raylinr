"use client";

import { motion } from "framer-motion";
import { Clock, EyeOff, Scale, HelpCircle } from "lucide-react";

const painPoints = [
  {
    icon: <Clock className="w-6 h-6 text-brand-risk" />,
    title: "Sales Delays",
    description: "Deals stall for days waiting for a 92-minute manual legal review. The champion goes cold, and the quarter-end push is jeopardized."
  },
  {
    icon: <EyeOff className="w-6 h-6 text-brand-warning" />,
    title: "Missed Risky Edits",
    description: "9% of revenues are lost to poor contract management. A missed 5% price increase or liability shift can cost millions."
  },
  {
    icon: <Scale className="w-6 h-6 text-brand-accent-secondary" />,
    title: "Legal Bottlenecks",
    description: "In-house counsel spends 40% of their time acting as a glorified diff tool instead of focusing on strategic legal work."
  },
  {
    icon: <HelpCircle className="w-6 h-6 text-brand-text-secondary" />,
    title: "Procurement Confusion",
    description: "Hundreds of supplier amendments hide cost creep and out-of-playbook terms in massive, unreadable documents."
  }
];

export function SocialProof() {
  return (
    <section className="py-24 bg-brand-bg relative border-t border-black/">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Contract changes hide in <span className="text-brand-text-secondary">plain sight.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-brand-text-secondary"
          >
            Without AI-powered triage, every redline becomes a full legal escalation. The result? Lost time, lost money, and lost momentum.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glass p-6 rounded-2xl flex flex-col items-start text-left hover:bg-black/ transition-colors border border-black/"
            >
              <div className="p-3 bg-black/ rounded-xl mb-4 border border-black/">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-brand-text-primary mb-2">
                {point.title}
              </h3>
              <p className="text-brand-text-secondary text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
