"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-mono-tech font-medium transition-colors duration-200 cursor-pointer active:scale-95"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
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
