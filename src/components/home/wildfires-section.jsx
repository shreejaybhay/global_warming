"use client";

import { Flame, AlertTriangle, ThermometerSun, TreePine, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function WildfiresSection() {
  const stats = [
    {
      icon: AlertTriangle,
      value: "70%",
      label: "Increase in wildfire season",
      description: "Length of fire season has increased globally since 1979",
    },
    {
      icon: ThermometerSun,
      value: "1.5°C",
      label: "Temperature rise",
      description: "Additional warming increases wildfire risk by 30%",
    },
    {
      icon: TreePine,
      value: "46M",
      label: "Acres burned",
      description: "Record-breaking wildfires in 2023 alone",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-xl transition-all duration-300 hover:shadow-2xl">
          {/* Background Video with improved overlay */}
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20 scale-105 transform transition-transform duration-[20s] hover:scale-110"
            >
              <source
                src="https://assets.science.nasa.gov/content/dam/science/esd/climate/video_items/Wildfires%20and%20CC%20hero%20video%20half%20speed.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 p-8 lg:p-12">
            {/* Header with animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-2 rounded-lg bg-destructive/10 animate-pulse">
                <Flame className="h-6 w-6 text-destructive animate-flicker" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                Wildfires and Climate Change: A Growing Crisis
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    As our planet's climate continues to warm, we're witnessing
                    an unprecedented surge in wildfire intensity and frequency,
                    particularly in northern and temperate forests. These fires
                    not only threaten ecosystems and communities but also create
                    a dangerous feedback loop - releasing stored carbon and
                    further contributing to global warming.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    NASA's advanced satellite technology and monitoring systems
                    play a crucial role in detecting and tracking these fires in
                    real-time, providing vital data to communities, researchers,
                    and firefighters worldwide. This information helps us better
                    understand and respond to this escalating environmental
                    challenge.
                  </p>
                </motion.div>

                {/* Stats Grid with hover effects */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      key={index}
                      className="group bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50 hover:bg-card/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <stat.icon className="h-5 w-5 text-destructive mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-foreground/80">
                        {stat.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs with improved interaction */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300 group"
                  >
                    <Link href="/wildfires" className="flex items-center gap-2">
                      Learn More About Wildfires
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10 transition-all duration-300"
                  >
                    <Link href="/wildfire-prevention">
                      Prevention Guidelines
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column - Video with enhanced presentation */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="aspect-video rounded-xl overflow-hidden border-2 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  >
                    <source
                      src="https://assets.science.nasa.gov/content/dam/science/esd/climate/video_items/Wildfires%20and%20CC%20hero%20video%20half%20speed.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="text-sm text-muted-foreground text-center italic">
                  Source: NASA Earth Science Division - Climate Change Impact
                  Analysis
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




