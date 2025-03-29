"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Cloud, Sun, Waves, Wind, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TypesPage() {
  const climateTypes = [
    {
      title: "Greenhouse Effect",
      description: "The process where gases in Earth's atmosphere trap heat from the sun, warming the planet's surface.",
      icon: Sun,
      effects: ["Increased global temperatures", "Melting ice caps", "Rising sea levels"],
      image: "https://i.postimg.cc/k5Gnch8y/greenhouse-4948726-1280.jpg"
    },
    {
      title: "Atmospheric Changes",
      description: "Alterations in the composition and behavior of Earth's atmosphere due to human activities.",
      icon: Cloud,
      effects: ["Changes in precipitation patterns", "More extreme weather events", "Air quality degradation"],
      image: "https://i.postimg.cc/PxFvywPC/cyclone-2102397-1280.jpg"
    },
    {
      title: "Ocean Warming",
      description: "The increase in ocean temperatures affecting marine ecosystems and global weather patterns.",
      icon: Waves,
      effects: ["Coral bleaching", "Marine ecosystem disruption", "Stronger hurricanes"],
      image: "https://i.postimg.cc/XYG3h1QN/drought-3803688-1280.jpg"
    },
    {
      title: "Wind Pattern Changes",
      description: "Shifts in global wind patterns affecting weather systems and climate zones.",
      icon: Wind,
      effects: ["Modified jet streams", "Changed precipitation patterns", "Extreme weather events"],
      image: "https://i.postimg.cc/sxgCJTMr/wind-sock-1696481-1280.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-16 mt-12">
      <div className="container mx-auto px-4">
        <nav className="mb-16 flex items-center justify-between">
          <Button
            variant="ghost"
            className="hover:bg-primary/5 hover:text-primary group transition-colors"
            asChild
          >
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold px-4 py-2 rounded-full bg-primary/10 mb-6">
            Climate Science
          </span>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Types of Climate Change
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Understanding the different ways our climate system is changing and their interconnected effects.
          </p>
        </motion.section>

        <div className="grid gap-8 md:grid-cols-2">
          {climateTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:border-primary/20 transition-all duration-300 h-full">
                <div className="relative h-[240px] overflow-hidden rounded-t-xl">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 z-10">
                    <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition duration-300">
                      <type.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{type.title}</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <p className="text-muted-foreground text-lg">
                    {type.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Thermometer className="h-5 w-5" />
                      <h4 className="font-semibold text-lg">Key Effects</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {type.effects.map((effect, i) => (
                        <li key={i} className="flex items-center gap-3 text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          <span>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="my-24"
        >
          <Card className="bg-primary/5 border-none p-12 relative overflow-hidden group hover:bg-primary/10 transition-colors duration-300">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <CardContent className="text-center space-y-6 relative z-10">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Explore Climate Science Data
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Dive deeper into the scientific data and research behind different types of climate change.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 group"
              >
                <Link href="/climate-science" className="flex items-center gap-2">
                  View Climate Data
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}

