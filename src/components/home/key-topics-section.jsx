"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, History, Thermometer, Globe } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function TopicCard({ href, title, description, imagePath, icon: Icon }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="group relative isolate h-[460px]" // Fixed height for the card container
    >
      <Link href={href} className="block h-full">
        <div className="relative h-[240px] overflow-hidden rounded-t-2xl"> {/* Fixed height for image container */}
          <Image
            src={imagePath}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20 opacity-60 transition-opacity group-hover:opacity-50" />
        </div>
        
        <div className="relative bg-card border border-border/50 rounded-b-2xl p-4 h-[220px] transition-all duration-300 group-hover:border-primary/20"> {/* Fixed height for content container */}
          <div className="absolute -top-8 left-6 bg-primary text-primary-foreground p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-6 w-6" />
          </div>
          
          <div className="space-y-2 flex flex-col h-full">
            <h3 className="text-lg font-bold text-foreground mt-2 line-clamp-2 flex-none">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
              {description}
            </p>
            <div className="flex items-center gap-2 text-primary font-medium pt-1 group/link flex-none">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function KeyTopicsSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
      <motion.div 
        className="container mx-auto px-4 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          variants={itemVariants}
        >
          <span className="inline-block text-primary font-semibold px-4 py-2 rounded-full bg-primary/10 mb-4">
            Educational Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
            Explore Key Topics in Climate Science
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Discover comprehensive resources about climate change, featuring NASA's latest research, 
            data, and insights into our changing planet.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
        >
          <TopicCard
            href="/everglades-restoration"
            title="Everglades Restoration: NASA's Data-Driven Approach"
            description="Explore how NASA's advanced satellite technology and data analysis are supporting the restoration of Florida's Everglades ecosystem."
            imagePath="https://science.nasa.gov/wp-content/uploads/2024/10/photo-1.jpg"
            icon={History}
          />
          <TopicCard
            href="/climate-science"
            title="Climate Change: A Scientific Perspective"
            description="Delve into NASA's comprehensive analysis of climate change drivers, including greenhouse gas emissions and solar radiation patterns."
            imagePath="https://science.nasa.gov/wp-content/uploads/2024/02/304765158-615003676989374-3689670236967468275-n.jpg"
            icon={Thermometer}
          />
          <TopicCard
            href="/coastal-wetlands"
            title="Coastal Wetlands: Nature's Carbon Capture"
            description="Learn about NASA's groundbreaking research on coastal wetlands and their crucial role in carbon sequestration and climate regulation."
            imagePath="https://assets.science.nasa.gov/dynamicimage/assets/science/esd/articles/2025/Picture6.jpg"
            icon={Globe}
          />
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <Button
            asChild
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            <Link href="/gallery" className="flex items-center gap-3">
              Explore Our Full Gallery
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}










