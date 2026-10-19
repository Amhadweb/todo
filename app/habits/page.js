import { auth } from "../../auth";
import { redirect } from "next/navigation";
import HabitTracker from "../HabitTracker";
import LogoutButton from "../LogoutButton";

export default async function HabitsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Мои привычки
          </h1>
          <LogoutButton />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {session.user.email}
        </p>
        <HabitTracker />
      </div>
    </main>
  );
}