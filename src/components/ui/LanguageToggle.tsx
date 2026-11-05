"use client";

import { useAppLocale } from "@/components/providers/ClientIntlProvider";

export function LanguageToggle() {
  const { locale, toggleLocale, isPending } = useAppLocale();

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-mono-tech font-medium transition-all duration-200 cursor-pointer active:scale-95"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
        opacity: isPending ? 0.7 : 1,
      }}
      aria-label="Toggle language"
      id="language-toggle"
    >
      <span className="uppercase tracking-wider">
        {locale === "es" ? "EN" : "ES"}
      </span>
    </button>
  );
}
