"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Suppress the specific React 19 script tag warning from next-themes in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const origError = console.error;
      console.error = (...args: unknown[]) => {
        if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
          return;
        }
        origError.apply(console, args);
      };
      return () => {
        console.error = origError;
      };
    }
  }, []);

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
