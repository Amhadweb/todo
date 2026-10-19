"use client";

import { useState, useEffect } from "react";

type CheckIn = {
  id: number;
  date: string;
};

type Habit = {
  id: number;
  title: string;
  checkIns: CheckIn[];
};

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const res = await fetch("/api/habits");
    if (res.ok) {
      const data = await res.json();
      setHabits(data);
    }
  }

  async function handleAdd() {
    if (title === "") return;

    await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    loadHabits();
  }

  async function handleDelete(id: number) {
    await fetch("/api/habits", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadHabits();
  }

  // Функция для получения последних 7 дней (для кружочков)
  function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      // Формат "2026-10-18"
      const dateStr = d.toISOString().split("T")[0]; 
      // Короткое имя дня (Пн, Вт...)
      const dayName = d.toLocaleDateString("ru-RU", { weekday: "short" });
      days.push({ date: dateStr, label: dayName });
    }
    return days;
  }

  async function handleToggleCheckIn(habitId: number, date: string) {
    await fetch("/api/habits/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habitId, date }),
    });
    loadHabits();
  }

  const last7Days = getLast7Days();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 transition-colors">
      
      {/* Форма добавления */}
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Новая привычка (например, Читать 10 стр.)"
          className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Добавить
        </button>
      </div>

      {/* Список привычек */}
      <ul className="space-y-3">
        {habits.map((habit) => (
          <li key={habit.id} className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-4 py-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800 dark:text-gray-100">
                {habit.title}
              </span>
              <button
                onClick={() => handleDelete(habit.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Удалить
              </button>
            </div>

            {/* Кружочки за последние 7 дней */}
            <div className="flex justify-between mt-2">
              {last7Days.map((day) => {
                // Проверяем, есть ли отметка на эту дату
                const isDone = habit.checkIns.some((c) => c.date === day.date);

                return (
                  <button
                    key={day.date}
                    onClick={() => handleToggleCheckIn(habit.id, day.date)}
                    className={`flex flex-col items-center gap-1 w-10 h-14 rounded-md transition ${
                      isDone
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-300"
                    }`}
                  >
                    <span className="text-xs mt-1">{day.label}</span>
                    <span className="text-lg">{isDone ? "✓" : ""}</span>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}