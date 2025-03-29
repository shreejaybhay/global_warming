"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Home,
  Car,
  Lightbulb,
  Recycle,
  Trees,
  Factory,
  ShoppingBag,
  Droplets,
} from "lucide-react";
import fileDownload from "js-file-download";

export default function PreventionPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(null);

  const preventionSteps = [
    {
      title: "Home Energy Efficiency",
      icon: Home,
      description:
        "Implement energy-saving measures in your home to reduce carbon emissions.",
      difficulty: "Moderate",
      timeRequired: "Ongoing",
      priority: "High",
      tips: [
        "Install LED lighting and smart thermostats",
        "Improve insulation and seal air leaks",
        "Use energy-efficient appliances",
        "Consider solar panel installation",
      ],
      resources: [
        { title: "Energy Audit Guide", url: "#" },
        { title: "Solar Installation Tips", url: "#" },
      ],
    },
    {
      title: "Sustainable Transportation",
      icon: Car,
      description:
        "Reduce transportation-related emissions through smart choices.",
      difficulty: "Moderate",
      timeRequired: "Daily",
      priority: "High",
      tips: [
        "Use public transportation when possible",
        "Consider electric or hybrid vehicles",
        "Practice car-pooling",
        "Walk or cycle for short distances",
      ],
      resources: [
        { title: "EV Buying Guide", url: "#" },
        { title: "Bike Route Planner", url: "#" },
      ],
    },
    {
      title: "Waste Reduction",
      icon: Recycle,
      description:
        "Minimize waste through recycling and conscious consumption.",
      difficulty: "Easy",
      timeRequired: "Daily",
      priority: "Medium",
      tips: [
        "Practice proper recycling",
        "Compost organic waste",
        "Reduce single-use plastics",
        "Choose products with minimal packaging",
      ],
      resources: [
        { title: "Recycling Guidelines", url: "#" },
        { title: "Composting Guide", url: "#" },
      ],
    },
    {
      title: "Green Consumption",
      icon: ShoppingBag,
      description:
        "Make environmentally conscious purchasing decisions.",
      difficulty: "Moderate",
      timeRequired: "Ongoing",
      priority: "Medium",
      tips: [
        "Buy local and seasonal products",
        "Choose eco-friendly brands",
        "Reduce meat consumption",
        "Support sustainable businesses",
      ],
      resources: [
        { title: "Sustainable Shopping Guide", url: "#" },
        { title: "Eco-Label Directory", url: "#" },
      ],
    },
    {
      title: "Water Conservation",
      icon: Droplets,
      description:
        "Implement water-saving practices in daily life.",
      difficulty: "Easy",
      timeRequired: "Daily",
      priority: "High",
      tips: [
        "Fix leaks promptly",
        "Install water-efficient fixtures",
        "Collect rainwater for gardens",
        "Choose drought-resistant plants",
      ],
      resources: [
        { title: "Water Saving Tips", url: "#" },
        { title: "Garden Planning Guide", url: "#" },
      ],
    },
    {
      title: "Community Action",
      icon: Trees,
      description:
        "Engage in community-level climate initiatives.",
      difficulty: "Moderate",
      timeRequired: "Monthly",
      priority: "High",
      tips: [
        "Join local environmental groups",
        "Participate in tree planting",
        "Support climate policies",
        "Educate others about climate change",
      ],
      resources: [
        { title: "Community Programs", url: "#" },
        { title: "Advocacy Guide", url: "#" },
      ],
    },
  ];

  const simulateDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch("/api/prevention-guide", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const blob = await response.blob();
      
      clearInterval(progressInterval);
      setDownloadProgress(100);

      fileDownload(blob, 'climate-prevention-guide.pdf');

      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
      setDownloadProgress(0);
      alert("Failed to download the prevention guide");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <nav className="mb-8">
          <Button
            variant="ghost"
            className="hover:bg-primary/5"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </nav>

        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-8"
              >
                <Lightbulb className="h-4 w-4" />
                <span className="text-sm font-medium">Prevention Guide</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Climate Change Prevention Guide
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10">
                Practical steps and strategies to reduce your carbon footprint and combat climate change.
              </p>
              <Button
                size="lg"
                className="relative h-12 px-8"
                onClick={simulateDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Progress
                      value={downloadProgress}
                      className="w-full absolute bottom-0 left-0 rounded-full"
                    />
                    <span className="relative z-10">
                      Downloading... {downloadProgress}%
                    </span>
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download Complete Guide
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Prevention Steps */}
        <section className="py-24 bg-gradient-to-b from-background/95 to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {preventionSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <Card
                    className={`h-full transition-all duration-300 hover:shadow-xl ${
                      activeStep === index
                        ? "ring-2 ring-primary/20 transform scale-[1.02]"
                        : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{step.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Key Tips:</h4>
                          <ul className="space-y-2">
                            {step.tips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t border-border">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Difficulty:</span>
                            <span className="font-medium text-primary">{step.difficulty}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-muted-foreground">Time Required:</span>
                            <span className="font-medium text-primary">{step.timeRequired}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-b from-background to-background/95">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Start Making a Difference Today
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Download our complete prevention guide for more detailed
                information and actionable checklists.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="h-12 px-8"
                  onClick={simulateDownload}
                  disabled={isDownloading}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Guide
                </Button>
                <Link href="/effects">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8"
                  >
                    Learn About Effects
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}