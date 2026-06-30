"use client";

import { motion } from "framer-motion";
import { Search, ShieldAlert, Type, DownloadCloud, Zap, Lock } from "lucide-react";
import { useTrackVisibility } from "@/analytics/hooks/useTrackVisibility";

const features = [
  {
    icon: <Search className="w-6 h-6 text-brand-accent-secondary" />,
    title: "Clause-Level Comparison",
    description: "Benchmark incoming redlines against your past signed agreements to know exactly what's standard.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-brand-risk" />,
    title: "AI Risk Detection",
    description: "Automatically flag hidden liability shifts and unusual requests.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Type className="w-6 h-6 text-brand-text-primary" />,
    title: "Plain-English Summaries",
    description: "No legal degree required. We translate complex legal jargon into actionable business insights.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-warning" />,
    title: "60-Second Review Time",
    description: "Cut your contract review bottleneck from days to minutes. Keep deal momentum alive.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <DownloadCloud className="w-6 h-6 text-brand-success" />,
    title: "Export & Sharing",
    description: "Instantly export a clean, annotated PDF to share with legal.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <Lock className="w-6 h-6 text-brand-text-secondary" />,
    title: "Enterprise Security",
    description: "SOC 2 Type II compliant. We do not train models on your data.",
    colSpan: "md:col-span-1",
  }
];

export function Features() {
  const sectionRef = useTrackVisibility('features', 'Features');

  return (
    <section ref={sectionRef} id="features" className="py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Everything you need to <span className="text-gradient">close with confidence.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`glass p-8 rounded-3xl relative overflow-hidden group ${feature.colSpan}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 border border-black/ group-hover:border-black/ transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-brand-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-brand-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
