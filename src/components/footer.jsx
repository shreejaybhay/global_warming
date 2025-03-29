"use client";

import Link from "next/link";
import { Leaf, Twitter, Facebook, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
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

  return (
    <footer className="relative border-t border-border bg-muted/50 dark:bg-muted/10">
      <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />
      
      <div className="container mx-auto py-16 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl text-foreground">Climate Aware</span>
            </Link>
            <p className="text-muted-foreground">
              Educating and inspiring action on climate change through accessible, science-based information.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors group"
                >
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explore Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">
              Explore
            </h3>
            <ul className="space-y-3">
              {["History", "Types", "Causes", "Effects", "Prevention", "Gallery"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: "NASA Climate", url: "https://www.nasa.gov/climate" },
                { name: "IPCC", url: "https://www.ipcc.ch/" },
                { name: "UN Climate Action", url: "https://www.un.org/en/climatechange" },
                { name: "NOAA Climate", url: "https://www.noaa.gov/climate" }
              ].map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">
              Stay Updated
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@climateaware.org" className="text-muted-foreground hover:text-primary transition-colors">
                  info@climateaware.org
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-background"
                  />
                  <Button>
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Moved the copyright section outside the container */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Climate Aware. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
