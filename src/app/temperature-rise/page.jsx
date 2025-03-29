"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Thermometer,
  AlertTriangle,
  Globe,
  Clock,
  Share2,
  Download,
  Info,
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

export default function TemperatureRisePage() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("50"); // New state for time range filter

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await fetch(
          "https://global-warming.org/api/temperature-api"
        );
        const data = await response.json();

        // Create a map to store the latest temperature for each year
        const yearMap = new Map();
        
        data.result.forEach((item) => {
          const year = parseInt(item.time);
          // Only keep the latest temperature reading for each year
          yearMap.set(year, parseFloat(item.station));
        });

        // Convert map to array and sort by year
        const formattedData = Array.from(yearMap.entries())
          .map(([year, temperature]) => ({
            year,
            temperature
          }))
          .sort((a, b) => a.year - b.year) // Sort by year ascending
          .slice(-parseInt(timeRange)); // Take last N years

        setTemperatureData(formattedData);
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemperatureData();
  }, [timeRange]);

  const impacts = [
    {
      icon: Globe,
      title: "Rising Sea Levels",
      description:
        "Thermal expansion of oceans and melting ice sheets contribute to rising sea levels, threatening coastal communities worldwide.",
      stat: "+3.4mm/year",
    },
    {
      icon: AlertTriangle,
      title: "Extreme Weather",
      description:
        "Increased frequency and intensity of heatwaves, storms, and other extreme weather events affecting global populations.",
      stat: "+54% since 1960",
    },
    {
      icon: Clock,
      title: "Long-term Effects",
      description:
        "Permanent changes to ecosystems, biodiversity loss, and disruption of agricultural systems impacting food security.",
      stat: "1.5°C threshold",
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
        {/* Navigation with Breadcrumbs */}
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
            <span className="text-primary">Temperature Rise</span>
          </div>
        </nav>

        {/* Hero Section with Enhanced Animation */}
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
            <Thermometer className="h-4 w-4" />
            <span className="text-sm font-medium">Live Temperature Data</span>
          </motion.div>

          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Earth's Rising Temperature
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analyzing the critical increase in global temperatures and its
            impact on our planet's future.
          </p>
        </motion.section>

        {/* Temperature Chart Section with Enhanced Controls */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart Card with Enhanced UI */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-background to-primary/5 overflow-hidden">
              <CardHeader className="border-b border-border/40">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                      Global Temperature Trends
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Temperature anomalies from baseline average
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Historical temperature anomalies from{" "}
                      {temperatureData[0]?.year || "1880"} to present
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {timeRangeOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={
                            timeRange === option.value ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setTimeRange(option.value)}
                          className="text-xs"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-lg">
                      <Thermometer className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Latest Reading</p>
                        {loading ? (
                          <Skeleton className="h-8 w-24" />
                        ) : (
                          <p className="text-2xl font-bold text-primary">
                            {temperatureData[
                              temperatureData.length - 1
                            ]?.temperature.toFixed(2)}
                            °C
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Chart Content with Enhanced Loading State */}
              <CardContent className="p-6">
                {loading ? (
                  <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="text-muted-foreground">
                      Processing temperature data...
                    </p>
                  </div>
                ) : (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={temperatureData}
                        margin={{ top: 20, right: 30, left: 50, bottom: 40 }}
                      >
                        {/* Enhanced Chart Configuration */}
                        <defs>
                          <linearGradient
                            id="temperatureGradient"
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
                          tickFormatter={(value) => value}
                          interval={timeRange === "20" ? 2 : timeRange === "50" ? 5 : 10}
                          minTickGap={30}
                        />
                        <YAxis
                          label={{
                            value: "Temperature (°C)",
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
                          formatter={(value) => [
                            `${value.toFixed(2)}°C`,
                            "Temperature",
                          ]}
                          labelFormatter={(label) =>
                            `Year: ${Math.floor(label)}`
                          }
                        />
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{
                            r: 8,
                            fill: "hsl(var(--primary))",
                            strokeWidth: 2,
                          }}
                          fill="url(#temperatureGradient)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Stats Card */}
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
                        <p className="text-sm text-muted-foreground mb-1">
                          Highest Temperature
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {Math.max(
                            ...temperatureData.map((d) => d.temperature)
                          ).toFixed(2)}
                          °C
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recorded anomaly above baseline
                        </p>
                      </div>

                      <div className="p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors">
                        <p className="text-sm text-muted-foreground mb-1">
                          Average Change
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {(
                            temperatureData.reduce(
                              (acc, curr) => acc + curr.temperature,
                              0
                            ) / temperatureData.length
                          ).toFixed(2)}
                          °C
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Mean temperature anomaly
                        </p>
                      </div>

                      <div className="p-4 bg-background rounded-lg hover:bg-primary/5 transition-colors">
                        <p className="text-sm text-muted-foreground mb-1">
                          Rate of Change
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {(
                            (temperatureData[temperatureData.length - 1]
                              ?.temperature -
                              temperatureData[0]?.temperature) /
                            (temperatureData.length / 10)
                          ).toFixed(2)}
                          °C/decade
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Average increase per decade
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/40">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Data sourced from global temperature records, showing
                        deviations from the baseline temperature. Positive
                        values indicate warming trends.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Enhanced Impact Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Global Impacts
          </h2>
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
                      <span className="text-sm font-normal text-primary">
                        {impact.stat}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {impact.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <Card className="bg-primary/5 border-none p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <CardContent className="space-y-6 relative z-10">
              <h2 className="text-3xl font-bold">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our community of climate advocates and discover practical
                ways to contribute to reducing global warming.
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




