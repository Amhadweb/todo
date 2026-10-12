export default async function Task({ params }) {
  const { id } = await params;

  const tasks = {
    1: { title: "Купить хлеб", done: false },
    2: { title: "Помыть посуду", done: true },
  };

  const task = tasks[id];

  if (!task) {
    return <h1>Задача не найдена</h1>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p>{task.done ? "✅ Выполнено" : "⏳ В работе"}</p>
    </main>
  );
}