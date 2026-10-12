import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./ThemeToggle";

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
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}