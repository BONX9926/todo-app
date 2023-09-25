import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// get todo by id
export async function GET(
  _req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    if (!todoId) {
      return new NextResponse("Todo id is required", { status: 400 });
    }

    const todo = await prismadb.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.log("[TODO_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// update todo by id
export async function PATCH(
  req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    const { title, done } = await req.json();
    if (!todoId) {
      return new NextResponse("Todo id is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!done) {
      return new NextResponse("Status is required", { status: 400 });
    }

    const todo = await prismadb.todo.update({
      where: {
        id: todoId,
      },
      data: {
        title,
        done,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.log("[TODO_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// delete todo by id
export async function DELETE(
  _req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    if (!todoId) {
      return new NextResponse("Todo id is required", { status: 400 });
    }

    const todo = await prismadb.todo.delete({
      where: {
        id: todoId,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.log("[TODO_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
