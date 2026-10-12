import Todo from "./Todo";

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Мои задачи
        </h1>
        <Todo />
      </div>
    </main>
  );
}