import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Мои задачи",
  description: "Тудушка на Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Скрипт без мигания: срабатывает ДО отрисовки */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("theme");
                if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}