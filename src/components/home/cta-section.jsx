"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Globe, Droplets } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background -z-10" />

      {/* Content */}
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block text-primary font-semibold px-4 py-2 rounded-full bg-primary/10 mb-8"
          >
            Take Action Today
          </motion.span>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Be Part of the Solution
            <span className="block mt-2 text-primary">Make a Difference</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Join our global community of climate advocates. Together, we can create 
            meaningful change and build a sustainable future for generations to come.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 group"
            >
              <Link href="/take-action" className="flex items-center gap-2">
                Start Making an Impact
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <Link href="/learn-more">
                Explore Resources
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {[
              {
                icon: Globe,
                stat: "150+",
                label: "Countries Involved"
              },
              {
                icon: Leaf,
                stat: "1M+",
                label: "Actions Taken"
              },
              {
                icon: Droplets,
                stat: "500K+",
                label: "Active Members"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-3xl font-bold text-foreground">{item.stat}</span>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


