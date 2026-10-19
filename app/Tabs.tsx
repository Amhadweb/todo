"use client";

import { useState, ReactNode } from "react";

type TabsProps = {
  todosContent: ReactNode;
  habitsContent: ReactNode;
};

export default function Tabs({ todosContent, habitsContent }: TabsProps) {
  const [activeTab, setActiveTab] = useState("todos");

  return (
    <div>
      {/* Кнопки переключения */}
      <div className="flex gap-2 mb-4 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("todos")}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "todos"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
          }`}
        >
          Задачи
        </button>
        <button
          onClick={() => setActiveTab("habits")}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "habits"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
          }`}
        >
          Привычки
        </button>
      </div>

      {/* Содержимое */}
      <div className="mt-4">
        {activeTab === "todos" ? todosContent : habitsContent}
      </div>
    </div>
  );
}