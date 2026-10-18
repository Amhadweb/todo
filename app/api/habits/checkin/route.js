import { prisma } from "../../../../lib/db";
import { auth } from "../../../../auth";

export async function POST(request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Не авторизован" }, { status: 401 });

  const body = await request.json();
  const { habitId, date } = body; // date приходит в формате "2026-10-18"

  // Проверяем, что привычка принадлежит этому юзеру
  const habit = await prisma.habit.findUnique({ where: { id: habitId } });
  if (!habit || habit.userId !== session.user.id) {
    return Response.json({ error: "Нет доступа" }, { status: 403 });
  }

  // Проверяем, может быть уже отмечено на эту дату?
  const existing = await prisma.checkIn.findFirst({
    where: { habitId, date },
  });

  if (existing) {
    // Если уже есть — удаляем (отменяем выполнение)
    await prisma.checkIn.delete({ where: { id: existing.id } });
    return Response.json({ ok: true, action: "removed" });
  } else {
    // Если нет — создаём новую отметку
    const checkIn = await prisma.checkIn.create({
      data: { habitId, date },
    });
    return Response.json({ ok: true, action: "added", checkIn });
  }
}