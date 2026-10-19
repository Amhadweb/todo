import { Suspense } from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import TodoWrapper from "./TodoWrapper";
import HabitTracker from "./HabitTracker";
import Tabs from "./Tabs";

export const instant = false;

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-md">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Мой Дашборд
          </h1>
          <LogoutButton />
        </div>

        <Suspense fallback={<p className="text-gray-500">Загрузка...</p>}>
          <Tabs 
            todosContent={<TodoWrapper />} 
            habitsContent={<HabitTracker />} 
          />
        </Suspense>

      </div>
    </main>
  );
}