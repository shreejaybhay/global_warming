"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  Bike,
  Train,
  ArrowRight,
  AlertCircle,
  BarChart,
  Wrench,
  CheckCircle2,
  Timer,
  IndianRupee,
  Leaf,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EcoFriendlyTransportation() {
  const steps = [
    {
      title: "Switch to Electric Vehicle",
      description:
        "Make the transition to an electric vehicle for cleaner, more sustainable transportation",
      icon: Car,
      difficulty: "Moderate",
      timeToImplement: "1-2 months",
      initialCost: "₹15,00,000-40,00,000",
      stats: {
        savings: "Up to ₹40,000/year on fuel",
        emissions: "Zero direct emissions",
        impact: "Reduce CO2 by 2.5 tons/year",
      },
      tips: [
        "Check FAME-II subsidies and state incentives",
        "Research charging infrastructure in your city",
        "Compare TCO with petrol/diesel vehicles",
      ],
      warning: "Consider range and charging availability in your area",
    },
    {
      title: "Adopt Public Transport",
      description:
        "Maximize use of metros, buses and local trains for daily commute",
      icon: Train,
      difficulty: "Easy",
      timeToImplement: "Immediate",
      initialCost: "₹1,000-2,000 monthly pass",
      stats: {
        savings: "Up to ₹60,000/year on vehicle expenses",
        efficiency: "1/5 the emissions per passenger",
        impact: "Reduce CO2 by 1.8 tons/year",
      },
      tips: [
        "Get metro/bus smart cards for better rates",
        "Use transit apps like M-Indicator/Moovit",
        "Consider first/last mile connectivity options",
      ],
      warning: "Plan routes during peak hours and monsoon",
    },
    {
      title: "Adopt Cycling Habits",
      description:
        "Use cycling for short-distance travel and exercise",
      icon: Bike,
      difficulty: "Easy",
      timeToImplement: "1-2 weeks",
      initialCost: "₹8,000-40,000",
      stats: {
        savings: "Up to ₹20,000/year on fuel",
        health: "150+ calories/hour burned",
        impact: "Zero emissions transport",
      },
      tips: [
        "Start with early morning or evening rides",
        "Join local cycling groups for safety",
        "Use cycling lanes where available",
      ],
      warning: "Take precautions during heavy traffic hours",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-32 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 shadow-lg shadow-blue-500/5">
                <Car className="h-6 w-6 text-blue-500" />
              </div>
              <Badge
                variant="outline"
                className="text-blue-500 border-blue-500/20 uppercase tracking-wide text-xs font-semibold"
              >
                Sustainable Transport
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-primary to-green-500 leading-[1.2] pb-1"
            >
              Eco-Friendly Transportation Guide
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl text-muted-foreground/90 mb-8 leading-relaxed"
            >
              Transform your daily commute into a sustainable journey while reducing your carbon footprint and improving your health.
            </motion.p>

            {/* Stats Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              {[
                {
                  icon: IndianRupee,
                  label: "Potential Savings",
                  value: "₹60,000",
                  unit: "per year",
                  color: "emerald",
                  gradientFrom: "from-emerald-500/20",
                  gradientVia: "via-emerald-500/10",
                  gradientTo: "to-emerald-500/5",
                  ringColor: "ring-emerald-500/30",
                  textColor: "text-emerald-500"
                },
                {
                  icon: Leaf,
                  label: "CO2 Reduction",
                  value: "2.5",
                  unit: "tons per year",
                  color: "primary",
                  gradientFrom: "from-primary/20",
                  gradientVia: "via-primary/10",
                  gradientTo: "to-primary/5",
                  ringColor: "ring-primary/30",
                  textColor: "text-primary"
                },
                {
                  icon: Timer,
                  label: "Adaptation Period",
                  value: "2-4",
                  unit: "weeks",
                  color: "blue",
                  gradientFrom: "from-blue-500/20",
                  gradientVia: "via-blue-500/10",
                  gradientTo: "to-blue-500/5",
                  ringColor: "ring-blue-500/30",
                  textColor: "text-blue-500"
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-4">
                        <div className={`p-3 w-fit rounded-xl bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientVia} ${stat.gradientTo} ring-1 ${stat.ringColor}`}>
                          <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.label}
                          </p>
                          <div className="mt-2">
                            <span className={`text-4xl font-bold ${stat.textColor} block`}>
                              {stat.value}
                            </span>
                            <span className="text-sm text-muted-foreground mt-1 block">
                              {stat.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Implementation Steps */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="mb-16 last:mb-0"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="p-8 relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20 shadow-lg shadow-primary/5">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <AlertCircle className="h-3.5 w-3.5" />
                            {step.difficulty}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Timer className="h-3.5 w-3.5" />
                            {step.timeToImplement}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <IndianRupee className="h-3.5 w-3.5" />
                            {step.initialCost}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6 opacity-20" />

                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="font-semibold flex items-center gap-2 text-primary">
                          <BarChart className="h-4 w-4" />
                          Key Statistics
                        </h4>
                        <ul className="space-y-4">
                          {Object.entries(step.stats).map(([key, value]) => (
                            <li
                              key={key}
                              className="flex items-center gap-3 group/stat"
                            >
                              <div className="h-2 w-2 rounded-full bg-primary group-hover/stat:scale-125 transition-transform duration-300" />
                              <span className="text-muted-foreground group-hover/stat:text-foreground transition-colors duration-300">
                                {value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h4 className="font-semibold flex items-center gap-2 text-primary">
                          <Wrench className="h-4 w-4" />
                          Implementation Tips
                        </h4>
                        <ul className="space-y-4">
                          {step.tips.map((tip, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 group/tip"
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-500 opacity-75 group-hover/tip:opacity-100 transition-opacity duration-300" />
                              <span className="text-muted-foreground group-hover/tip:text-foreground transition-colors duration-300">
                                {tip}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {step.warning && (
                          <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 relative overflow-hidden group/warning">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover/warning:opacity-100 transition-opacity duration-300" />
                            <p className="text-sm text-yellow-500 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 flex-shrink-0" />
                              <span className="relative">{step.warning}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 border-t border-border/40 bg-primary/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/[0.01] -z-10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Badge
              variant="outline"
              className="text-primary border-primary/20 uppercase tracking-wide text-xs font-semibold mb-6"
            >
              Start Your Journey
            </Badge>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
              Ready to Transform Your Commute?
            </h2>
            <p className="text-muted-foreground/90 mb-8 text-lg leading-relaxed">
              Get personalized recommendations and connect with local sustainable transportation initiatives to begin your eco-friendly journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}












