"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Flame,
  ThermometerSun,
  Wind,
  TreePine,
  AlertTriangle,
  BarChart3,
  Globe,
  Calendar,
  ArrowRight,
  MapPin,
  Info,
  Book,
  Shield,
  Home,
  FileCheck,
  PhoneCall,
  Phone,
  Siren,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
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

export default function WildfiresPage() {
  const keyStats = [
    {
      value: "1.5°C",
      label: "Temperature Increase",
      description: "Global temperature rise since pre-industrial levels",
      trend: "+0.2°C per decade",
      icon: ThermometerSun,
    },
    {
      value: "70%",
      label: "Longer Fire Seasons",
      description: "Increase in wildfire season length since 1979",
      trend: "Growing by 19% annually",
      icon: Calendar,
    },
    {
      value: "46M",
      label: "Acres Burned",
      description: "Total area affected by wildfires in 2023",
      trend: "↑ 38% from 2022",
      icon: Flame,
    },
    {
      value: "84%",
      label: "Human-Caused",
      description: "Percentage of wildfires started by human activity",
      trend: "Preventable through action",
      icon: AlertTriangle,
    },
  ];

  const researchFindings = [
    {
      title: "Climate Change Connection",
      content:
        "Rising temperatures and drought conditions have led to a 300% increase in fire-prone weather conditions across global forests.",
      source: "NASA Earth Observatory",
      image:
        "https://i.postimg.cc/Y9YXgMXL/pxclimateaction-4684217-960-720.jpg",
    },
    {
      title: "Economic Impact",
      content:
        "Annual global cost of wildfire damage has reached $50 billion, with indirect costs estimated at three times that amount.",
      source: "World Economic Forum",
      image: "https://i.postimg.cc/MpgbYgf7/container-4197259-1280.jpg",
    },
    {
      title: "Environmental Effects",
      content:
        "Wildfires release approximately 290 million tons of carbon dioxide yearly, creating a dangerous climate feedback loop.",
      source: "Environmental Protection Agency",
      image: "https://i.postimg.cc/sxfpXrbr/factory-1647712-1280.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with NASA Satellite Imagery */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source
              src="https://assets.science.nasa.gov/content/dam/science/esd/climate/video_items/Wildfires%20and%20CC%20hero%20video%20half%20speed.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/98" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-destructive/10 text-destructive border border-destructive/20 font-semibold tracking-wide flex items-center gap-2 cursor-pointer"
              >
                <Globe className="h-4 w-4 animate-pulse" />
                NASA Global Wildfire Monitoring
              </motion.span>
            </div>

            <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
              Understanding the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-destructive via-destructive/90 to-destructive/70">
                Global Wildfire Crisis
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed mb-12">
              Explore NASA's comprehensive analysis of how climate change is
              intensifying wildfire patterns worldwide, and learn about crucial
              prevention strategies.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90 text-lg h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link
                    href="#latest-research"
                    className="flex items-center gap-2"
                  >
                    View Latest Research
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg h-12 px-8 border-destructive/20 hover:bg-destructive/5 hover:text-destructive shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="#prevention">Prevention Guidelines</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Statistics Section */}
      <section className="py-24 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              Critical Statistics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Latest data from NASA's Earth Science Division reveals alarming
              trends in global wildfire patterns
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {keyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="relative h-full overflow-hidden border-border/50 hover:border-destructive/20 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-destructive/10 text-destructive group-hover:bg-destructive/20 transition-colors">
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-4xl font-bold text-foreground tracking-tight">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-destructive font-medium">
                      <BarChart3 className="h-4 w-4" />
                      {stat.trend}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Research Section */}
      <section
        id="latest-research"
        className="py-24 bg-gradient-to-b from-background/95 to-background relative"
      >
        <div className="absolute inset-0 bg-grid-destructive/[0.02] -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Latest Research Findings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recent scientific studies and satellite data analysis reveal
              concerning trends
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchFindings.map((finding, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 w-full">
                    <Image
                      src={finding.image}
                      alt={finding.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-destructive" />
                        {finding.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {finding.content}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-6">
                      <div className="text-sm text-muted-foreground">
                        Source: {finding.source}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prevention & Emergency Response */}
      <section
        id="prevention"
        className="relative py-32 bg-gradient-to-b from-background/50 to-background"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center space-y-6 mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive"
              >
                <Shield className="h-4 w-4" />
                <span className="text-sm font-semibold tracking-wide">
                  Safety Guidelines
                </span>
              </motion.div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">
                  Comprehensive Wildfire Safety
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Expert-backed resources and protocols for prevention,
                  preparation, and emergency response
                </p>
              </div>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Prevention Guide Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card className="group h-full bg-card/95 border-destructive/20 hover:border-destructive/40 transition-all duration-300 flex flex-col">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-destructive/10 text-destructive">
                        <Book className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl">
                        Prevention Guide
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base space-y-6">
                      <p className="text-foreground/90">
                        Access our comprehensive guide featuring
                        expert-validated prevention strategies and safety
                        protocols.
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          {
                            icon: Shield,
                            text: "Research-backed safety protocols and best practices",
                          },
                          {
                            icon: Home,
                            text: "Detailed property protection guidelines with visual aids",
                          },
                          {
                            icon: FileCheck,
                            text: "Interactive emergency preparedness checklist",
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <item.icon className="h-5 w-5 text-destructive mt-1 shrink-0" />
                            <span className="text-foreground/80">
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end pt-6">
                    <Link href="/wildfire-prevention" className="w-full">
                      <Button
                        className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg group"
                        size="lg"
                      >
                        <span className="flex items-center gap-2">
                          Download Prevention Guide
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Emergency Response Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card className="group h-full bg-card/95 border-destructive/20 hover:border-destructive/40 transition-all duration-300 flex flex-col">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-destructive/10 text-destructive">
                        <PhoneCall className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl">
                        Emergency Response
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base space-y-6">
                      <p className="text-foreground/90">
                        Immediate access to vital emergency resources and
                        real-time response coordination.
                      </p>
                      <div className="space-y-6">
                        <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/10">
                          <div className="font-medium mb-3 text-foreground">
                            24/7 Emergency Contacts
                          </div>
                          <div className="grid gap-3 text-sm">
                            {[
                              {
                                icon: Phone,
                                label: "Fire Emergency",
                                value: "101",
                              },
                              {
                                icon: Siren,
                                label: "Forest Department",
                                value: "1926",
                              },
                            ].map((contact, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  <contact.icon className="h-4 w-4 text-destructive" />
                                  <span className="text-foreground/80">
                                    {contact.label}
                                  </span>
                                </div>
                                <span className="font-semibold">
                                  {contact.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-destructive mt-1 shrink-0" />
                          <span className="text-foreground/80">
                            GPS-enabled evacuation routes and nearest safe zones
                          </span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end pt-6">
                    <Link href="/report-fire" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-destructive/20 hover:bg-destructive/5 hover:text-destructive shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                      >
                        <span className="flex items-center gap-2">
                          Access Emergency Resources
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
