import { prisma } from "../../../lib/db";
import { auth } from "../../../auth";

export async function GET() {
  const session = await auth();
  if (!session) return Response.json({ error: "Не авторизован" }, { status: 401 });

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    include: { checkIns: true }, // Сразу подтягиваем все отметки!
    orderBy: { createdAt: "desc" },
  });
  
  return Response.json(habits);
}

export async function POST(request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Не авторизован" }, { status: 401 });

  const body = await request.json();
  const habit = await prisma.habit.create({
    data: {
      title: body.title,
      userId: session.user.id,
    },
  });
  
  return Response.json({ ok: true, habit });
}

export async function DELETE(request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Не авторизован" }, { status: 401 });

  const body = await request.json();

  const existing = await prisma.habit.findUnique({ where: { id: body.id } });
  if (!existing || existing.userId !== session.user.id) {
    return Response.json({ error: "Нет доступа" }, { status: 403 });
  }

  await prisma.habit.delete({ where: { id: body.id } });
  return Response.json({ ok: true });
}