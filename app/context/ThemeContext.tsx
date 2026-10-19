"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Создаём сам контекст (пока пустой)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Компонент-провайдер (он "включит розетку")
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
  if (typeof window !== "undefined" && document.documentElement.classList.contains("dark")) {
    return "dark";
  }
  return "light";
});

  // При загрузке берем тему из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  // При изменении темы — применяем классы к <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Кастомный хук для удобного использования
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme должен использоваться внутри ThemeProvider");
  }
  return context;
}