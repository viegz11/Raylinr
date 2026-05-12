"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, FileText, Lock, Play } from "lucide-react";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-accent/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-brand-accent-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-accent/10 border border-brand-accent/20 text-brand-accent-secondary flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Fast contract redlining
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Catch risky contract changes{" "}
            <span className="text-gradient-accent">before you sign.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-brand-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            raylinr reads every redlined contract in seconds, flags what&apos;s risky, and tells your team exactly what needs attention &mdash; so deals close faster and nothing slips through.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <WaitlistForm source="hero" />
            
            <div className="mt-4">
              <Link
                href="#demo"
                className="w-full sm:w-auto px-8 py-3 glass text-brand-text-primary rounded-xl font-bold text-base hover:bg-black/5 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" /> Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Trust Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-brand-text-secondary font-medium"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-success" /> SOC2 Ready
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-accent-secondary" /> AI-Assisted Review
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-text-secondary" /> Enterprise Secure
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-text-secondary" /> Export PDF
            </div>
          </motion.div>
        </div>

        {/* Hero Visual UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main App Window Mockup */}
          <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-black/10 ring-1 ring-black/5">
            <div className="h-12 border-b border-black/5 bg-black/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto bg-black/5 rounded-md px-32 py-1 text-xs text-brand-text-secondary flex items-center gap-2">
                <Lock className="w-3 h-3" /> raylinr.com/compare/msa-v2
              </div>
            </div>
            
            <div className="grid grid-cols-2 h-[450px] bg-brand-surface/50">
              {/* Original Document */}
              <div className="p-8 border-r border-black/5 overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-semibold px-2 py-1 bg-black/5 rounded text-brand-text-secondary">Original MSA</span>
                </div>
                <div className="space-y-4 text-sm text-brand-text-secondary font-serif leading-relaxed">
                  <p>3.1 Payment Terms. Customer shall pay all undisputed invoices within <span className="bg-brand-risk/20 text-brand-risk px-1 rounded line-through">thirty (30)</span> days of receipt.</p>
                  <p>7.2 Liability Cap. In no event shall either party's aggregate liability exceed <span className="bg-brand-warning/20 text-brand-warning px-1 rounded line-through">the total fees paid by Customer</span> in the twelve (12) months preceding the claim.</p>
                  <p>8.1 Termination. Either party may terminate this Agreement for convenience with thirty (30) days prior written notice.</p>
                </div>
              </div>

              {/* Redlined Document */}
              <div className="p-8 bg-brand-surface overflow-hidden relative">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-semibold px-2 py-1 bg-brand-accent/10 text-brand-accent rounded">Redlined Version (Received Today)</span>
                </div>
                <div className="space-y-4 text-sm text-brand-text-primary font-serif leading-relaxed">
                  <p>3.1 Payment Terms. Customer shall pay all undisputed invoices within <span className="bg-brand-risk/20 text-brand-risk px-1 border-b border-brand-risk font-semibold">ninety (90)</span> days of receipt.</p>
                  <p>7.2 Liability Cap. In no event shall either party's aggregate liability exceed <span className="bg-brand-warning/20 text-brand-warning px-1 border-b border-brand-warning font-semibold">two times (2x) the total fees paid by Customer</span> in the twelve (12) months preceding the claim.</p>
                  <p>8.1 Termination. Either party may terminate this Agreement for convenience with thirty (30) days prior written notice.</p>
                </div>

                {/* Floating AI Tooltips */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  className="absolute top-20 -right-6 glass bg-brand-surface border-l-4 border-l-brand-risk p-4 rounded-xl shadow-xl w-64 z-20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-risk uppercase tracking-wider">High Risk</span>
                    <span className="text-[10px] text-brand-text-secondary">Clause 3.1</span>
                  </div>
                  <p className="text-sm text-brand-text-primary font-medium mb-1">Payment terms extended to Net 90</p>
                  <p className="text-xs text-brand-text-secondary">You have never accepted beyond Net 45 in the past 3 years. Pushes revenue recognition to next quarter.</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                  className="absolute top-52 -right-4 glass bg-brand-surface border-l-4 border-l-brand-warning p-4 rounded-xl shadow-xl w-64 z-20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-warning uppercase tracking-wider">Medium Risk</span>
                    <span className="text-[10px] text-brand-text-secondary">Clause 7.2</span>
                  </div>
                  <p className="text-sm text-brand-text-primary font-medium mb-1">Liability cap increased to 2x</p>
                  <p className="text-xs text-brand-text-secondary">Standard playbook allows 1x. This exposes the company to double the standard liability.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
