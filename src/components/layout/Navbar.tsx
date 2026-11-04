"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { key: "about" },
  { key: "projects" },
  { key: "experience" },
  { key: "skills" },
  { key: "awards" },
  { key: "contact" },
] as const;

type NavKey = (typeof navItems)[number]["key"];

export function Navbar() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<NavKey>("about");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);

      // Determine active section based on scroll position
      const offsets = navItems
        .map((item) => {
          const el = document.getElementById(item.key);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { key: item.key, top: rect.top };
        })
        .filter((x): x is { key: NavKey; top: number } => x !== null);

      if (offsets.length > 0) {
        const passed = offsets.filter((o) => o.top <= 240);
        if (passed.length > 0) {
          setActiveSection(passed[passed.length - 1].key);
        } else {
          setActiveSection("about");
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "transparent"
          : "color-mix(in srgb, var(--bg-primary) 92%, transparent)",
        backdropFilter: scrolled ? "none" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "none" : "blur(12px)",
        borderBottom: "none",
        pointerEvents: scrolled ? "none" : "auto",
      }}
    >
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="h-[2px] origin-left"
        style={{
          scaleX,
          background: "var(--accent-blue)",
        }}
      />

      <nav
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16 pt-2" : "h-20"
        }`}
      >
        {/* Left: Circular Monogram Badge + Name (morphs on scroll like dataconale.com) */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group pointer-events-auto"
        >
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-mono-tech font-semibold transition-all duration-300 group-hover:scale-105 shadow-sm"
            style={{
              border: scrolled
                ? "1px solid var(--bg-inverted)"
                : "1px solid var(--border-strong)",
              color: scrolled ? "var(--text-inverted)" : "var(--text-primary)",
              background: scrolled ? "var(--bg-inverted)" : "transparent",
            }}
          >
            SFA
          </span>
          <span
            className={`text-[15px] font-medium tracking-[-0.015em] transition-all duration-300 origin-left ${
              scrolled
                ? "opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden"
                : "opacity-100 translate-x-0"
            }`}
            style={{ color: "var(--text-primary)" }}
          >
            Sixto Feliciano Arrejin
          </span>
        </Link>

        {/* Right: Navigation Links & Controls (morphs into floating pill on scroll like dataconale.com) */}
        <div
          className={`flex items-center transition-all duration-300 pointer-events-auto ${
            scrolled
              ? "px-2 py-1.5 rounded-full border shadow-lg gap-1"
              : "gap-6"
          }`}
          style={{
            background: scrolled
              ? "color-mix(in srgb, var(--bg-card) 94%, transparent)"
              : "transparent",
            borderColor: scrolled ? "var(--border-color)" : "transparent",
            backdropFilter: scrolled ? "blur(14px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          }}
        >
          <div
            className={`hidden md:flex items-center transition-all duration-300 ${
              scrolled ? "gap-0.5" : "gap-6"
            }`}
          >
            {navItems.map((item) => {
              const isActive = scrolled && activeSection === item.key;
              return (
                <Link
                  key={item.key}
                  href={`/#${item.key}`}
                  className={`text-[13.5px] transition-all duration-200 rounded-full whitespace-nowrap ${
                    scrolled ? "px-3.5 py-1.5 font-medium" : "py-1 font-normal"
                  }`}
                  style={{
                    background: isActive ? "var(--bg-inverted)" : "transparent",
                    color: isActive
                      ? "var(--text-inverted)"
                      : "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>

          <div
            className={`hidden md:block h-4 w-[1px] transition-opacity ${
              scrolled ? "mx-1.5" : ""
            }`}
            style={{ background: "var(--border-color)" }}
          />

          <div className="flex items-center gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
              aria-label="Menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-5 pt-2 border-t pointer-events-auto"
          style={{
            background: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div
            className="flex flex-col divide-y"
            style={{ borderColor: "var(--border-color)" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/#${item.key}`}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium flex items-center justify-between"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <span>{t(item.key)}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
