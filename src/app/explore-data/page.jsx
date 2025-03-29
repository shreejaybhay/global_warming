"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Thermometer,
  Droplets,
  Wind,
  Globe2,
  TreePine,
  Waves,
  AlertCircle,
  RefreshCcw,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

// Add these animation variants at the top of your file
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

// Define graphConfig outside the component since it's static
const graphConfig = {
  co2: {
    title: "CO2 Levels",
    dataKey: "cycle",
    unit: "ppm",
    color: "hsl(var(--primary))",
    xAxis: "day",
    gradientStart: "hsl(var(--primary) / 0.2)",
    gradientEnd: "hsl(var(--primary) / 0)",
    xAxisLabel: "Time",
    yAxisLabel: "CO₂ Concentration",
    decimals: 2,
  },
  temperature: {
    title: "Temperature Anomaly",
    dataKey: "land",
    unit: "°C",
    color: "#ef4444", // Red
    xAxis: "time",
    gradientStart: "#ef444433",
    gradientEnd: "#ef444400",
    xAxisLabel: "Time",
    yAxisLabel: "Temperature Anomaly",
    decimals: 2,
  },
  methane: {
    title: "Methane Levels",
    dataKey: "average",
    unit: "ppb",
    color: "#f97316", // Orange
    xAxis: "date",
    gradientStart: "#f9731633",
    gradientEnd: "#f9731600",
    xAxisLabel: "Time",
    yAxisLabel: "Methane Concentration",
    decimals: 2,
  },
  nitrousOxide: {
    title: "Nitrous Oxide Levels",
    dataKey: "average",
    unit: "ppb",
    color: "#a855f7", // Purple
    xAxis: "date",
    gradientStart: "#a855f733",
    gradientEnd: "#a855f700",
    xAxisLabel: "Time",
    yAxisLabel: "Nitrous Oxide Concentration",
    decimals: 2,
  },
  arctic: {
    title: "Arctic Sea Ice Extent",
    dataKey: "extent",
    unit: "million km²",
    color: "#3b82f6", // Blue
    xAxis: "date",
    gradientStart: "#3b82f633",
    gradientEnd: "#3b82f600",
    xAxisLabel: "Time",
    yAxisLabel: "Arctic Sea Ice Extent",
    decimals: 2,
  },
  oceanWarming: {
    title: "Ocean Warming",
    dataKey: "temperature",
    unit: "°C",
    color: "#06b6d4", // Cyan
    xAxis: "date",
    gradientStart: "#06b6d433",
    gradientEnd: "#06b6d400",
    xAxisLabel: "Time",
    yAxisLabel: "Ocean Temperature Anomaly",
    decimals: 2,
  },
};

export default function ClimateDataDashboard() {
  const [data, setData] = useState({
    co2: [],
    temperature: [],
    methane: [],
    nitrousOxide: [],
    arctic: [],
    oceanWarming: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTimeRange, setActiveTimeRange] = useState("1y");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState(null);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      setError(null);

      const [co2Res, tempRes, methaneRes, nitrousRes, arcticRes, oceanRes] =
        await Promise.all([
          fetch("https://global-warming.org/api/co2-api"),
          fetch("https://global-warming.org/api/temperature-api"),
          fetch("https://global-warming.org/api/methane-api"),
          fetch("https://global-warming.org/api/nitrous-oxide-api"),
          fetch("https://global-warming.org/api/arctic-api"),
          fetch("https://global-warming.org/api/ocean-warming-api"),
        ]);

      const [
        co2Data,
        tempData,
        methaneData,
        nitrousData,
        arcticData,
        oceanData,
      ] = await Promise.all([
        co2Res.json(),
        tempRes.json(),
        methaneRes.json(),
        nitrousRes.json(),
        arcticRes.json(),
        oceanRes.json(),
      ]);

      // Transform methane data
      const methaneArray = methaneData.methane
        .map((item) => ({
          date: item.date.substring(0, 7),
          average: parseFloat(item.average),
        }))
        .filter((item) => !isNaN(item.average));

      // Transform nitrous oxide data
      const nitrousArray = nitrousData.nitrous
        .map((item) => ({
          date: item.date.substring(0, 7),
          average: parseFloat(item.average),
        }))
        .filter((item) => !isNaN(item.average));

      // Transform arctic data
      const arcticArray = Object.entries(arcticData.arcticData.data)
        .map(([date, value]) => ({
          date: date.substring(0, 4) + "-" + date.substring(4, 6),
          extent: parseFloat(value.value),
        }))
        .filter((item) => !isNaN(item.extent));

      // Transform ocean warming data
      const oceanWarmingArray = Object.entries(oceanData.result)
        .map(([date, value]) => ({
          date: date + "-01",
          temperature: parseFloat(value.anomaly),
        }))
        .filter((item) => !isNaN(item.temperature));

      // Add console logging to debug
      console.log("Data arrays:", {
        methane: methaneArray.length,
        nitrous: nitrousArray.length,
        arctic: arcticArray.length,
        ocean: oceanWarmingArray.length,
      });

      // Sort arrays by date
      const sortByDate = (a, b) => new Date(a.date) - new Date(b.date);

      methaneArray.sort(sortByDate);
      nitrousArray.sort(sortByDate);
      arcticArray.sort(sortByDate);
      oceanWarmingArray.sort(sortByDate);

      setData({
        co2: co2Data.co2 || [],
        temperature: tempData.result || [],
        methane: methaneArray,
        nitrousOxide: nitrousArray,
        arctic: arcticArray,
        oceanWarming: oceanWarmingArray,
      });
    } catch (error) {
      setError("Failed to fetch climate data. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Current data state:", {
      methaneLength: data.methane.length,
      nitrousLength: data.nitrousOxide.length,
      arcticLength: data.arctic.length,
      oceanLength: data.oceanWarming.length,
      methaneExample: data.methane[0],
      nitrousExample: data.nitrousOxide[0],
      arcticExample: data.arctic[0],
      oceanExample: data.oceanWarming[0],
    });
  }, [data]);

  const timeRanges = [
    { value: "1y", label: "1 Year", days: 365 },
    { value: "5y", label: "5 Years", days: 1825 },
    { value: "all", label: "All Time", days: Infinity },
  ];

  const getSlicedData = (dataArray, days) => {
    if (!Array.isArray(dataArray)) {
      return [];
    }
    return dataArray.slice(-days);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading climate data...</p>
        </motion.div>
      </div>
    );
  }

  const GraphPopup = ({ isOpen, onClose, data, type }) => {
    const config = graphConfig[type];
    
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] h-[80vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: config.color }}>
              {config.title}
            </h2>
          </div>
          <div className="h-[calc(80vh-100px)]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <defs>
                  <linearGradient
                    id={`${type}GradientLarge`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={config.gradientStart} />
                    <stop offset="95%" stopColor={config.gradientEnd} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey={config.xAxis}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888888", fontSize: 12 }}
                  tickFormatter={(value) => {
                    if (type === "co2") {
                      return `Day ${value}`;
                    }
                    // For other graphs, keep existing date formatting
                    return value.substring(0, 7);
                  }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888888", fontSize: 12 }}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  labelFormatter={(label) => {
                    if (type === "co2") {
                      return `Day ${label}`;
                    }
                    // For other graphs, keep existing date formatting
                    return `Date: ${label}`;
                  }}
                  formatter={(value) => {
                    if (value === null || value === undefined) {
                      return ["N/A", config.title];
                    }
                    return [`${Number(value).toFixed(config.decimals)} ${config.unit}`, config.title];
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => `${config.title} (${config.unit})`}
                />
                <Area
                  name={config.title}
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke={config.color}
                  fill={`url(#${type}GradientLarge)`}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: config.color,
                    strokeWidth: 2,
                    fill: "white",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative py-20 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80">
              Global Climate Monitor
            </h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              Real-time insights into Earth's vital signs and climate indicators
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                variant="outline"
                className="gap-2"
                onClick={fetchData}
                disabled={refreshing}
              >
                <RefreshCcw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh Data
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 mb-8"
          >
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-12"
      >
        <div className="container mx-auto px-4">
          {/* Time Range Selector */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container mx-auto px-4 mb-8"
          >
            <motion.div variants={fadeInUp} className="flex justify-center gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={activeTimeRange === range.value ? "default" : "outline"}
                  onClick={() => setActiveTimeRange(range.value)}
                  className="transition-all duration-200"
                >
                  {range.label}
                </Button>
              ))}
            </motion.div>
          </motion.section>

          {/* Main Dashboard Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* CO2 Levels Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      CO2 Levels
                    </CardTitle>
                    <CardDescription>
                      Atmospheric CO2 concentration
                    </CardDescription>
                  </div>
                  <Thermometer
                    className="h-5 w-5"
                    style={{ color: graphConfig.co2.color }}
                  />
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] mt-4 cursor-pointer" onClick={() =>
                    setSelectedGraph({
                      type: "co2",
                      data: getSlicedData(
                        data.co2,
                        timeRanges.find((r) => r.value === activeTimeRange).days
                      ),
                    })
                  }>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={getSlicedData(
                          data.co2,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        )}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={graphConfig.co2.gradientStart} />
                            <stop offset="95%" stopColor={graphConfig.co2.gradientEnd} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                          tickFormatter={(value) => {
                            // Since these are days, we can just return the value directly
                            return value;
                          }}
                        />
                        <YAxis
                          domain={["auto", "auto"]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                          width={40}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                          formatter={(value) => {
                            if (value === null || value === undefined) {
                              return ["N/A", graphConfig.co2.title];
                            }
                            return [
                              `${Number(value).toFixed(2)} ${graphConfig.co2.unit}`,
                              graphConfig.co2.title,
                            ];
                          }}
                          labelFormatter={(label) => `Day ${label}`}
                        />
                        <Legend />
                        <Area
                          name="CO2 Level"
                          type="monotone"
                          dataKey="cycle"
                          stroke={graphConfig.co2.color}
                          fill="url(#co2Gradient)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{
                            r: 4,
                            stroke: graphConfig.co2.color,
                            strokeWidth: 2,
                            fill: "white",
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.co2.color}10`,
                        color: graphConfig.co2.color,
                        borderColor: `${graphConfig.co2.color}30`,
                      }}
                    >
                      Latest: {data.co2[data.co2.length - 1]?.cycle ? 
                        Number(data.co2[data.co2.length - 1].cycle).toFixed(2) : "N/A"} ppm
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.co2.color}10`,
                        color: graphConfig.co2.color,
                        borderColor: `${graphConfig.co2.color}30`,
                      }}
                    >
                      Change: {data.co2.length > 0 ? (
                        Number(data.co2[data.co2.length - 1]?.cycle) -
                        Number(data.co2[0]?.cycle)
                      ).toFixed(2) : "0.00"} ppm
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Temperature Anomaly Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      Temperature Anomaly
                    </CardTitle>
                    <CardDescription>
                      Global temperature deviation
                    </CardDescription>
                  </div>
                  <Globe2 className="h-5 w-5 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div
                    className="h-[200px] mt-4 cursor-pointer"
                    onClick={() =>
                      setSelectedGraph({
                        type: "temperature",
                        data: getSlicedData(
                          data.temperature,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        ),
                      })
                    }
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getSlicedData(
                          data.temperature,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        )}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                          dataKey="time"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                          tickFormatter={(value) => {
                            // Show only the year
                            return value.substring(0, 4);
                          }}
                        />
                        <YAxis
                          domain={["auto", "auto"]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                          labelFormatter={(label) =>
                            `Year: ${label.substring(0, 4)}`
                          }
                          formatter={(value) => [
                            `${Number(value).toFixed(2)}°C`,
                            "Temperature Anomaly",
                          ]}
                        />
                        <Legend />
                        <Line
                          name="Temperature Anomaly"
                          type="monotone"
                          dataKey="land"
                          stroke="hsl(var(--destructive))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-destructive/5 text-destructive"
                    >
                      Latest:{" "}
                      {data.temperature[data.temperature.length - 1]?.land ||
                        "N/A"}
                      °C
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-destructive/5 text-destructive"
                    >
                      Trend:{" "}
                      {(
                        data.temperature[data.temperature.length - 1]?.land -
                          data.temperature[0]?.land || 0
                      ).toFixed(2)}
                      °C
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Methane Levels Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      Methane Levels
                    </CardTitle>
                    <CardDescription>
                      Atmospheric methane concentration
                    </CardDescription>
                  </div>
                  <Wind
                    className="h-5 w-5"
                    style={{ color: graphConfig.methane.color }}
                  />
                </CardHeader>
                <CardContent>
                  <div
                    className="h-[200px] mt-4 cursor-pointer relative group"
                    onClick={() =>
                      setSelectedGraph({
                        type: "methane",
                        data: getSlicedData(
                          data.methane,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        ),
                      })
                    }
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/5 rounded-lg">
                      <ZoomIn className="w-6 h-6 text-gray-500" />
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={getSlicedData(
                          data.methane,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        )}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="methaneGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={graphConfig.methane.gradientStart}
                            />
                            <stop
                              offset="95%"
                              stopColor={graphConfig.methane.gradientEnd}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          opacity={0.1}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                          tickFormatter={(value) => {
                            // Extract just the year from the date
                            return value.substring(0, 4);
                          }}
                        />
                        <YAxis
                          domain={["auto", "auto"]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                          width={40}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                          formatter={(value) => {
                            if (value === null || value === undefined) {
                              return ["N/A", graphConfig.methane.title];
                            }
                            return [
                              `${Number(value).toFixed(2)} ${
                                graphConfig.methane.unit
                              }`,
                              graphConfig.methane.title,
                            ];
                          }}
                          labelFormatter={(label) =>
                            `Year: ${label.substring(0, 4)}`
                          }
                        />
                        <Area
                          name="Methane Level"
                          type="monotone"
                          dataKey="average"
                          stroke={graphConfig.methane.color}
                          fill="url(#methaneGradient)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{
                            r: 4,
                            stroke: graphConfig.methane.color,
                            strokeWidth: 2,
                            fill: "white",
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.methane.color}10`,
                        color: graphConfig.methane.color,
                        borderColor: `${graphConfig.methane.color}30`,
                      }}
                    >
                      Latest:{" "}
                      {data.methane[data.methane.length - 1]?.average || "N/A"}{" "}
                      ppb
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.methane.color}10`,
                        color: graphConfig.methane.color,
                        borderColor: `${graphConfig.methane.color}30`,
                      }}
                    >
                      Change:{" "}
                      {(
                        data.methane[data.methane.length - 1]?.average -
                          data.methane[0]?.average || 0
                      ).toFixed(2)}{" "}
                      ppb
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Arctic Sea Ice Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      Arctic Sea Ice
                    </CardTitle>
                    <CardDescription>Sea ice extent</CardDescription>
                  </div>
                  <Waves
                    className="h-5 w-5"
                    style={{ color: graphConfig.arctic.color }}
                  />
                </CardHeader>
                <CardContent>
                  <div
                    className="h-[200px] mt-4 cursor-pointer"
                    onClick={() =>
                      setSelectedGraph({
                        type: "arctic",
                        data: getSlicedData(
                          data.arctic,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        ),
                      })
                    }
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={getSlicedData(
                          data.arctic,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        )}
                      >
                        <defs>
                          <linearGradient
                            id="arcticGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={graphConfig.arctic.gradientStart}
                            />
                            <stop
                              offset="95%"
                              stopColor={graphConfig.arctic.gradientEnd}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                          tickFormatter={(value) => value.substring(0, 4)}
                        />
                        <YAxis
                          domain={["auto", "auto"]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                          labelFormatter={(label) =>
                            `Year: ${label.substring(0, 4)}`
                          }
                          formatter={(value) => [
                            `${Number(value).toFixed(2)} ${
                              graphConfig.arctic.unit
                            }`,
                            "Sea Ice Extent",
                          ]}
                        />
                        <Legend />
                        <Area
                          name="Sea Ice Extent"
                          type="monotone"
                          dataKey="extent"
                          stroke={graphConfig.arctic.color}
                          fill="url(#arcticGradient)"
                          dot={false}
                          activeDot={{
                            r: 4,
                            stroke: graphConfig.arctic.color,
                            strokeWidth: 2,
                            fill: "white",
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.arctic.color}10`,
                        color: graphConfig.arctic.color,
                        borderColor: `${graphConfig.arctic.color}30`,
                      }}
                    >
                      Latest:{" "}
                      {data.arctic[data.arctic.length - 1]?.extent || "N/A"} M km²
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.arctic.color}10`,
                        color: graphConfig.arctic.color,
                        borderColor: `${graphConfig.arctic.color}30`,
                      }}
                    >
                      Change:{" "}
                      {(
                        data.arctic[data.arctic.length - 1]?.extent -
                          data.arctic[0]?.extent || 0
                      ).toFixed(2)}{" "}
                      M km²
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ocean Warming Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      Ocean Warming
                    </CardTitle>
                    <CardDescription>Ocean temperature anomaly</CardDescription>
                  </div>
                  <Droplets
                    className="h-5 w-5"
                    style={{ color: graphConfig.oceanWarming.color }}
                  />
                </CardHeader>
                <CardContent>
                  <div
                    className="h-[200px] mt-4 cursor-pointer"
                    onClick={() =>
                      setSelectedGraph({
                        type: "oceanWarming",
                        data: getSlicedData(
                          data.oceanWarming,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        ),
                      })
                    }
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={getSlicedData(
                          data.oceanWarming,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        )}
                      >
                        <defs>
                          <linearGradient
                            id="oceanGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={graphConfig.oceanWarming.gradientStart}
                            />
                            <stop
                              offset="95%"
                              stopColor={graphConfig.oceanWarming.gradientEnd}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                          tickFormatter={(value) => value.substring(0, 4)}
                        />
                        <YAxis
                          domain={["auto", "auto"]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                          labelFormatter={(label) =>
                            `Year: ${label.substring(0, 4)}`
                          }
                          formatter={(value) => [
                            `${Number(value).toFixed(2)}°C`,
                            "Ocean Temperature",
                          ]}
                        />
                        <Legend />
                        <Area
                          name="Ocean Temperature"
                          type="monotone"
                          dataKey="temperature"
                          stroke={graphConfig.oceanWarming.color}
                          fill="url(#oceanGradient)"
                          dot={false}
                          activeDot={{
                            r: 4,
                            stroke: graphConfig.oceanWarming.color,
                            strokeWidth: 2,
                            fill: "white",
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.oceanWarming.color}10`,
                        color: graphConfig.oceanWarming.color,
                        borderColor: `${graphConfig.oceanWarming.color}30`,
                      }}
                    >
                      Latest:{" "}
                      {data.oceanWarming[data.oceanWarming.length - 1]
                        ?.temperature || "N/A"}
                      °C
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.oceanWarming.color}10`,
                        color: graphConfig.oceanWarming.color,
                        borderColor: `${graphConfig.oceanWarming.color}30`,
                      }}
                    >
                      Change:{" "}
                      {(
                        data.oceanWarming[data.oceanWarming.length - 1]
                          ?.temperature - data.oceanWarming[0]?.temperature || 0
                      ).toFixed(2)}
                      °C
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Nitrous Oxide Levels Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      Nitrous Oxide Levels
                    </CardTitle>
                    <CardDescription>
                      Atmospheric N2O concentration
                    </CardDescription>
                  </div>
                  <Wind
                    className="h-5 w-5"
                    style={{ color: graphConfig.nitrousOxide.color }}
                  />
                </CardHeader>
                <CardContent>
                  <div
                    className="h-[200px] mt-4 cursor-pointer"
                    onClick={() =>
                      setSelectedGraph({
                        type: "nitrousOxide",
                        data: getSlicedData(
                          data.nitrousOxide,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        ),
                      })
                    }
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={getSlicedData(
                          data.nitrousOxide,
                          timeRanges.find((r) => r.value === activeTimeRange).days
                        )}
                      >
                        <defs>
                          <linearGradient
                            id="nitrousGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={graphConfig.nitrousOxide.gradientStart}
                            />
                            <stop
                              offset="95%"
                              stopColor={graphConfig.nitrousOxide.gradientEnd}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                          tickFormatter={(value) => value.substring(0, 4)}
                        />
                        <YAxis
                          domain={["auto", "auto"]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#888888", fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                          labelFormatter={(label) =>
                            `Year: ${label.substring(0, 4)}`
                          }
                          formatter={(value) => [
                            `${Number(value).toFixed(2)} ppb`,
                            "N₂O Level",
                          ]}
                        />
                        <Legend />
                        <Area
                          name="N₂O Level"
                          type="monotone"
                          dataKey="average"
                          stroke={graphConfig.nitrousOxide.color}
                          fill="url(#nitrousGradient)"
                          dot={false}
                          activeDot={{
                            r: 4,
                            stroke: graphConfig.nitrousOxide.color,
                            strokeWidth: 2,
                            fill: "white",
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.nitrousOxide.color}10`,
                        color: graphConfig.nitrousOxide.color,
                        borderColor: `${graphConfig.nitrousOxide.color}30`,
                      }}
                    >
                      Latest:{" "}
                      {data.nitrousOxide[data.nitrousOxide.length - 1]?.average ||
                        "N/A"}{" "}
                      ppb
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-opacity-10"
                      style={{
                        backgroundColor: `${graphConfig.nitrousOxide.color}10`,
                        color: graphConfig.nitrousOxide.color,
                        borderColor: `${graphConfig.nitrousOxide.color}30`,
                      }}
                    >
                      Change:{" "}
                      {(
                        data.nitrousOxide[data.nitrousOxide.length - 1]?.average -
                          data.nitrousOxide[0]?.average || 0
                      ).toFixed(2)}{" "}
                      ppb
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Graph Popup */}
      {selectedGraph && (
        <GraphPopup
          isOpen={!!selectedGraph}
          onClose={() => setSelectedGraph(null)}
          data={selectedGraph.data}
          type={selectedGraph.type}
        />
      )}
    </div>
  );
}



