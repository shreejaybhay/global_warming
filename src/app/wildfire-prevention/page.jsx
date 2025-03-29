"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import fileDownload from "js-file-download";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  FileCheck,
  AlertTriangle,
  Home,
  ThermometerSun,
  Download,
  ChevronDown,
  ExternalLink,
  MapPin,
  Phone,
  Info,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function WildfirePreventionPage() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  const preventionSteps = [
    {
      title: "Create Defensible Space",
      icon: Home,
      description:
        "Maintain a 30-foot safety zone around your home, clear of flammable vegetation and debris.",
      difficulty: "Moderate",
      timeRequired: "2-3 days",
      priority: "High",
      tips: [
        "Remove dead vegetation and dried leaves within 30 feet of your house",
        "Keep grass short and well-watered",
        "Prune tree branches to 6-10 feet above the ground",
      ],
      resources: [
        { title: "Defensible Space Guidelines", url: "#" },
        { title: "Vegetation Management Tips", url: "#" },
      ],
    },
    {
      title: "Monitor Weather Conditions",
      icon: ThermometerSun,
      description:
        "Stay informed about weather conditions that increase fire risk.",
      difficulty: "Easy",
      timeRequired: "Daily",
      priority: "High",
      tips: [
        "Check local fire danger ratings daily",
        "Be alert during dry, windy conditions",
        "Follow local burning restrictions",
      ],
      resources: [
        { title: "Local Weather Service", url: "#" },
        { title: "Fire Danger Map", url: "#" },
      ],
    },
    {
      title: "Prepare Emergency Plan",
      icon: FileCheck,
      description:
        "Develop and maintain a comprehensive emergency response plan.",
      difficulty: "Moderate",
      timeRequired: "1-2 days",
      priority: "High",
      tips: [
        "Create an evacuation checklist",
        "Establish family communication protocols",
        "Pack emergency supplies in advance",
      ],
      resources: [
        { title: "Emergency Plan Template", url: "#" },
        { title: "Evacuation Guidelines", url: "#" },
      ],
    },
  ];

  const emergencyContacts = [
    { name: "Fire Emergency", number: "101", icon: Phone },
    { name: "Forest Department", number: "1926", icon: MapPin },
    { name: "Disaster Management", number: "108", icon: AlertTriangle },
  ];

  const simulateDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Fetch from your API endpoint
      const response = await fetch("/api/prevention-guide", {
        method: "GET",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }

      const blob = await response.blob();
      
      // Clear interval and set progress to 100%
      clearInterval(progressInterval);
      setDownloadProgress(100);

      // Use js-file-download for handling the download
      fileDownload(blob, 'wildfire-prevention-guide.pdf');

      // Reset states after short delay
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
      setDownloadProgress(0);
      alert(`Failed to download the prevention guide: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Improved spacing and visual hierarchy */}
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive mb-8 hover:bg-destructive/20 transition-colors"
            >
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Prevention Guide</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-destructive to-destructive/80">
              Comprehensive Wildfire Prevention Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Expert-backed strategies and actionable steps to protect your
              property and community from wildfires.
            </p>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 relative h-12 px-8"
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
                    Download Complete Guide (PDF)
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground">
                PDF format • 2.5 MB • Last updated:{" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contacts - Enhanced visual appeal */}
      <section className="py-10 bg-destructive/5 border-y border-destructive/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-background p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                  <contact.icon className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {contact.name}
                  </p>
                  <p className="text-2xl font-bold text-destructive">
                    {contact.number}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prevention Steps - Enhanced card design */}
      <section className="py-24 bg-gradient-to-b from-background/95 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                      ? "ring-2 ring-destructive/20 transform scale-[1.02]"
                      : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-destructive/10 text-destructive">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="px-3 py-1">
                        {step.difficulty}
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        {step.timeRequired}
                      </Badge>
                      <Badge variant="destructive" className="px-3 py-1">
                        Priority: {step.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="tips">
                        <AccordionTrigger className="text-sm font-medium">
                          Implementation Tips
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-3">
                            {step.tips.map((tip, tipIndex) => (
                              <li
                                key={tipIndex}
                                className="flex items-start gap-2"
                              >
                                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-1" />
                                <span className="text-sm text-muted-foreground">
                                  {tip}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="resources">
                        <AccordionTrigger className="text-sm font-medium">
                          Additional Resources
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {step.resources.map((resource, resourceIndex) => (
                              <li key={resourceIndex}>
                                <Link
                                  href={resource.url}
                                  className="text-sm text-destructive hover:underline flex items-center gap-2"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  {resource.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tips - Enhanced visual design */}
      <section className="py-20 bg-destructive/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Essential Safety Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Keep emergency supplies in an easily accessible location",
              "Create and maintain multiple evacuation routes",
              "Install fire-resistant roofing materials",
              "Regular maintenance of your property's vegetation",
              "Install ember-resistant vents",
              "Keep important documents in a fireproof safe",
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="p-2 rounded-full bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                  <Info className="h-5 w-5 text-destructive" />
                </div>
                <p className="text-base leading-relaxed">{tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced visual appeal */}
      <section className="py-24 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-destructive to-destructive/80">
              Stay Prepared, Stay Safe
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Download our complete prevention guide for more detailed
              information and emergency checklists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-12 px-8"
                onClick={simulateDownload}
                disabled={isDownloading}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Guide
              </Button>
              <Link href="/wildfires">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-destructive/20 hover:bg-destructive/5 hover:text-destructive h-12 px-8"
                >
                  Return to Overview
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



