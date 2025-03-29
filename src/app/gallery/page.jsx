"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Camera } from "lucide-react";

const galleryItems = [
  {
    title: "Arctic Ice Melting",
    description: "Dramatic reduction in Arctic sea ice coverage over the past decades",
    image: "https://images.unsplash.com/photo-1543470373-e055b73a8f29?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Ice Sheets",
    stats: "75% reduction since 1980"
  },
  {
    title: "Amazon Rainforest",
    description: "The world's largest rainforest plays a crucial role in climate regulation",
    image: "https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Forests",
    stats: "17% lost in 50 years"
  },
  {
    title: "Rising Sea Levels",
    description: "Coastal areas affected by rising global sea levels",
    image: "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Oceans",
    stats: "+3.3mm per year"
  },
  {
    title: "Global Temperature Map",
    description: "Visualization of global temperature changes",
    image: "https://i.postimg.cc/vBj879GP/1706644303-blog-temp-map-goes-global-4.avif",
    category: "Temperature",
    stats: "+1.1°C since 1880"
  },
  {
    title: "Extreme Weather Events",
    description: "Increasing frequency of extreme weather phenomena",
    image: "https://images.unsplash.com/photo-1561470508-fd4df1ed90b2?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Weather",
    stats: "5x increase since 1970"
  },
  {
    title: "Greenhouse Gas Emissions",
    description: "Industrial impact on atmospheric composition",
    image: "https://images.unsplash.com/photo-1506277450472-30e3f3f55129?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Emissions",
    stats: "419ppm CO2 in 2023"
  }
];

export default function GalleryPage() {
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
            Visual Evidence
          </span>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Climate Change Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore visual documentation of climate change impacts and environmental transformations across the globe.
          </p>
        </motion.section>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:border-primary/20 transition-all duration-300 h-[450px] flex flex-col">
                <div className="relative h-[250px] overflow-hidden rounded-t-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="p-2 rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition duration-300">
                      <Camera className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                    </div>
                    <span className="text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-base flex-grow">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Impact Data</span>
                      <span className="text-sm font-bold text-primary">{item.stats}</span>
                    </div>
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
                Take Action Today
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Learn how you can contribute to fighting climate change and protecting our environment for future generations.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Involved
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}

