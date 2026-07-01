"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Flame } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

export function Waitlist() {

  return (
    <section id="waitlist" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-brand-bg z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent-secondary/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-8 md:p-16 border border-black/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent pointer-events-none" />

          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-risk/10 text-brand-risk border border-brand-risk/20 mb-6">
              <Flame className="w-3.5 h-3.5" /> Limited beta seats remaining
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Be the first to review contracts in <span className="text-gradient">seconds.</span>
            </h2>
            <p className="text-lg text-brand-text-secondary max-w-xl mx-auto">
              Join the waitlist for AI-powered contract intelligence. 
            </p>
          </div>

          <div className="max-w-md mx-auto relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <WaitlistForm source="cta_bottom" />
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-brand-text-secondary">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-success" /> No spam, ever
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent-secondary" /> Early access starts soon
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" /> Priority for SaaS sales teams
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
