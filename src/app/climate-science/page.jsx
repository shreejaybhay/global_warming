"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Thermometer,
  Factory,
  Trees,
  Sun,
  CloudRain,
  ArrowRight
} from "lucide-react";

export default function CausesPage() {
  const [activeTab, setActiveTab] = useState("greenhouse");

  const causes = {
    greenhouse: {
      title: "Greenhouse Gas Emissions",
      description: "Human activities releasing CO2 and other greenhouse gases",
      data: [
        { label: "Carbon Dioxide", value: "419 ppm", change: "+50% since 1750" },
        { label: "Methane", value: "1892 ppb", change: "+156% since 1750" },
        { label: "Nitrous Oxide", value: "333 ppb", change: "+23% since 1750" },
      ]
    },
    deforestation: {
      title: "Deforestation",
      description: "Loss of forests reducing Earth's carbon absorption capacity",
      data: [
        { label: "Forest Loss", value: "3.75M hectares", change: "per year" },
        { label: "Carbon Impact", value: "4.1B tons", change: "CO2 yearly" },
        { label: "Recovery Time", value: "50+ years", change: "for maturity" },
      ]
    },
    solar: {
      title: "Solar Radiation",
      description: "Changes in solar energy reaching Earth's surface",
      data: [
        { label: "Solar Irradiance", value: "1361 W/m²", change: "±0.5 W/m²" },
        { label: "11-year Cycle", value: "0.1%", change: "variation" },
        { label: "Long-term Trend", value: "minimal", change: "contribution" },
      ]
    }
  };

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
            <span className="text-primary">Climate Change Causes</span>
          </div>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Climate Change: A Scientific Perspective
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding the key drivers of global climate change through NASA's research and data
          </p>
        </motion.section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-12"
        >
          <Image
            src="https://science.nasa.gov/wp-content/uploads/2024/02/304765158-615003676989374-3689670236967468275-n.jpg"
            alt="Climate Change Visualization"
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
              icon: Thermometer,
              title: "Temperature Rise",
              description: "Global average temperature has increased by 1.1°C since pre-industrial times",
              stat: "+1.1°C",
            },
            {
              icon: Factory,
              title: "CO2 Emissions",
              description: "Annual global carbon dioxide emissions from human activities",
              stat: "36.3 GT/year",
            },
            {
              icon: Trees,
              title: "Carbon Absorption",
              description: "Natural carbon sinks capacity reduction due to deforestation",
              stat: "-12% capacity",
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
                  <p className="text-2xl font-bold text-primary">
                    {item.stat}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="my-12"
        >
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl">Primary Climate Change Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                {Object.keys(causes).map((key) => (
                  <Button
                    key={key}
                    variant={activeTab === key ? "default" : "outline"}
                    onClick={() => setActiveTab(key)}
                    className="flex items-center gap-2"
                  >
                    {key === "greenhouse" && <Factory className="h-4 w-4" />}
                    {key === "deforestation" && <Trees className="h-4 w-4" />}
                    {key === "solar" && <Sun className="h-4 w-4" />}
                    {causes[key].title}
                  </Button>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {causes[activeTab].data.map((item, index) => (
                  <div key={index} className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary">{item.label}</h3>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.change}</p>
                  </div>
                ))}
              </div>
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
              <h2 className="text-3xl font-bold">Explore NASA's Climate Data</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Access detailed climate data, visualizations, and research findings from NASA's Earth Science missions.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/explore-data" className="flex items-center gap-2">
                    View Data
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <Link href="/effects">
                    See Climate Effects
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