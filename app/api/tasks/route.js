import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Не авторизован" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(tasks);
}

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Не авторизован" }, { status: 401 });
  }

  const body = await request.json();
  const task = await prisma.task.create({
    data: {
      title: body.task,
      userId: session.user.id,
    },
  });
  return Response.json({ ok: true, task });
}

export async function PUT(request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Не авторизован" }, { status: 401 });
  }

  const body = await request.json();

  const existing = await prisma.task.findUnique({
    where: { id: body.id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return Response.json({ error: "Нет доступа" }, { status: 403 });
  }

  const task = await prisma.task.update({
    where: { id: body.id },
    data: { done: body.done },
  });
  return Response.json({ ok: true, task });
}

export async function DELETE(request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Не авторизован" }, { status: 401 });
  }

  const body = await request.json();

  const existing = await prisma.task.findUnique({
    where: { id: body.id },
  });

  if (!existing || existing.userId !== session.user.id) {
    return Response.json({ error: "Нет доступа" }, { status: 403 });
  }

  await prisma.task.delete({
    where: { id: body.id },
  });
  return Response.json({ ok: true });
}