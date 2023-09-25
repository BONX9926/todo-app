import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// create todo
export async function POST(req: Request, res: Response) {
  try {
    const { title, done } = await req.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const todo = await prismadb.todo.create({
      data: {
        title,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error("[TODO_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// get todos
export async function GET(req: Request, res: Response) {
  try {
    const todos = await prismadb.todo.findMany();

    return NextResponse.json(todos);
  } catch (error) {
    console.error("[TODO_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
