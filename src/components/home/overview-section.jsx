"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Wind, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function OverviewSection() {
  const cards = [
    {
      icon: Thermometer,
      title: "Rising Temperatures",
      description: "Earth's average surface temperature has risen about 1.1°C since the late 19th century, with most of the warming occurring in the past 40 years.",
      stat: "+1.1°C",
      color: "primary",
      link: "/temperature-rise"
    },
    {
      icon: Droplets,
      title: "Melting Ice",
      description: "The Greenland and Antarctic ice sheets have decreased in mass, while glaciers are retreating almost everywhere around the world.",
      stat: "-428B",
      statLabel: "tons of ice per year",
      color: "accent",
      link: "/ice-melt"
    },
    {
      icon: Wind,
      title: "Extreme Weather",
      description: "The number of record high temperature events has been increasing, while the number of record low temperature events has been decreasing.",
      stat: "+20%",
      statLabel: "extreme weather events",
      color: "primary", // Changed from "secondary" to "primary"
      link: "/extreme-weather"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
       {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background -z-10"
      />

      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-primary font-semibold px-4 py-2 rounded-full bg-primary/10 mb-4"
            >
              Climate Crisis
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Understanding Global Warming
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              Global warming is the long-term heating of Earth's climate system
              observed since the pre-industrial period due to human activities,
              primarily fossil fuel burning.
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group relative bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl h-full overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-${card.color}/10`}>
                      <card.icon className={`h-6 w-6 text-${card.color}`} />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-baseline gap-2"
                    >
                      <span className={`text-4xl font-bold text-${card.color}`}>
                        {card.stat}
                      </span>
                      {card.statLabel && (
                        <span className="text-sm text-muted-foreground">
                          {card.statLabel}
                        </span>
                      )}
                    </motion.div>
                    <p className="text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between text-foreground hover:text-primary hover:bg-primary/5 group/btn"
                    >
                      <Link href={card.link} className="flex items-center">
                        Learn more
                        <motion.div
                          className="ml-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.div>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Button
              asChild
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              <Link href="/explore-data" className="flex items-center gap-2">
                View Detailed Analysis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}









