"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Thermometer,
  Droplets,
  Fish,
  Wind,
  Mountain,
  Bug,
  HeartPulse,
  Sprout,
} from "lucide-react";

export default function EffectsPage() {
  const [activeCategory, setActiveCategory] = useState("environmental");

  const effects = {
    environmental: {
      title: "Environmental Effects",
      description: "Direct impacts on our planet's natural systems",
      items: [
        {
          icon: Thermometer,
          title: "Temperature Rise",
          description: "Global average temperatures continue to break records",
          stats: {
            current: "+1.1°C",
            projection: "Up to +4.4°C by 2100",
            impact: "Severe heat waves"
          },
          image: "https://i.postimg.cc/h4pqTVtc/photo-1543878507-84ec11237ebe.avif"
        },
        {
          icon: Droplets,
          title: "Sea Level Rise",
          description: "Coastal areas threatened by rising ocean levels",
          stats: {
            current: "+3.3mm/year",
            projection: "+0.3-2.5m by 2100",
            impact: "Coastal flooding"
          },
          image: "https://i.postimg.cc/P5Dc3DTL/photo-1443527216320-7e744084f5a7.avif"
        },
        {
          icon: Mountain,
          title: "Glacier Retreat",
          description: "Rapid melting of Earth's ice sheets and glaciers",
          stats: {
            current: "-428B tons/year",
            projection: "75% loss by 2100",
            impact: "Water scarcity"
          },
          image: "https://i.postimg.cc/TwtHLqqs/photo-1489277710675-f9125c249753.avif"
        }
      ]
    },
    ecological: {
      title: "Ecological Effects",
      description: "Impacts on wildlife and ecosystems",
      items: [
        {
          icon: Fish,
          title: "Marine Life",
          description: "Ocean acidification affecting marine ecosystems",
          stats: {
            current: "30% more acidic",
            projection: "pH -0.4 by 2100",
            impact: "Coral bleaching"
          },
          image: "https://images.unsplash.com/photo-1566151442928-b58e10e2b62e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          icon: Bug,
          title: "Biodiversity Loss",
          description: "Accelerated extinction of species",
          stats: {
            current: "1M species at risk",
            projection: "50% loss by 2100",
            impact: "Ecosystem collapse"
          },
          image: "https://images.unsplash.com/photo-1708689686499-89fff729a27a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          icon: Sprout,
          title: "Vegetation Changes",
          description: "Shifting plant zones and growing seasons",
          stats: {
            current: "37% lands affected",
            projection: "Major shifts by 2050",
            impact: "Agricultural disruption"
          },
          image: "https://images.unsplash.com/photo-1730194605240-6a0d30ddbea4?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ]
    },
    human: {
      title: "Human Impact",
      description: "Effects on human health and society",
      items: [
        {
          icon: HeartPulse,
          title: "Health Risks",
          description: "Increased health challenges from climate change",
          stats: {
            current: "250K deaths/year",
            projection: "500K by 2050",
            impact: "Heat-related illness"
          },
          image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          icon: Wind,
          title: "Extreme Weather",
          description: "More frequent and severe weather events",
          stats: {
            current: "3x more events",
            projection: "5x increase by 2050",
            impact: "Displacement"
          },
          image: "https://images.unsplash.com/photo-1581059729226-c493d3086748?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ]
    }
  };

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
            Climate Change Impact
          </span>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Effects of Climate Change
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how climate change is affecting our planet, ecosystems, and human society.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {Object.entries(effects).map(([key, category]) => (
              <Button
                key={key}
                variant={activeCategory === key ? "default" : "outline"}
                onClick={() => setActiveCategory(key)}
                className="flex items-center gap-2"
              >
                {category.title}
              </Button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {effects[activeCategory].items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                  
                  <CardHeader className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current:</span>
                        <span className="font-semibold text-primary">{item.stats.current}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Projected:</span>
                        <span className="font-semibold text-primary">{item.stats.projection}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Key Impact:</span>
                        <span className="font-semibold text-primary">{item.stats.impact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-24"
        >
          <Card className="bg-primary/5 border-none p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <CardContent className="space-y-6 relative z-10">
              <h2 className="text-3xl font-bold">Want to Make a Difference?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Learn about prevention strategies and take action against climate change.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/prevention" className="flex items-center gap-2">
                    Learn Prevention
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <Link href="/take-action">
                    Take Action
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}