import prismadb from "@/lib/prismadb";
import { ErrorResponse, SuccessResponse } from "@/utils/response";
import { NextResponse } from "next/server";

// create todo
export async function POST(req: Request, res: Response) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(ErrorResponse("Title is required."), { status: 400 });
    }

    const task = await prismadb.todo.create({
      data: {
        title,
      },
    });

    return NextResponse.json(SuccessResponse(task),{status: 201});
  } catch (error) {
    console.error("[TODO_POST]", error);
    return NextResponse.json(ErrorResponse("Internal error."), { status: 500 });

  }
}

// get todos
export async function GET(req: Request, res: Response) {
  try {
    const todos = await prismadb.todo.findMany();

    return NextResponse.json(SuccessResponse(todos), {status: 200});
  } catch (error) {
    console.error("[TODO_GET]", error);
    return NextResponse.json(ErrorResponse("Internal error."), { status: 500 });
  }
}
