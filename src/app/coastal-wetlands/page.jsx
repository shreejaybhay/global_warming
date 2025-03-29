"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Waves,
  TreePine,
  Leaf as Co2, // Using Leaf as a replacement for Co2
  Sprout,
} from "lucide-react";

export default function CoastalWetlandsPage() {
  return (
    <main className="min-h-screen bg-background pt-8 mt-12">
      <div className="container mx-auto px-4">
        <nav className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hover:bg-primary/5 hover:text-primary"
              asChild
            >
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary">Coastal Wetlands</span>
          </div>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Coastal Wetlands: Nature's Carbon Capture
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how coastal wetlands act as powerful natural carbon sinks
            and their crucial role in climate regulation
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-12"
        >
          <Image
            src="https://assets.science.nasa.gov/dynamicimage/assets/science/esd/articles/2025/Picture6.jpg"
            alt="Coastal Wetlands Aerial View"
            width={1200}
            height={600}
            className="w-full h-[400px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-6 md:grid-cols-3 my-12"
        >
          {[
            {
              icon: Co2,
              title: "Carbon Storage",
              description:
                "Annual carbon sequestration capacity of coastal wetlands worldwide",
              stat: "53M Tons CO2",
            },
            {
              icon: Waves,
              title: "Coastal Protection",
              description:
                "Natural barrier against storm surges and sea level rise",
              stat: "40% reduction",
            },
            {
              icon: Sprout,
              title: "Biodiversity",
              description:
                "Species supported by healthy coastal wetland ecosystems",
              stat: "1000+ species",
            },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <p className="text-2xl font-bold text-primary">{item.stat}</p>
                </CardContent>
              </Card>
            );
          })}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-8 md:grid-cols-2 my-12"
        >
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Carbon Sequestration Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  phase: "Photosynthesis",
                  description: "Plants capture CO2 from the atmosphere",
                  efficiency: "15-25% conversion rate",
                },
                {
                  phase: "Biomass Storage",
                  description: "Carbon stored in plant tissues and soil",
                  efficiency: "500-1,000 years storage",
                },
                {
                  phase: "Sediment Accumulation",
                  description: "Continuous burial of organic matter",
                  efficiency: "2-4mm annual increase",
                },
              ].map((process, index) => (
                <div
                  key={index}
                  className="border-l-2 border-primary pl-4 py-2"
                >
                  <h3 className="text-primary font-bold">{process.phase}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                  <p className="font-semibold">{process.efficiency}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>NASA's Research Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Advanced monitoring techniques used by NASA:
              </p>
              <ul className="space-y-2">
                {[
                  "Satellite imagery for wetland extent mapping",
                  "LiDAR measurements for biomass estimation",
                  "Spectral analysis for vegetation health",
                  "Radar interferometry for surface changes",
                  "Machine learning for pattern recognition",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-24"
        >
          <Card className="bg-primary/5 border-none p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <CardContent className="space-y-6 relative z-10">
              <h2 className="text-3xl font-bold">Protect Our Wetlands</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Join the effort to preserve and restore coastal wetlands,
                nature's most efficient carbon capture system.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link
                    href="/explore-data"
                    className="flex items-center gap-2"
                  >
                    View Research Data
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}

