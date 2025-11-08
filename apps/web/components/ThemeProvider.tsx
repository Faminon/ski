"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

type ThemeMode = "classic" | "luxe";

const ThemeCtx = createContext<{ mode: ThemeMode; isLuxe: boolean }>({
  mode: "classic",
  isLuxe: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const mode: ThemeMode = useMemo(() => {
    if (!pathname) return "classic";
    // Tout ce qui est /chalets… (= luxe)
    if (pathname === "/chalets" || pathname.startsWith("/chalets/")) return "luxe";
    // Sinon “classique” (appartements)
    return "classic";
  }, [pathname]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeCtx.Provider value={{ mode, isLuxe: mode === "luxe" }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}
