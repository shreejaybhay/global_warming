"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Ruler,
  Map,
} from "lucide-react";

export default function HistoryPage() {
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
            <span className="text-primary">Everglades History</span>
          </div>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Everglades Restoration History
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring NASA's role in monitoring and supporting the restoration of Florida's unique ecosystem
          </p>
        </motion.section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-12"
        >
          <Image
            src="https://science.nasa.gov/wp-content/uploads/2024/10/photo-1.jpg"
            alt="Everglades Aerial View"
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
              icon: Clock,
              title: "Historical Timeline",
              description: "Track the evolution of Everglades restoration efforts from the 1900s to present day",
              stat: "100+ Years",
            },
            {
              icon: Ruler,
              title: "Area Coverage",
              description: "Monitor changes in wetland coverage and water flow patterns",
              stat: "1.5M Acres",
            },
            {
              icon: Map,
              title: "Satellite Mapping",
              description: "NASA's satellite technology provides crucial data for restoration planning",
              stat: "Daily Updates",
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
          className="grid gap-8 md:grid-cols-2 my-12"
        >
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Restoration Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  year: "1947",
                  event: "Everglades National Park Established",
                  description: "Creation of protected area covering 1.5 million acres",
                },
                {
                  year: "2000",
                  event: "Comprehensive Everglades Restoration Plan",
                  description: "Launch of $10.5 billion restoration project",
                },
                {
                  year: "2021",
                  event: "NASA Satellite Monitoring Program",
                  description: "Implementation of advanced satellite tracking system",
                },
              ].map((milestone, index) => (
                <div key={index} className="border-l-2 border-primary pl-4 py-2">
                  <h3 className="text-primary font-bold">{milestone.year}</h3>
                  <h4 className="font-semibold">{milestone.event}</h4>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>NASA's Contribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                NASA's Earth observation satellites provide crucial data for monitoring:
              </p>
              <ul className="space-y-2">
                {[
                  "Water level fluctuations",
                  "Vegetation health and distribution",
                  "Land use changes",
                  "Weather patterns",
                  "Ecosystem dynamics",
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
              <h2 className="text-3xl font-bold">Support Restoration Efforts</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Learn how you can contribute to the preservation and restoration of the Everglades ecosystem.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/explore-data">
                    Explore Data
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <Link href="/gallery">
                    View Gallery
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