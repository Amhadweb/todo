"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Этот useEffect выполнится ТОЛЬКО в браузере после первой отрисовки
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {/* Пока страница грузится, рендерим пустоту. Как только загрузилась — показываем иконку */}
      {mounted ? (theme === "dark" ? "☀️" : "🌙") : null}
    </button>
  );
}