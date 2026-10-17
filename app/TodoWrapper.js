import { auth } from "../auth";
import { redirect } from "next/navigation";
import Todo from "./Todo";

export default async function TodoWrapper() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {session.user.email}
      </p>
      <Todo />
    </>
  );
}