import { Suspense } from "react";
import { connection } from "next/server";
import LogoutButton from "./LogoutButton";
import TodoWrapper from "./TodoWrapper";

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Мои задачи
          </h1>
          <LogoutButton />
        </div>
        <Suspense fallback={<p className="text-gray-500">Загрузка...</p>}>
          <TodoWrapper />
        </Suspense>
      </div>
    </main>
  );
}