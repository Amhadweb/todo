import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Todo from "./Todo";
import LogoutButton from "./LogoutButton";

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
            Мои задачи
          </h1>
          <LogoutButton />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {session.user.email}
        </p>
        <Todo />
      </div>
    </main>
  );
}