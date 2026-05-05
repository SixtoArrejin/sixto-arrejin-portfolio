"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      className="py-8 mt-20"
      style={{
        borderTop: "1px solid var(--border-color)",
        background: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-xs flex items-center gap-1.5"
          style={{ color: "var(--text-muted)" }}
        >
          {t("built_with")}
          <Heart size={12} className="inline" style={{ color: "var(--accent-violet)" }} />
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/SixtoArrejin"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://linkedin.com/in/sixto-arrejin"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <LinkedinIcon size={18} />
          </a>
        </div>

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Sixto F. Arrejin. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
