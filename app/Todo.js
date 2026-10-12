"use client";

import { useState, useEffect } from "react";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  }

  async function handleAdd() {
    if (text === "") return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: text }),
    });

    setText("");
    loadTasks();
  }

  async function handleDelete(id) {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadTasks();
  }

  async function handleToggle(task) {
  await fetch("/api/tasks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: task.id, done: !task.done }),
  });

  loadTasks();
}

const doneCount = tasks.filter((t) => t.done).length;
const total = tasks.length;
const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

const visibleTasks = tasks.filter((task) => {
  if (filter === "active") return !task.done;
  if (filter === "done") return task.done;
  return true;
});

  return (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 transition-colors">

    {/* ГРАФИК ПРОГРЕССА */}
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Прогресс</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>

    {/* ВВОД */}
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача"
        className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Добавить
      </button>
    </div>

    {/* ФИЛЬТРЫ */}
    <div className="flex gap-2 justify-center">
      {[
        { value: "all", label: "Все" },
        { value: "active", label: "Активные" },
        { value: "done", label: "Выполненные" },
      ].map((item) => (
        <button
          key={item.value}
          onClick={() => setFilter(item.value)}
          className={`px-3 py-1 rounded text-sm transition ${
            filter === item.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>

    {/* СПИСОК */}
    {visibleTasks.length === 0 ? (
      <p className="text-center text-gray-400 dark:text-gray-500 py-8">
        Задач нет
      </p>
    ) : (
      <ul className="space-y-2">
        {visibleTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 transition-colors"
          >
            <span
              className={
                task.done
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-800 dark:text-gray-100"
              }
            >
              {task.title}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggle(task)}
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm"
              >
                {task.done ? "Отменить" : "Готово"}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}