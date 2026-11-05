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
  const [activeSection, setActiveSection] = useState<NavKey | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // In Hero area (< 260px) -> no active section highlighted
      if (y < 260) {
        setActiveSection(null);
        return;
      }

      // If scrolled near bottom of page -> activate last section ("contact")
      if (
        window.innerHeight + y >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection("contact");
        return;
      }

      // Check section offsets
      const offsets = navItems
        .map((item) => {
          const el = document.getElementById(item.key);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { key: item.key, top: rect.top };
        })
        .filter((x): x is { key: NavKey; top: number } => x !== null);

      if (offsets.length > 0) {
        // Find sections that have entered the viewport threshold (top <= 220px)
        const passed = offsets.filter((o) => o.top <= 220);
        if (passed.length > 0) {
          setActiveSection(passed[passed.length - 1].key);
        } else {
          setActiveSection(offsets[0].key);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const isHome =
        path === "/" ||
        path === "/es" ||
        path === "/en" ||
        path === "/es/" ||
        path === "/en/";

      if (isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", path);
      }
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    key: NavKey
  ) => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const isHome =
        path === "/" ||
        path === "/es" ||
        path === "/en" ||
        path === "/es/" ||
        path === "/en/";

      if (isHome) {
        const el = document.getElementById(key);
        if (el) {
          e.preventDefault();
          // Find the actual inner content wrapper to measure exact visual top
          const content =
            el.querySelector<HTMLElement>(".max-w-6xl") || el;
          const rect = content.getBoundingClientRect();
          // Target position leaving a clean, compact ~22px gap below the floating pill
          const targetY = window.scrollY + rect.top - 84;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
          window.history.pushState(null, "", `#${key}`);
          setActiveSection(key);
          setMobileOpen(false);
        }
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled
          ? "transparent"
          : "color-mix(in srgb, var(--bg-primary) 92%, transparent)",
        backdropFilter: scrolled ? "none" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "none" : "blur(12px)",
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

      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Circular Monogram Badge + Name (smooth morph on scroll like dataconale.com) */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group pointer-events-auto cursor-pointer"
          title={t("about")}
        >
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono-tech font-semibold transition-all duration-300 group-hover:scale-105 shadow-sm"
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
            className={`text-[15px] font-medium tracking-[-0.015em] transition-all duration-300 ${
              scrolled
                ? "opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden"
                : "opacity-100 translate-x-0"
            }`}
            style={{ color: "var(--text-primary)" }}
          >
            Sixto Feliciano Arrejin
          </span>
          {scrolled && activeSection && (
            <motion.span
              key={activeSection}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:inline-block font-mono-tech text-[11px] uppercase tracking-wider font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              — {t(activeSection)}
            </motion.span>
          )}
        </Link>

        {/* Right: Navigation Links & Controls (Pill container that maintains exact position) */}
        <div
          className="flex items-center p-1 sm:p-1.5 rounded-full transition-all duration-300 pointer-events-auto border"
          style={{
            background: scrolled
              ? "color-mix(in srgb, var(--bg-card) 90%, transparent)"
              : "transparent",
            borderColor: scrolled ? "var(--border-color)" : "transparent",
            backdropFilter: scrolled ? "blur(14px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
            boxShadow: scrolled ? "0 4px 20px -2px rgba(0,0,0,0.06)" : "none",
          }}
        >
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <Link
                  key={item.key}
                  href={`/#${item.key}`}
                  onClick={(e) => handleNavClick(e, item.key)}
                  className="relative px-3.5 py-1.5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-200 cursor-pointer"
                  style={{
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
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full -z-10 shadow-sm"
                      style={{
                        background: "var(--bg-inverted)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{t(item.key)}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="hidden md:block h-4 w-[1px] mx-1 transition-opacity duration-300"
            style={{
              background: "var(--border-color)",
              opacity: scrolled ? 1 : 0.4,
            }}
          />

          {/* Theme & Language Controls */}
          <div className="flex items-center gap-1 pl-1 pr-0.5">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
              aria-label="Menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
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
                onClick={(e) => handleNavClick(e, item.key)}
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
