"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Snowflake,
  Waves,
  Globe,
  Clock,
  Share2,
  Download,
  Info,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function IceMeltPage() {
  const [iceMeltData, setIceMeltData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("50");

  useEffect(() => {
    const fetchIceMeltData = async () => {
      try {
        const response = await fetch("/api/arctic");
        const data = await response.json();

        // Create a map to store the latest ice melt value for each year
        const yearMap = new Map();
        
        Object.entries(data.arcticData.data).forEach(([date, value]) => {
          const year = parseInt(date.substring(0, 4));
          const iceMelt = parseFloat(value.value);
          if (!isNaN(iceMelt)) {
            // Only keep the latest reading for each year
            yearMap.set(year, iceMelt);
          }
        });

        // Convert map to array and sort by year
        const formattedData = Array.from(yearMap.entries())
          .map(([year, iceMelt]) => ({
            year,
            iceMelt
          }))
          .sort((a, b) => a.year - b.year) // Sort by year ascending
          .slice(-parseInt(timeRange)); // Take last N years

        setIceMeltData(formattedData);
      } catch (error) {
        console.error("Error fetching ice melt data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIceMeltData();
  }, [timeRange]);

  const impacts = [
    {
      icon: Waves,
      title: "Sea Level Rise",
      description:
        "Melting ice sheets and glaciers contribute significantly to rising sea levels, threatening coastal regions.",
      stat: "+3.6mm/year",
    },
    {
      icon: Globe,
      title: "Arctic Changes",
      description:
        "Arctic sea ice extent is declining at an alarming rate, affecting global climate patterns.",
      stat: "-12.6% decade",
    },
    {
      icon: AlertTriangle,
      title: "Ecosystem Impact",
      description:
        "Loss of sea ice affects Arctic wildlife habitats and indigenous communities.",
      stat: "Critical Risk",
    },
  ];

  const timeRangeOptions = [
    { value: "20", label: "20 Years" },
    { value: "50", label: "50 Years" },
    { value: "100", label: "100 Years" },
  ];

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
            <span className="text-primary">Ice Melt</span>
          </div>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Snowflake className="h-4 w-4" />
            <span className="text-sm font-medium">Live Ice Melt Data</span>
          </motion.div>

          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Global Ice Melt Crisis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tracking the accelerating loss of Earth's ice sheets and its impact on global climate systems.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 bg-gradient-to-br from-background to-primary/5 overflow-hidden">
              <CardHeader className="border-b border-border/40">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                      Arctic Sea Ice Extent
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Sea ice extent in millions of square kilometers
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Historical ice extent from {iceMeltData[0]?.year || "1979"} to present
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {timeRangeOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={timeRange === option.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTimeRange(option.value)}
                          className="text-xs"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-lg">
                      <Snowflake className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Latest Reading</p>
                        {loading ? (
                          <Skeleton className="h-8 w-24" />
                        ) : (
                          <p className="text-2xl font-bold text-primary">
                            {iceMeltData[iceMeltData.length - 1]?.iceMelt.toFixed(2)} M km²
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {loading ? (
                  <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="text-muted-foreground">Processing ice melt data...</p>
                  </div>
                ) : (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={iceMeltData}
                        margin={{ top: 20, right: 30, left: 50, bottom: 40 }}
                      >
                        <defs>
                          <linearGradient
                            id="iceMeltGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                          dataKey="year"
                          label={{
                            value: "Year",
                            position: "insideBottom",
                            offset: -15,
                            style: {
                              textAnchor: "middle",
                              fill: "hsl(var(--muted-foreground))",
                              fontSize: 14,
                            },
                          }}
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <YAxis
                          label={{
                            value: "Sea Ice Extent (M km²)",
                            angle: -90,
                            position: "insideLeft",
                            offset: -35,
                            style: {
                              textAnchor: "middle",
                              fill: "hsl(var(--muted-foreground))",
                              fontSize: 14,
                            },
                          }}
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value) => [`${value.toFixed(2)} M km²`, "Ice Extent"]}
                          labelFormatter={(label) => `Year: ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="iceMelt"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{
                            r: 8,
                            fill: "hsl(var(--primary))",
                            strokeWidth: 2,
                          }}
                          fill="url(#iceMeltGradient)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-1 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  Key Statistics
                  <span className="text-xs text-muted-foreground font-normal">
                    (Last {timeRange} years)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors">
                        <p className="text-sm text-muted-foreground mb-1">Current Ice Extent</p>
                        <p className="text-2xl font-bold text-primary">
                          {iceMeltData[iceMeltData.length - 1]?.iceMelt.toFixed(2)} M km²
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Latest measurement</p>
                      </div>

                      <div className="p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors">
                        <p className="text-sm text-muted-foreground mb-1">Average Change</p>
                        <p className="text-2xl font-bold text-primary">
                          {((iceMeltData[iceMeltData.length - 1]?.iceMelt - iceMeltData[0]?.iceMelt) / timeRange * 10).toFixed(2)}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Per decade</p>
                      </div>

                      <div className="p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors">
                        <p className="text-sm text-muted-foreground mb-1">Historical Minimum</p>
                        <p className="text-2xl font-bold text-primary">
                          {Math.min(...iceMeltData.map(d => d.iceMelt)).toFixed(2)} M km²
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Lowest recorded extent</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/40">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Data sourced from satellite observations of Arctic sea ice extent. Lower values indicate reduced ice coverage and warming trends.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Global Impacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="mb-4 p-3 w-fit rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <impact.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2 flex items-center justify-between">
                      {impact.title}
                      <span className="text-sm font-normal text-primary">{impact.stat}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{impact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <Card className="bg-primary/5 border-none p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <CardContent className="space-y-6 relative z-10">
              <h2 className="text-3xl font-bold">Ready to Make a Difference?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our community of climate advocates and discover practical ways to contribute to reducing global ice melt.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/take-action">Take Action Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}




