"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Home, Car, ShoppingBag, Users, Globe, Battery, ArrowUpRight, Timer } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function TakeAction() {
  const actions = [
    {
      title: "Personal Actions",
      description: "Impactful steps you can take in your daily life",
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      items: [
        {
          title: "Home Energy Optimization",
          description: "Transform your home into an energy-efficient sanctuary with smart devices and sustainable practices.",
          steps: ["Switch to LED lighting", "Install smart thermostats", "Improve insulation"],
          icon: Home,
          impact: "Medium",
          difficulty: "Easy",
          timeframe: "1-2 weeks"
        },
        {
          title: "Eco-Friendly Transportation",
          description: "Reduce your carbon footprint with sustainable transportation alternatives.",
          steps: ["Use public transport", "Consider electric vehicles", "Start carpooling"],
          icon: Car,
          impact: "High",
          difficulty: "Medium",
          timeframe: "1-3 months"
        },
        {
          title: "Sustainable Lifestyle",
          description: "Make conscious choices in your daily consumption and waste management.",
          steps: ["Choose eco-friendly products", "Practice recycling", "Reduce single-use items"],
          icon: ShoppingBag,
          impact: "Medium",
          difficulty: "Easy",
          timeframe: "Ongoing"
        }
      ]
    },
    {
      title: "Community Leadership",
      description: "Create lasting impact in your local community",
      icon: Globe,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      items: [
        {
          title: "Environmental Initiatives",
          description: "Lead local environmental projects that create visible community impact.",
          steps: ["Organize clean-up events", "Start community gardens", "Create recycling programs"],
          icon: Leaf,
          impact: "High",
          difficulty: "Medium",
          timeframe: "3-6 months"
        },
        {
          title: "Climate Education",
          description: "Empower your community through knowledge sharing and workshops.",
          steps: ["Host workshops", "Create educational content", "Mentor others"],
          icon: Users,
          impact: "Medium",
          difficulty: "Medium",
          timeframe: "Ongoing"
        },
        {
          title: "Renewable Energy Advocacy",
          description: "Champion clean energy adoption in your local area.",
          steps: ["Connect with officials", "Start petitions", "Build support groups"],
          icon: Battery,
          impact: "High",
          difficulty: "Hard",
          timeframe: "6-12 months"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background -z-10" />
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
              className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-8"
            >
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Global Impact Initiative</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 leading-tight pb-2">
              Take Action Today
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Every action counts in the fight against climate change. Join thousands of others making a real difference through simple, effective steps.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Action Categories */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {actions.map((category, index) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="mb-24 last:mb-0"
              >
                <div className="flex items-center gap-4 mb-12">
                  <div className={`p-3 rounded-2xl ${category.bgColor}`}>
                    <category.icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item) => (
                    <Link 
                      href={`/take-action/${item.title.toLowerCase().replace(/\s+/g, '-')}`} 
                      key={item.title}
                      className="h-full" // Add this to ensure Link takes full height
                    >
                      <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full flex flex-col">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2.5 rounded-xl ${category.bgColor}`}>
                              <item.icon className={`h-6 w-6 ${category.color}`} />
                            </div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                          </div>
                          <CardDescription className="text-base min-h-[3rem]">{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow">
                          <div className="space-y-2">
                            {item.steps.map((step, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                                {step}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center pt-4 border-t border-border mt-auto">
                          <div className="flex gap-3">
                            <Badge variant={item.impact === "High" ? "default" : "secondary"}>
                              Impact: {item.impact}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              {item.timeframe}
                            </Badge>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background -z-10" />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Lead the Change?</h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Join our community of climate activists and get personalized guidance, resources, and support to amplify your impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



