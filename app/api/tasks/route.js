import { prisma } from "@/lib/db";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(tasks);
}

export async function POST(request) {
  const body = await request.json();
  const task = await prisma.task.create({
    data: { title: body.task },
  });
  return Response.json({ ok: true, task });
}

export async function DELETE(request) {
  const body = await request.json();
  await prisma.task.delete({
    where: { id: body.id },
  });
  return Response.json({ ok: true });
}

export async function PUT(request) {
  const body = await request.json();
  const task = await prisma.task.update({
    where: { id: body.id },
    data: { done: body.done },
  });
  return Response.json({ ok: true, task });
}