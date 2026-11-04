"use client";

import { useTranslations } from "next-intl";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      className="py-10"
      style={{
        borderTop: "1px solid var(--border-color)",
        background: "var(--bg-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono-tech font-semibold"
            style={{
              background: "var(--bg-inverted)",
              color: "var(--text-inverted)",
            }}
          >
            SFA
          </span>
          <p className="text-xs font-mono-tech" style={{ color: "var(--text-muted)" }}>
            {t("built_with")}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/SixtoArrejin"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            aria-label="GitHub"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href="https://linkedin.com/in/sixto-arrejin"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={17} />
          </a>
        </div>

        <p className="text-xs font-mono-tech" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Sixto F. Arrejin. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
