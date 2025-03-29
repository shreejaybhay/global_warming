"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ThermometerSun, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: index => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.8 + (index * 0.1),
        duration: 0.5
      }
    })
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image Layer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Image
          src="https://science.nasa.gov/wp-content/uploads/2024/02/304765158-615003676989374-3689670236967468275-n.jpg"
          alt="Earth from space showing climate effects"
          fill
          priority
          className="object-cover"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 bg-background/80" 
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full border border-accent/20"
            >
              <Globe2 className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent">
                Global Climate Observatory
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div 
              variants={itemVariants}
              className="space-y-4"
            >
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-foreground block"
                >
                  Our Planet is
                </motion.span>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-primary"
                >
                  Warming
                </motion.div>
              </h1>
              <motion.p 
                variants={itemVariants}
                className="text-xl text-muted-foreground max-w-xl leading-relaxed"
              >
                Experience real-time climate data and insights. Join us in
                understanding and addressing the most critical environmental
                challenge of our time.
              </motion.p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-6"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground h-14 px-8 rounded-full group"
              >
                <Link href="/take-action">
                  Take Action Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-full"
              >
                <Link href="/explore-data">Explore Data</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Interactive Stats */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  value: "1.5°C",
                  label: "Critical Threshold",
                  sublabel: "Paris Agreement Target",
                  color: "text-chart-1",
                },
                {
                  value: "415ppm",
                  label: "CO₂ Levels",
                  sublabel: "Current Atmospheric",
                  color: "text-chart-2",
                },
                {
                  value: "90%",
                  label: "Scientific Consensus",
                  sublabel: "Global Research Data",
                  color: "text-primary",
                },
                {
                  value: "2050",
                  label: "Net Zero Target",
                  sublabel: "Global Initiative",
                  color: "text-chart-4",
                },
              ].map((stat, index) => (
                <motion.div
                  custom={index}
                  variants={statsVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  key={index}
                  className="group relative bg-card/5 backdrop-blur-md rounded-2xl p-6 border border-border hover:border-accent/20 transition-all duration-500"
                >
                  <div className="relative">
                    <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-foreground font-medium mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.sublabel}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-8 h-12 border-2 border-border rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-foreground/60 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}


