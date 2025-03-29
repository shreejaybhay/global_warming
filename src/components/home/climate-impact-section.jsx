"use client";

import { Cloud, Waves, Thermometer, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function ClimateImpactSection() {
  const impacts = [
    {
      icon: Thermometer,
      title: "Rising Temperatures",
      description: "Global temperatures have increased by 1.1°C since pre-industrial times, leading to more frequent heatwaves and changing weather patterns.",
      color: "text-red-500",
      link: "/effects#temperature"
    },
    {
      icon: Waves,
      title: "Sea Level Rise",
      description: "Sea levels are rising at 3.3mm per year due to melting ice caps, threatening coastal communities and ecosystems worldwide.",
      color: "text-blue-500",
      link: "/effects#sea-level"
    },
    {
      icon: Cloud,
      title: "Extreme Weather",
      description: "Climate change is intensifying the frequency and severity of extreme weather events, including hurricanes, droughts, and floods.",
      color: "text-purple-500",
      link: "/effects#weather"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,var(--primary)_12%,transparent_12.5%,transparent_87%,var(--primary)_87.5%,var(--primary))] bg-[length:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary font-semibold mb-4 block">
            Climate Crisis
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Global Climate Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            The effects of climate change are far-reaching and interconnected,
            impacting every corner of our planet and all forms of life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group bg-card hover:bg-accent/5 rounded-2xl p-8 border border-border/50 hover:border-border transition-all duration-300"
            >
              <div className={`mb-6 ${impact.color}`}>
                <impact.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                {impact.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {impact.description}
              </p>
              <Link 
                href={impact.link}
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-primary/80"
        >
          <div className="p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-primary-foreground mb-6">
                  Understanding Our Role
                </h3>
                <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
                  Human activities have been the primary driver of climate change,
                  primarily through emissions of greenhouse gases. However, this
                  means we also have the power to make positive changes and shape
                  a sustainable future for our planet.
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="group"
                >
                  <Link href="/effects" className="flex items-center gap-2">
                    Explore Climate Effects
                    <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-80">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Globe className="w-64 h-64 text-primary-foreground/20" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
