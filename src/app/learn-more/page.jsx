"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Video, Download, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LearnMorePage() {
  const resources = [
    {
      title: "Climate Change: A Scientific Perspective",
      description: "Explore NASA's comprehensive analysis of climate change drivers, including greenhouse gas emissions, deforestation, and solar radiation patterns.",
      type: "Guide",
      icon: BookOpen,
      link: "/climate-science",
      duration: "10 min read"
    },
    {
      title: "NASA's Earth Observatory",
      description: "Interactive visualizations and satellite imagery showing climate change effects worldwide.",
      type: "Interactive",
      icon: Video,
      link: "https://earthobservatory.nasa.gov/",
      isExternal: true,
      duration: "Self-paced"
    },
    {
      title: "Extreme Weather Patterns",
      description: "Analyze the increasing frequency and intensity of extreme weather events through NASA's data and research.",
      type: "Analysis",
      icon: Download,
      link: "/extreme-weather",
      duration: "8 min read"
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-8 mt-12">
      <div className="container mx-auto px-4">
        <nav className="mb-12 flex items-center justify-between">
          <Button
            variant="ghost"
            className="hover:bg-primary/5 hover:text-primary"
            asChild
          >
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Educational Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of resources to deepen your understanding of climate science and environmental conservation.
          </p>
        </motion.section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12"
        >
          {resources.map((resource, index) => (
            <Card key={index} className="group hover:border-primary/20 transition-colors">
              <Link href={resource.link} target={resource.isExternal ? "_blank" : "_self"}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <resource.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {resource.title}
                      {resource.isExternal && <ExternalLink className="h-4 w-4" />}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-medium">{resource.type}</span>
                    <span className="text-muted-foreground">{resource.duration}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-24"
        >
          <Card className="bg-primary/5 border-none p-12">
            <CardContent className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Ready to Take Action?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Put your knowledge into practice and join our community of climate advocates.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/take-action" className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}

