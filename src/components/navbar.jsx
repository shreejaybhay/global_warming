"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode_toggle";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "History", href: "/history" },
  { name: "Types", href: "/types" },
  { name: "Causes", href: "/causes" },
  { name: "Effects", href: "/effects" },
  { name: "Prevention", href: "/prevention" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-lg shadow-lg"
            : "bg-background/1 backdrop-blur-sm"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          {/* Logo */}
          <motion.div
            className="flex lg:flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="group -m-1.5 p-1.5 flex items-center gap-2"
            >
              <motion.div
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="font-bold text-xl text-foreground">
                Climate Aware
              </span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden gap-2">
            <ModeToggle />
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex lg:gap-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-semibold leading-6 group text-foreground"
                >
                  <span className="relative z-10 transition-colors group-hover:text-primary">
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Right Section */}
          <motion.div
            className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ModeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/prevention">Take Action</Link>
              </Button>
            </motion.div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-full bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/"
                    className="-m-1.5 p-1.5 flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Leaf className="h-8 w-8 text-primary" />
                    <span className="font-bold text-xl text-foreground">
                      Climate Aware
                    </span>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </motion.button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <div className="space-y-2 py-6">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent/10"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="py-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        asChild
                        className="w-full bg-primary text-primary-foreground"
                      >
                        <Link
                          href="/prevention"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Take Action
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
