"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  CloudRain,
  AlertTriangle,
  Share2,
  Download,
  Wind,
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

export default function ExtremeWeatherPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("50");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/api/extreme-weather");
        const data = await response.json();

        // Create a map to store the latest weather event value for each year
        const yearMap = new Map();

        Object.entries(data.weatherData.data).forEach(([date, value]) => {
          const year = parseInt(date.substring(0, 4));
          const events = parseFloat(value.value);
          if (!isNaN(events)) {
            // Only keep the latest reading for each year
            yearMap.set(year, events);
          }
        });

        // Convert map to array and sort by year
        const formattedData = Array.from(yearMap.entries())
          .map(([year, events]) => ({
            year,
            events,
          }))
          .sort((a, b) => a.year - b.year) // Sort by year ascending
          .slice(-parseInt(timeRange)); // Take last N years

        setWeatherData(formattedData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // Fallback to simulated data if API fails
        const simulatedData = Array.from({ length: 100 }, (_, index) => ({
          year: 1923 + index,
          events: Math.floor(Math.random() * 800) + 200 + index * 3,
        }))
          .sort((a, b) => a.year - b.year)
          .slice(-parseInt(timeRange));

        setWeatherData(simulatedData);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [timeRange]);

  const impacts = [
    {
      icon: Wind,
      title: "Increased Intensity",
      description:
        "Hurricanes and tropical storms are becoming more intense due to warmer ocean temperatures.",
      stat: "+7% intensity",
    },
    {
      icon: CloudRain,
      title: "Frequency",
      description:
        "More frequent extreme weather events including floods, droughts, and storms.",
      stat: "+35% since 1980",
    },
    {
      icon: AlertTriangle,
      title: "Economic Impact",
      description:
        "Rising costs of weather-related disasters affecting communities worldwide.",
      stat: "$145B annual cost",
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
            <span className="text-primary">Extreme Weather</span>
          </div>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Global Extreme Weather Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tracking the increasing frequency and intensity of extreme weather
            events as climate change accelerates.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">
                      Event Frequency Trend
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Annual count of extreme weather events worldwide
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
                      <Wind className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Latest Count</p>
                        {loading ? (
                          <Skeleton className="h-8 w-24" />
                        ) : (
                          <p className="text-2xl font-bold text-primary">
                            {weatherData[weatherData.length - 1]?.events} Events
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
                    <p className="text-muted-foreground">
                      Processing weather data...
                    </p>
                  </div>
                ) : (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={weatherData}
                        margin={{ top: 20, right: 30, left: 50, bottom: 40 }}
                      >
                        <defs>
                          <linearGradient
                            id="weatherGradient"
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
                          tick={{ fill: "hsl(var(--foreground))" }}
                        />
                        <YAxis
                          tick={{ fill: "hsl(var(--foreground))" }}
                          label={{
                            value: "Number of Events",
                            angle: -90,
                            position: "insideLeft",
                            fill: "hsl(var(--foreground))",
                          }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                          }}
                          formatter={(value) => [
                            `${value} Events`,
                            "Frequency",
                          ]}
                          labelFormatter={(label) => `Year: ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="events"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{
                            r: 8,
                            fill: "hsl(var(--primary))",
                            strokeWidth: 2,
                          }}
                          fill="url(#weatherGradient)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-6 md:grid-cols-3 my-12"
        >
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{impact.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {impact.description}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {impact.stat}
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
          className="mb-24"
        >
          <Card className="bg-primary/5 border-none p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <CardContent className="space-y-6 relative z-10">
              <h2 className="text-3xl font-bold">Take Action Today</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn how you can help reduce the impact of climate change and
                extreme weather events in your community.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}

