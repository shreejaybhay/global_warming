"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Factory,
  Trees,
  Sun,
  CloudRain,
  Car,
  Building,
  Trash2,
  ArrowRight,
} from "lucide-react";

export default function CausesPage() {
  const [activeTab, setActiveTab] = useState("industrial");

  const causes = {
    industrial: {
      title: "Industrial Emissions",
      description: "Major industrial processes contributing to greenhouse gas emissions",
      icon: Factory,
      data: [
        { label: "Global CO2 Share", value: "24.2%", change: "+12% since 2000" },
        { label: "Annual Emissions", value: "14.8 Gt", change: "of CO2 per year" },
        { label: "Top Sector", value: "Manufacturing", change: "& Construction" },
      ],
      image: "https://i.postimg.cc/Z5QgjLGz/photo-1582377224944-2c2a17affa38.avif"
    },
    deforestation: {
      title: "Deforestation",
      description: "Loss of forests reducing Earth's carbon absorption capacity",
      icon: Trees,
      data: [
        { label: "Forest Loss", value: "3.75M ha", change: "per year" },
        { label: "Carbon Impact", value: "4.1B tons", change: "CO2 yearly" },
        { label: "Recovery Time", value: "50+ years", change: "for maturity" },
      ],
      image: "https://i.postimg.cc/XqvcTR5H/photo-1443188987226-256ecbeda3cc.avif"
    },
    transportation: {
      title: "Transportation",
      description: "Emissions from vehicles and transportation systems",
      icon: Car,
      data: [
        { label: "Global Share", value: "16.2%", change: "of total emissions" },
        { label: "Road Transport", value: "11.9%", change: "of total emissions" },
        { label: "Aviation", value: "1.9%", change: "of total emissions" },
      ],
      image: "https://i.postimg.cc/ZqF80bFs/photo-1474606030380-107829a22fc6.avif"
    },
    urbanization: {
      title: "Urbanization",
      description: "Impact of urban development and city growth",
      icon: Building,
      data: [
        { label: "Urban Population", value: "56%", change: "of global total" },
        { label: "Energy Usage", value: "78%", change: "of world's energy" },
        { label: "Heat Island", value: "+4°C", change: "in city centers" },
      ],
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop"
    },
    waste: {
      title: "Waste Management",
      description: "Emissions from waste disposal and treatment",
      icon: Trash2,
      data: [
        { label: "Global Impact", value: "3%", change: "of emissions" },
        { label: "Methane", value: "18%", change: "of methane emissions" },
        { label: "Annual Growth", value: "2.2%", change: "increase per year" },
      ],
      image: "https://i.postimg.cc/8c3WxjNc/photo-1574974671999-24b7dfbb0d53.avif"
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
            Understanding Climate Change
          </span>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Major Causes of Climate Change
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the primary factors contributing to global climate change and their environmental impact.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {Object.entries(causes).map(([key, cause]) => (
              <Button
                key={key}
                variant={activeTab === key ? "default" : "outline"}
                onClick={() => setActiveTab(key)}
                className="flex items-center gap-2"
              >
                <cause.icon className="h-4 w-4" />
                {cause.title}
              </Button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-[300px]">
                <Image
                  src={causes[activeTab].image}
                  alt={causes[activeTab].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
              
              <CardHeader className="relative z-10 -mt-20 pb-0">
                <CardTitle className="text-3xl mb-4">{causes[activeTab].title}</CardTitle>
                <p className="text-lg text-muted-foreground mb-6">
                  {causes[activeTab].description}
                </p>
              </CardHeader>

              <CardContent className="grid md:grid-cols-3 gap-6 p-6">
                {causes[activeTab].data.map((item, index) => (
                  <Card key={index} className="bg-muted/50 border-none p-4">
                    <div className="text-2xl font-bold text-primary mb-1">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="text-xs text-primary/80 mt-1">{item.change}</div>
                  </Card>
                ))}
              </CardContent>
            </Card>
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
              <h2 className="text-3xl font-bold">Ready to Take Action?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Learn how you can help reduce your carbon footprint and combat climate change.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/take-action" className="flex items-center gap-2">
                    Take Action Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <Link href="/prevention">
                    Learn Prevention
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