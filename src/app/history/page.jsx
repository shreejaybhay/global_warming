"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Milestone, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryPage() {
  const timeline = [
    {
      year: "1800s",
      title: "Industrial Revolution",
      description: "The beginning of large-scale fossil fuel use and increased CO2 emissions.",
      icon: Clock,
    },
    {
      year: "1938",
      title: "First Climate Warning",
      description: "Guy Stewart Callendar connects CO2 emissions to warming.",
      icon: Milestone,
    },
    {
      year: "1958",
      title: "Keeling Curve",
      description: "First continuous measurements of atmospheric CO2 levels begin at Mauna Loa.",
      icon: Target,
    },
    {
      year: "1988",
      title: "IPCC Formation",
      description: "The Intergovernmental Panel on Climate Change is established.",
      icon: Milestone,
    },
    {
      year: "2015",
      title: "Paris Agreement",
      description: "Global agreement to limit temperature rise to well below 2°C.",
      icon: Target,
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
            History of Climate Change
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the key moments and discoveries in our understanding of climate change.
          </p>
        </motion.section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-12"
        >
          <Image
            src="https://i.postimg.cc/bYCZfkYr/climate-change-5224748-1920.jpg"
            alt="Historical Climate Change"
            width={1200}
            height={600}
            className="w-full h-[400px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:bg-primary/20 md:before:mx-auto md:before:translate-x-0"
        >
          {timeline.map((event, index) => (
            <div key={index} className="relative flex items-center md:justify-center">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="md:w-1/2 md:odd:pr-8 md:even:pl-8 md:even:ml-auto"
              >
                <Card className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <event.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">{event.year}</span>
                        <CardTitle>{event.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="my-24"
        >
          <Card className="bg-primary/5 border-none p-12">
            <CardContent className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Learn More About Climate Science</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover how our understanding of climate change has evolved and what it means for our future.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/climate-science" className="flex items-center gap-2">
                  Explore Climate Science
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