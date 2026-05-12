"use client";

import { motion } from "framer-motion";
import { UploadCloud, Sparkles, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <UploadCloud className="w-8 h-8 text-brand-accent-secondary" />,
    title: "Upload your contracts",
    description: "Drag and drop your original MSA and the redlined version you just received. We support PDF, Word, and Google Docs."
  },
  {
    number: "02",
    icon: <Sparkles className="w-8 h-8 text-brand-accent" />,
    title: "AI detects changes",
    description: "In under 60 seconds, raylinr maps every change, categorizes the risk level, and translates legal jargon into plain English."
  },
  {
    number: "03",
    icon: <Share2 className="w-8 h-8 text-brand-success" />,
    title: "Share and decide",
    description: "Export a clean PDF summary or send a secure link to your legal team with your preliminary triage already completed."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-brand-surface/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            From inbox to insight in <span className="text-gradient-accent">60 seconds.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-brand-text-secondary"
          >
            No complex setup, no IT tickets, no 3-month implementation. Just upload and understand.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-8 relative border border-black/ group-hover:border-black/ transition-colors shadow-2xl">
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-bg border border-black/ flex items-center justify-center text-xs font-bold text-brand-text-secondary">
                  {step.number}
                </span>
                {step.icon}
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-brand-text-primary/0 group-hover:bg-brand-text-primary/5 transition-colors" />
              </div>
              <h3 className="text-2xl font-semibold text-brand-text-primary mb-4">
                {step.title}
              </h3>
              <p className="text-brand-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
