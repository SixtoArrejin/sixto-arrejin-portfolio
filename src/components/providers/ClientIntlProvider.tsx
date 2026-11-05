"use client";

import { useState, createContext, useContext, useEffect, useTransition } from "react";
import { NextIntlClientProvider } from "next-intl";

export type Locale = "es" | "en";

type LocaleContextType = {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  toggleLocale: () => void;
  isPending: boolean;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function useAppLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useAppLocale must be used within ClientIntlProvider");
  }
  return context;
}

export function ClientIntlProvider({
  initialLocale,
  allMessages,
  children,
}: {
  initialLocale: Locale;
  allMessages: Record<Locale, any>;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      setLocaleState(newLocale);
    });

    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;
      const newPath =
        currentPath.replace(/^\/(es|en)(\/|$)/, `/${newLocale}$2`) ||
        `/${newLocale}`;
      window.history.replaceState(null, "", `${newPath}${currentHash}`);
      document.documentElement.lang = newLocale;
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "es" ? "en" : "es");
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, isPending }}>
      <NextIntlClientProvider locale={locale} messages={allMessages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
